export const BASE_URL = "https://api.domainname.diplon.nomoredomains.xyz";

const HEADERS = {
  "Content-Type": "application/json",
};

const getJson = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error({ status: response.status });
};

export const register = (nameRegister, emailRegister, passwordRegister) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      name: nameRegister,
      email: emailRegister,
      password: passwordRegister,
    }),
  }).then(getJson);
};

export const authoriz = (emailLogin, passwordLogin) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
  }).then(getJson);
};

export const examTokenValidation = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
    },
  }).then(getJson);
}; 