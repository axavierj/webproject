import toastTemplate from "../templates/toogle.template.js";

const { template, style } = toastTemplate;

class TogglePassword extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.shadow.adoptedStyleSheets = [style];
  }

  connectedCallback() {
    const toggle = this.shadow.querySelector("#toggle");
    const input = this.shadow.querySelector("#password-input");

    toggle.addEventListener("change", () => {
      input.type = toggle.checked ? "text" : "password";
    });
  }

  //getter for label
  get label() {
    return this.getAttribute("label");
  }

  set label(value) {
    this.setAttribute("label", value);
  }

  //getter for name
  get name() {
    return this.getAttribute("name");
  }

  set name(value) {
    this.setAttribute("name", value);
  }

  static get observedAttributes() {
    return ["label", "name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label") {
      // const label = this.shadowRoot.querySelector("label");
      // label.textContent = this.label || "Password";
    } else if (name === "name") {
      const input = this.shadowRoot.querySelector("input");
      input.name = this.name || "password";
    }
  }
}

customElements.define("toggle-password", TogglePassword);
