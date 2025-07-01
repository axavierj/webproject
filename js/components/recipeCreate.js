import { postRecipe, url } from "../api/crudRecipe.js";
import createTemplate from "../templates/create.template.js";
const { template, style } = createTemplate;

class RecipeForm extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [style];
    shadow.appendChild(template.content.cloneNode(true));
    this.ingredients = [];
    this.units = [
      "g",
      "kg",
      "ml",
      "l",
      "tsp",
      "tbsp",
      "cup",
      "pcs",
      "each",
      "pinch",
      "dash",
      "ounce",
      "pound",
      "liter",
      "quart",
      "gallon",
    ];
  }

  connectedCallback() {
    const list = this.shadowRoot.querySelector("#ingredient-list");
    const addButton = this.shadowRoot.querySelector("#add-ingredient");
    const unitsSelect = this.shadowRoot.querySelector("#ingredient-unit");
    // Populate the units select dropdown
    this.units.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit;
      option.textContent = unit;
      unitsSelect.appendChild(option);
    });

    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      const ingredientData = this.getIngredientData(
        "ingredient-name",
        "ingredient-qty",
        "ingredient-unit"
      );
      if (!ingredientData) {
        alert("Please fill in all ingredient fields correctly.");
        return;
      }
      this.ingredients.push(ingredientData);
      this.appendIngredientsToList(list, this.ingredients);
      this.clearInput("ingredient-name", "ingredient-qty", "ingredient-unit");
    });

    const form = this.shadowRoot.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const transmitionData = {
        title: data.title.trim(),
        instructions: data.instructions.trim(),
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
        ingredients: [...this.ingredients],
      };

      postRecipe(transmitionData, url)
        .then((response) => {
          if (response && response.id) {
            alert("Recipe saved successfully!");
            form.reset();
            this.ingredients = [];
            //navigate to home page
            window.location.href = "/";
          } else {
            alert("Failed to save the recipe. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error posting recipe:", error);
          alert("Failed to save the recipe. Please try again.");
        });
    });
  }

  getIngredientData(name, qty, unit) {
    const nameInput = this.shadowRoot.querySelector(`#${name}`);
    const qtyInput = this.shadowRoot.querySelector(`#${qty}`);
    const unitInput = this.shadowRoot.querySelector(`#${unit}`);
    const IngredientName = nameInput.value.trim();
    const IngredientQty = parseFloat(qtyInput.value);
    const IngredientUnit = unitInput.value;
    if (IngredientName && !isNaN(IngredientQty) && IngredientUnit) {
      return {
        name: IngredientName,
        qty: IngredientQty,
        unit: IngredientUnit,
      };
    }
    return null;
  }

  createList(ingredients) {
    return ingredients.map((ingredient) => {
      const li = document.createElement("li");
      li.textContent = `${ingredient.qty} ${ingredient.unit} ${ingredient.name}`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "✖";
      removeBtn.style.marginLeft = "0.5rem";
      removeBtn.type = "button";
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const index = this.ingredients.indexOf(ingredient);
        if (index > -1) {
          this.ingredients.splice(index, 1);
          this.appendIngredientsToList(
            this.shadowRoot.querySelector("#ingredient-list"),
            this.ingredients
          );
        }
      });

      li.appendChild(removeBtn);
      return li;
    });
  }

  appendIngredientsToList(list, ingredients) {
    list.innerHTML = ""; // Clear existing items
    const ingredientItems = this.createList(ingredients);
    ingredientItems.forEach((item) => list.appendChild(item));
    return list;
  }

  clearInput(name, qty, unit) {
    const nameInput = this.shadowRoot.querySelector(`#${name}`);
    const qtyInput = this.shadowRoot.querySelector(`#${qty}`);
    const unitInput = this.shadowRoot.querySelector(`#${unit}`);
    nameInput.value = "";
    qtyInput.value = "";
    unitInput.value = "";
    return { nameInput, qtyInput, unitInput };
  }
}

customElements.define("recipe-form", RecipeForm);
