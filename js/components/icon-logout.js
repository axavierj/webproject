const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
  <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
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

class IconLogout extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }
}

customElements.define("icon-logout", IconLogout);
