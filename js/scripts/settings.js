import { updateEmailCall, updatePasswordCall } from "../api/user.js";
import { url } from "../api/crudRecipe.js";
import { comparePasswords } from "./utils.js";
import { API, logout } from "../api/auth.js";

const themeSelect = document.getElementById("theme");
const sortSelect = document.getElementById("sort-order");
const updateEmail = document.getElementById("new-email");
const updatePassword = document.getElementById("update-password");
const toast = document.getElementById("toast");
const logoutButton = document.getElementById("logout");

const applyTheme = (value) => {
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
};

themeSelect.addEventListener("change", (e) => {
  applyTheme(e.target.value);
});

// Update email address
updateEmail.addEventListener("click", async () => {
  try {
    const update = await updateEmailCall({ email: updateEmail, url });
    toast.show(update.message || "Email updated!", 3000, "success");
  } catch (err) {
    toast.show(update.message || err.message, 3000, "error");
  }
});

// Update password
updatePassword.addEventListener("click", async () => {
  const newPassword = document
    .querySelector("#new-password")
    ?.shadowRoot?.querySelector("#password-input")?.value;
  const confirmPassword = document
    .querySelector("#confirm-password")
    ?.shadowRoot?.querySelector("#password-input")?.value;

  const { valid, message } = comparePasswords(newPassword, confirmPassword);
  if (!valid) {
    toast.show(message, 3000, "error");
    return;
  }
  const confirmed = confirm("Are you sure you want to update your password?");
  if (!confirmed) return;
  if (!newPassword || !confirmPassword) {
    toast.show("Please fill in all fields", 3000, "error");
    return;
  }
  try {
    const update = await updatePasswordCall({
      password: newPassword,
      url: API,
    });

    toast.show(update.message || "Password updated!", 3000, "success");
  } catch (err) {
    toast.show(err.message, 3000, "error");
  }
});

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme") || "light";
themeSelect.value = savedTheme;
applyTheme(savedTheme);

sortSelect.addEventListener("change", (e) => {
  localStorage.setItem("sort-order", e.target.value);
});

const savedSort = localStorage.getItem("sort-order") || "newest";
sortSelect.value = savedSort;

// Logout functionality
logoutButton.addEventListener("click", () => {
  logout();
  window.location.href = "/";
});
