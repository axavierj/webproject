import { isLoggedIn } from "../api/auth.js";

if (!isLoggedIn()) {
  window.location.href = "/login";
}
