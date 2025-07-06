import { login } from "../api/auth.js";
const loginForm = document.getElementById("login-form");
const toast = document.querySelector("#toast");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const user = await login(email, password);

  if (user.accessToken) {
    window.location.href = "/";
  } else {
    toast.show(
      user.message || "Login failed. Please try again.",
      3000,
      "error"
    );
  }
});
