// /js/theme-loader.js

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const savedTheme = localStorage.getItem("theme");
const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", theme);

// Optional: reveal page if you're hiding it pre-render
document.documentElement.style.visibility = "visible";
