const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<main>
<button id="print-button">Print Recipe</button>

  <h1 id="title">title</h1>
  <h2>Ingredients</h2>
  <ul id="ingredient-list">
  </ul>
  <h2>Instructions</h2>
  <p id="instructions">Instructions will be displayed here.</p>

</main>
`;
style.replaceSync(`
  host {
  display: block;
  height: 100%;   
  }

  main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--pale-purple, #feeafa);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 84vh;
}

h1 {
  font-size: 1.5rem;
  color: var(--text-turquoise, #8e9aaf);
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.1rem;
  color: var(--text-turquoise, #8e9aaf);
  margin: 0.5rem 0 0.25rem;
}

ul {
  padding-left: 1.2rem;
  margin: 0;
}

ul li {
  margin-bottom: 0.25rem;
  font-weight: bold;
}

p {
  white-space: pre-wrap;
  line-height: 1.6;
  color: var(--text-turquoise, #8e9aaf);
}
#print-button {
  background-color: var(--cool-gray, #8e9aaf);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

#print-button:hover {
  background-color: var(--misty-rose, #efd3d7);
  color: #333;
}

@media print {
  button {
    display: none;
  }

  body {
    background: white;
    color: black;
  }

  * {
    box-shadow: none !important;
    background: none !important;
  }
}


  `);

class RecipeDetails extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#print-button")
      .addEventListener("click", () => {
        window.print();
      });
  }

  //getter for the recipe name attribute
  get recipeName() {
    return this.getAttribute("recipe-name");
  }
  //setter for the recipe name attribute
  set recipeName(value) {
    this.setAttribute("recipe-name", value);
  }

  // Getter for the instructions attribute
  get instructions() {
    return this.getAttribute("instructions");
  }

  // Setter for the instructions attribute
  set instructions(value) {
    this.setAttribute("instructions", value);
  }

  // Getter for the ingredients attribute
  get ingredients() {
    return JSON.parse(this.getAttribute("ingredients") || "[]");
  }
  // Setter for the ingredients attribute
  set ingredients(value) {
    this.setAttribute("ingredients", JSON.stringify(value));
  }
  // Observe attribute changes
  static get observedAttributes() {
    return ["recipe-name", "instructions", "ingredients"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(name);
    }
  }

  render(name) {
    switch (name) {
      case "recipe-name":
        const title = this.shadowRoot.querySelector("#title");
        title.textContent = this.recipeName;
        // You can add more details about the recipe here
        break;
      case "instructions":
        const instructions = this.shadowRoot.querySelector("#instructions");
        instructions.textContent =
          this.instructions || "No instructions provided.";
        break;
      case "ingredients":
        const ingredientList =
          this.shadowRoot.querySelector("#ingredient-list");
        ingredientList.innerHTML = ""; // Clear existing items
        const ingredients = this.ingredients;
        if (!ingredients || ingredients.length === 0) {
          ingredientList.innerHTML = "<li>No ingredients available</li>";
          return;
        }
        ingredients.forEach((ingredient) => {
          const li = document.createElement("li");
          li.textContent = `${ingredient.qty} ${ingredient.unit} ${ingredient.name}`;
          ingredientList.appendChild(li);
        });

        break;
      default:
        console.warn(`Unknown attribute: ${name}`);
    }
  }
}

// Define the custom element
customElements.define("recipe-details", RecipeDetails);
