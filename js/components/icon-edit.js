const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.03 0-1.42l-2.34-2.34a1 1 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
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

class IconEdit extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-edit", IconEdit);
