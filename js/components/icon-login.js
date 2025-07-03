const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <path fill="currentColor" d="M10 17v-3H3v-4h7V7l5 5-5 5zm10-14H9a2 2 0 00-2 2v4h2V5h11v14H9v-4H7v4a2 2 0 002 2h11a2 2 0 002-2V5a2 2 0 00-2-2z"/>
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

class IconLogin extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-login", IconLogin);
