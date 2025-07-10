const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<section>
  <div class="search-bar">
    <input type="text" id="search-input" placeholder="Search recipes..." />
  </div>
  <recipe-list></recipe-list>
</section>
`;

style.replaceSync(`
  :host {
  display: block;
  height: 100%;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}
  .details {
    padding: 1rem;
    background-color: var(--header-bg, #dee2ff);
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 1rem .5rem
  }
    .search-bar {
  padding: 1rem;
  background-color: var(--header-bg, #dee2ff);
}

.search-bar input {
  width: 95%;
  padding: 0.5rem;
  margin-inline: auto;
  border: 1px solid #ccc;
  font-size: 1rem;
  border-radius: 6px;
}


  `);

const recipeTemplate = {
  template,
  style,
};

export default recipeTemplate;
