import { getRecipes, deleteRecipeById, url } from "../api/crudRecipe.js";

import recipeTemplate from "../templates/recipe.template.js";
const { template, style } = recipeTemplate;

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
    const savedSort = localStorage.getItem("sort-order") || "newest";
    const sorted = this.sortRecipes(res, savedSort);
    const handleSearch = this.debounce((e) => {
      const query = e.target.value.trim();
      const filtered = this.filter({ query, list: sorted });
      this.updateList(filtered);
    });
    searchInput.addEventListener("input", handleSearch);

    list.setAttribute("list", JSON.stringify(sorted));
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

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  filter({ query, list }) {
    const normalized = query.toLowerCase();

    return list.filter((recipe) => {
      const inTitle = recipe.title?.toLowerCase().includes(normalized);
      const inInstructions = recipe.instructions
        ?.toLowerCase()
        .includes(normalized);
      const inTags = recipe.tags?.some((tag) =>
        tag.toLowerCase().includes(normalized)
      );
      const inIngredients = recipe.ingredients?.some((ing) =>
        ing.name.toLowerCase().includes(normalized)
      );

      return inTitle || inInstructions || inTags || inIngredients;
    });
  }

  sortRecipes(recipes, mode) {
    switch (mode) {
      case "newest":
        return recipes.sort((a, b) => b.id - a.id);
      case "oldest":
        return recipes.sort((a, b) => a.id - b.id);
      case "az":
        return recipes.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return recipes.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return recipes;
    }
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
