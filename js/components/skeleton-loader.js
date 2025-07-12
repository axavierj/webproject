const template = document.createElement("template");
template.innerHTML = `
<div class="skeleton-loader"></div>
`;
const style = new CSSStyleSheet();
style.replaceSync(`
.skeleton-loader {
  width: 100%;
  height: 2rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: 0 0;
  }
}
`);
class SkeletonLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [style];
  }
}
customElements.define("skeleton-loader", SkeletonLoader);
