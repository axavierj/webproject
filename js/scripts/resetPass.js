import { resetPassword } from "../api/auth.js";
import { comparePasswords } from "../utils/passwordUtils.js";
const form = document.getElementById("reset-form");
const token = new URLSearchParams(window.location.search).get("token");

const toast = document.getElementById("toast");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("new-password").value;
  const confirm = document.getElementById("confirm-password").value;

  const match = comparePasswords(password, confirm);
  if (!match.valid) {
    toast.showMessage(match.message);
    return;
  }

  const res = await resetPassword(token, password);
  if (res.ok) {
    alert("Password reset! You may log in now.");
    window.location.href = "/login";
  } else {
    alert(res.message || "Something went wrong");
  }
});
