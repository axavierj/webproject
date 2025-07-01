import { login } from "../api/auth.js";
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const user = await login(email, password);

  if (user) {
    // Login successful
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/";
  } else {
    // Login failed
    alert("Login failed. Please try again.");
  }
});
