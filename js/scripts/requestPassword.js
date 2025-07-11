import { requestPasswordReset } from "../api/auth.js";

const passwordRequestForm = document.getElementById("request-form");
const emailInput = document.getElementById("email");
const toast = document.getElementById("toast");
console.log("Password request script loaded");

passwordRequestForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  if (!email) {
    toast.showMessage("Please enter your email address.");
    return;
  }

  try {
    const response = await requestPasswordReset(email);
    toast.show(response.message);
  } catch (error) {
    toast.show("Error requesting password reset. Please try again.");
    return;
  }
});
