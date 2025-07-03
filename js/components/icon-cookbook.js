const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <!-- Book shape -->
  <path fill="currentColor" d="M4 3h14a2 2 0 012 2v15a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 2v13h14V5H4z"/>
  <!-- Fork -->
  <path fill="currentColor" d="M6.5 6.5h1v4h-1v-4zm2 0h1v4h-1v-4zm1.5 0h1v4a1.5 1.5 0 01-3 0v-4h1.5z"/>
  <!-- Spoon -->
  <path fill="currentColor" d="M16 6a1.5 1.5 0 011.5 1.5c0 .83-.67 1.5-1.5 1.5S14.5 8.33 14.5 7.5 15.17 6 16 6zm-.5 3h1v5h-1V9z"/>
</svg>
`;

style.replaceSync(`
  :host {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    color: inherit;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`);

class IconCookbook extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-cookbook", IconCookbook);
