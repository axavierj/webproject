const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<header>
  <section class="mobile-header">
    <div class="logo">
      <h4>cooking</h4>
      <icon-cookbook></icon-cookbook>
    </div>
    <div>
    <button class="logout"><icon-logout></icon-logout>logout</button>
      <button class="mobilMenu">&#9776;</button>
    </div>
  </section>
  <nav>
    <ul>
      <li><a href="/">home</a></li>
      <li><a href="/create/">create</a></li>
    </ul>
  </nav>
</header>
    `;
style.replaceSync(`
  :host {
          display: block;
          font-family: sans-serif;
          background-color: var(--header-bg, #cbc0d3);
          color: var(--text-turquoise, #8e9aaf);
          border-bottom: 1px solid #ccc;
        }

        header {
          display: flex;
          flex-direction: column;
          color: var(--text-turquoise);
        }

        h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }

        nav {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

nav.open {
  max-height: 200px; /* enough to show the links; adjust as needed */
}

        nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }

        nav a {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        }

        nav a:hover {
          text-decoration: underline;
        }
        
        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .5rem;
        }

        button {
          background-color: var(--button-bg, #efd3d7);
          border: 1px solid #ccc;
          padding: 0.4rem 0.75rem;
          font-weight: bold;
          font-size: 0.9rem;
          border-radius: 4px;
          color: var(--text-turquoise, #8e9aaf);
          cursor: pointer;
        }

        .hide{
          display: none;
        }

        /* Responsive for larger screens */
        @media (min-width: 600px) {
          header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
            nav {
    max-height: none;
    overflow: visible;
  }

          nav ul {
            flex-direction: row;
            gap: 1rem;
            padding: 0 .5rem 0 0;
          }

          h4 {
            margin-bottom: 0;
          }
          .mobilMenu {
            display: none;
          }
        }
  .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
  `);

const headerTemplate = {
  template,
  style,
};

export default headerTemplate;
