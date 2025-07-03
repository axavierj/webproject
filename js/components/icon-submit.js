const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <path fill="currentColor" d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zM12 19a3 3 0 110-6 3 3 0 010 6zm2-10H6V5h8v4z"/>
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

class IconSave extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-save", IconSave);
