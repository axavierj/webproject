const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <path fill="currentColor" d="M17 8V6a5 5 0 00-10 0v2H5v14h14V8h-2zM9 6a3 3 0 016 0v2H9V6zm8 14H7V10h10v10z"/>
</svg>
`;

style.replaceSync(`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`);

class IconPassword extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-password", IconPassword);
