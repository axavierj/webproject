const template = document.createElement("template");
template.innerHTML = `
<style>
footer {
  background-color: var(--header-bg, #dee2ff);
  color: var(--text-turquoise, #8e9aaf);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #ccc;
  margin-top: auto;
}

@media (min-width: 600px) {
  footer {
    font-size: 1rem;
  }
}
</style>
<footer>
  <div>cook book</div>
</footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // You can add event listeners or other initialization code here
    console.log("Footer component added to the DOM");
  }
}
// Define the custom element
customElements.define("app-footer", Footer);
