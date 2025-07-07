const themeSelect = document.getElementById("theme");

const applyTheme = (value) => {
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
};

themeSelect.addEventListener("change", (e) => {
  applyTheme(e.target.value);
});

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme") || "light";
themeSelect.value = savedTheme;
applyTheme(savedTheme);
