import {
  validateEmail,
  validatePassword,
} from "./Login/utils/LoginValidatation";
import {
  EMAIL_INVALID,
  EMAIL_OR_PASSWORD_INVALID,
  PASSWORD_INVALID,
} from "./Login/utils/LoginMessages";

function mockedRequestLogin({ email, password }) {
  return new Promise((resolve) => {
    // simulate server response delay with setTimeout
    setTimeout(() => {
      let status = 0;
      let body = "";

      const errorMessages = [];
      if (!validateEmail(email)) {
        errorMessages.push(EMAIL_INVALID);
      }
      if (!validatePassword(password)) {
        errorMessages.push(PASSWORD_INVALID);
      }

      if (errorMessages.length) {
        body = errorMessages;
        status = 400;
      } else {
        if (email === "test@test.pl" && password === "Password1") {
          status = 200;
        } else {
          status = 401;
          body = [EMAIL_OR_PASSWORD_INVALID];
        }
      }

      // mocked fetch Response
      resolve({
        status,
        ok: status >= 200 && status < 300,
        json() {
          return Promise.resolve(body);
        },
      });
    }, 200);
  });
}

const originalFetch = window.fetch;
// mock http request handling
window.fetch = (resource, init) => {
  if (resource === "/login") {
    return mockedRequestLogin(JSON.parse(init.body));
  }
  return originalFetch(resource, init);
};
