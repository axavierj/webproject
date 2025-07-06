import toastTemplate from "../templates/toast.template.js";

const { template, style } = toastTemplate;

class ToastMessage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.shadow.adoptedStyleSheets = [style];
    this.dialog = this.shadow.querySelector("dialog");
  }

  connectedCallback() {
    // Ensure the dialog is closed initially
    this.dialog.close();
    this.dialog.addEventListener("click", () => {
      this.dialog.close();
    });
  }

  show(message, duration = 3000, type = "info") {
    this.dialog.textContent = message;
    this.dialog.className = `toast ${type}`;
    this.dialog.show();

    setTimeout(() => {
      this.dialog.close();
    }, duration);
  }
}

customElements.define("toast-message", ToastMessage);
