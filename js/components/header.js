import { logout } from "../api/auth.js";
import headerTemplate from "../templates/heder.template.js";
const { template, style } = headerTemplate;
function toggleNav(nav) {
  if (!nav) return;
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
  } else {
    nav.classList.add("open");
  }
}

class CookbookHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }

  connectedCallback() {
    const nav = this.shadowRoot.querySelector("nav");
    const mobileMenu = this.shadowRoot.querySelector(".mobilMenu");
    const logoutBtn = this.shadowRoot.querySelector(".logout");

    mobileMenu.addEventListener("click", () => {
      toggleNav(nav);
    });

    // Close the nav when clicking outside of it
    document.addEventListener("click", (event) => {
      if (!this.contains(event.target) && nav.classList.contains("open")) {
        toggleNav(nav);
      }
    });
    logoutBtn.addEventListener("click", () => {
      logout();
      //check if there is a recipe in sessionStorage and remove it
      if (sessionStorage.getItem("recipe")) {
        sessionStorage.removeItem("recipe");
      }
      window.location.href = "/";
    });
  }
}

customElements.define("app-header", CookbookHeader);
