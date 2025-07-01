const API = "http://localhost:3000";

export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  sessionStorage.setItem("token", data.accessToken);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function signup(email, password) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return await login(email, password); // login immediately
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function isLoggedIn() {
  return !!getToken();
}
