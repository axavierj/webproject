import { resetPassword } from "../api/auth.js";
import { comparePasswords } from "./utils.js";
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
  toast.show(res.message);
  form.reset();
  if (res.status === 200 || res.status === 201) {
    window.location.href = "/login.html";
  }
});
