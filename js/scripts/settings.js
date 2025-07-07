const themeSelect = document.getElementById("theme");
const sortSelect = document.getElementById("sort-order");

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

sortSelect.addEventListener("change", (e) => {
  localStorage.setItem("sort-order", e.target.value);
});

const savedSort = localStorage.getItem("sort-order") || "newest";
sortSelect.value = savedSort;
