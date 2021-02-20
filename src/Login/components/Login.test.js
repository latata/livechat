import Login from "./Login";
import {
  PASSWORD_INVALID,
  EMAIL_INVALID,
  EMAIL_OR_PASSWORD_INVALID,
  NETWORK_ERROR,
} from "../utils/LoginMessages";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { login } from "../utils/LoginApi";

jest.mock("../utils/LoginApi");

function setup() {
  const onSuccess = jest.fn();
  const result = render(<Login onSuccess={onSuccess} />);

  const elements = {
    emailInput: result.queryByLabelText("Email:"),
    passwordInput: result.queryByLabelText("Password:"),
    rememberMeCheckbox: result.queryByLabelText("Remember me"),
    submit: result.queryByText("Login"),
  };

  const events = {
    changeEmail(value) {
      return fireEvent.change(elements.emailInput, { target: { value } });
    },
    changePassword(value) {
      return fireEvent.change(elements.passwordInput, { target: { value } });
    },
    submitForm() {
      return fireEvent.click(elements.submit);
    },
  };

  return {
    elements,
    events,
    onSuccess,
    ...result,
  };
}

afterEach(() => {
  login.mockReset();
});

describe("Login component", () => {
  test("renders", () => {
    const {
      elements: { emailInput, passwordInput, rememberMeCheckbox, submit },
    } = setup();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(rememberMeCheckbox).toBeTruthy();
    expect(submit).toBeTruthy();
  });

  test("show/hide error message when email is invalid", () => {
    const {
      elements: { emailInput },
      events: { changeEmail, submitForm },
      queryByText,
    } = setup();

    changeEmail("invalid-email");
    expect(emailInput.value).toBe("invalid-email");
    submitForm();
    expect(queryByText(EMAIL_INVALID)).toBeTruthy();
    changeEmail("valid@email.pl");
    submitForm();
    expect(queryByText(EMAIL_INVALID)).toBeFalsy();
  });

  test("show/hide error message when password is invalid", () => {
    const {
      elements: { passwordInput },
      events: { changePassword, submitForm },
      queryByText,
    } = setup();

    changePassword("invalidpassword");
    expect(passwordInput.value).toBe("invalidpassword");

    submitForm();
    expect(queryByText(PASSWORD_INVALID)).toBeTruthy();

    changePassword("Val1dPa55word");
    submitForm();
    expect(queryByText(PASSWORD_INVALID)).toBeFalsy();
  });

  test("show error message when user passes wrong credentials", async () => {
    login.mockImplementation(async () => {
      return { errors: [EMAIL_OR_PASSWORD_INVALID] };
    });
    const {
      events: { changeEmail, changePassword, submitForm },
      findByText,
      onSuccess,
    } = setup();

    act(() => {
      changeEmail("valid@email.pl");
    });

    act(() => {
      changePassword("Val1dPa55word");
    });

    submitForm();

    const error = await findByText(EMAIL_OR_PASSWORD_INVALID);
    expect(error).toBeTruthy();
    expect(onSuccess).not.toBeCalled();
  });

  test("show error message on network error", async () => {
    login.mockImplementation(async () => {
      throw new Error();
    });
    const {
      events: { changeEmail, changePassword, submitForm },
      onSuccess,
      findByText,
    } = setup();

    act(() => {
      changeEmail("valid@email.pl");
    });

    act(() => {
      changePassword("Val1dPa55word");
    });

    submitForm();

    const error = await findByText(NETWORK_ERROR);
    expect(error).toBeTruthy();
    expect(onSuccess).not.toBeCalled();
  });

  test("calls on success when user passes correct credentials", async () => {
    const {
      events: { changeEmail, changePassword, submitForm },
      onSuccess,
    } = setup();

    act(() => {
      changeEmail("valid@email.pl");
    });

    act(() => {
      changePassword("Val1dPa55word");
    });

    await act(async () => {
      await submitForm();
    });

    expect(onSuccess).toBeCalled();
  });

  test("shows loading indicator and disabled submit button when logging in", async () => {
    let resolveLoginPromise;
    const promise = new Promise((resolve) => {
      resolveLoginPromise = resolve;
    });
    login.mockImplementation(async () => {
      await promise;
      return;
    });
    const {
      events: { changeEmail, changePassword, submitForm },
      elements: { submit },
      onSuccess,
      queryByTestId,
    } = setup();

    act(() => {
      changeEmail("valid@email.pl");
    });

    act(() => {
      changePassword("Val1dPa55word");
    });

    expect(submit).toBeEnabled();
    expect(queryByTestId("loading-indicator")).toBeFalsy();

    act(() => {
      submitForm();
    });

    expect(submit).toBeDisabled();
    expect(queryByTestId("loading-indicator")).toBeTruthy();

    resolveLoginPromise();

    await waitFor(() => expect(submit).toBeEnabled());

    expect(queryByTestId("loading-indicator")).toBeFalsy();
    expect(onSuccess).toBeCalled();
  });
});
