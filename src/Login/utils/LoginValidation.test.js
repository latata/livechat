import { validatePassword, validateEmail } from "./LoginValidatation";

const passwordTestCases = [
  {
    password: "",
    isValid: false,
  },
  {
    password: "a",
    isValid: false,
  },
  {
    password: "testPassword",
    isValid: false,
  },
  {
    password: "StrongPa55word",
    isValid: true,
  },
  {
    password: "Ultr@StrongPa55word",
    isValid: true,
  },
  {
    password: "Sh0rt",
    isValid: false,
  },
];

describe.each(passwordTestCases)(
  "validatePassword",
  ({ password, isValid }) => {
    test(password, () => {
      expect(validatePassword(password)).toBe(isValid);
    });
  }
);

const emailTestCases = [
  {
    email: "",
    isValid: false,
  },
  {
    email: "a@a",
    isValid: false,
  },
  {
    email: "valid@email.com",
    isValid: true,
  },
  {
    email: "valid.email.with.dots@email.com",
    isValid: true,
  },
  {
    email: "valid-email-with-dash@email.com",
    isValid: true,
  },
  {
    email: "not.valid@email",
    isValid: false,
  },
  {
    email: "another@not@valid.email",
    isValid: false,
  },
];

describe.each(emailTestCases)("validateEmail", ({ email, isValid }) => {
  test(email, () => {
    expect(validateEmail(email)).toBe(isValid);
  });
});
