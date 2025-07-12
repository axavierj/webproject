export const API = " https://lrcc.onrender.com";

export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (data.user && data.accessToken) {
    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}

export async function signup(email, password) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("recipeId");
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function isLoggedIn() {
  return !!getToken();
}

export async function requestPasswordReset(email) {
  const res = await fetch(`${API}/password-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  return await res.json();
}
