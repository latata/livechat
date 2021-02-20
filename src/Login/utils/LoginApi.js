export async function login(credentials) {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const isOK = response.ok;
  const json = await response.json();

  if (!isOK) {
    return {
      errors: json,
    };
  }

  return json;
}
