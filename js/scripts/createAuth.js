import { signup } from "../api/auth.js";
import { comparePasswords, validateEmail } from "./utils.js";

const form = document.querySelector("#signup-form");
const toast = document.querySelector("#toast");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const authObj = Object.fromEntries(formData.entries());
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  try {
    const emailValidation = validateEmail(authObj.email);
    if (!emailValidation.valid) {
      toast.show(emailValidation.message, 3000, "error");
      return;
    }
    // Validate password and confirm password
    const passwordsMatch = comparePasswords(
      authObj.password,
      authObj.confirmPassword
    );
    if (!passwordsMatch.valid) {
      toast.show(passwordsMatch.message, 3000, "error");
      return;
    }

    const user = await signup(authObj.email, authObj.password);
    if (!user.user || !user.accessToken) {
      toast.show(
        user.message || "Signup failed. Please try again.",
        3000,
        "error"
      );
      return;
    }
    toast.show("Signup successful!", 3000, "success");
    form.reset();
    //redirect to home page after signup
    // window.location.href = "/";
  } catch (err) {
    submitButton.disabled = false;
    toast.show(err.message || "Something went wrong");
  } finally {
    submitButton.disabled = false;
  }
});
