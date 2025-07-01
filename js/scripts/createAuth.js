import { signup } from "../api/auth.js";

const form = document.querySelector("#signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const authObj = Object.fromEntries(formData.entries());
  try {
    const user = await signup(authObj.email, authObj.password);
    alert("Signup successful!");
    sessionStorage.setItem("token", JSON.stringify(user.accessToken));
    sessionStorage.setItem("user", JSON.stringify(user.user));
    form.reset();
    window.location.href = "/";
  } catch (err) {
    alert(err.message);
  }
});
