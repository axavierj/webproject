export function comparePasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
    return {
      valid: false,
      message: "Passwords do not match.",
    };
  }
  return { valid: true };
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: "Invalid email format.",
    };
  }
  return { valid: true };
}

export function waitForTokenAndRedirect(
  retries = 10,
  delay = 100,
  target = "/"
) {
  const token = sessionStorage.getItem("token");
  if (token) {
    window.location.href = target;
    return;
  }

  if (retries <= 0) {
    console.warn("Token not found after waiting. Staying on page.");
    return;
  }

  setTimeout(() => {
    waitForTokenAndRedirect(retries - 1, delay, target);
  }, delay);
}
