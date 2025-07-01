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
    background-color: var(--lavender-web, #dee2ff);
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 1rem .5rem
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

    const list = this.shadowRoot.querySelector("recipe-list");
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

    list.setAttribute("list", JSON.stringify(res));
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
}
// Define the custom element
customElements.define("app-recipe", Recipe);
