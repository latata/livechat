export function validatePassword(password) {
  return !!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/);
}

export function validateEmail(email) {
  // regexp taken from https://emailregex.com
  return !!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
