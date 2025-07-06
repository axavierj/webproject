import {
  getRecipeById,
  getRecipes,
  deleteRecipeById,
  url,
} from "../api/crudRecipe.js";

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

class Recipe extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }

  async connectedCallback() {
    const res = await getRecipes(url);
    const searchInput = this.shadowRoot.querySelector("#search-input");
    const list = this.shadowRoot.querySelector("recipe-list");

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      const filtered = this.filter({ query, list: res });
      this.updateList(filtered);
    });

    list.setAttribute("list", JSON.stringify(res));
    //listen for view-recipe event
    list.addEventListener("view-recipe", (e) => {
      const recipeId = e.detail;
      //save id to sessionStorage
      sessionStorage.setItem("recipeId", recipeId.id);
      //navigate to the recipe details page
      window.location.href = `/view`;
    });

    //listen for delete-recipe event
    list.addEventListener("delete-recipe", async (e) => {
      const recipeId = e.detail;
      const confirmDelete = confirm(
        `Are you sure you want to delete the recipe with id: ${recipeId.id}?`
      );
      if (!confirmDelete) {
        return; // Exit if the user cancels the deletion
      }

      // Call the delete function here if you have one
      const delMsg = await deleteRecipeById(recipeId.id, url);
      console.log(`Delete recipe with id: ${recipeId.id}`, delMsg);

      // await deleteRecipeById(recipeId.id, url);
      // Optionally, refresh the list after deletion
      const updatedList = await getRecipes(url);
      this.updateList(updatedList);
    });

    // Listen for edit-recipe event
    list.addEventListener("edit-recipe", async (e) => {
      const recipeId = e.detail;
      console.log(`Edit recipe with id: ${recipeId.id}`);
      //save the recipeId to localStorage
      localStorage.setItem("recipeId", recipeId.id);
      // Redirect to the edit page
      window.location.href = `/edit/`;
    });
  }

  updateList(recipes) {
    const list = this.shadowRoot.querySelector("recipe-list");
    list.setAttribute("list", JSON.stringify(recipes));
  }

  filter({ query, list }) {
    const filtered = list.filter((recipe) => {
      return recipe.title.toLowerCase().includes(query.toLowerCase());
    });
    return filtered;
  }

  disconnectedCallback() {
    const searchInput = this.shadowRoot.querySelector("#search-input");
    const list = this.shadowRoot.querySelector("recipe-list");
    searchInput.removeEventListener("input", this.handleSearch);
    list.removeEventListener("view-recipe", this.handleViewRecipe);
    list.removeEventListener("delete-recipe", this.handleDeleteRecipe);
    list.removeEventListener("edit-recipe", this.handleEditRecipe);
  }
}
// Define the custom element
customElements.define("app-recipe", Recipe);
