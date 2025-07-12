import listTemplate from "../templates/list.template.js";
const { template, style } = listTemplate;
class RecipeList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];
  }

  connectedCallback() {}

  //getter for the list atteribute
  get list() {
    return this.getAttribute("list");
  }

  //setter for the list attribute
  set list(value) {
    this.setAttribute("list", value);
  }

  // Observe attribute changes
  static get observedAttributes() {
    return ["list"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(name);
    }
  }

  render(name) {
    switch (name) {
      case "list":
        const list = this.shadowRoot.querySelector("ul");
        list.innerHTML = ""; // Clear existing items
        //get the list from the attribute
        const items = JSON.parse(this.list);
        if (!items || items.length === 0) {
          list.innerHTML = "<li>No items available</li>";
          return;
        }
        items.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <div>
            <h3>${item.title}</h3>
            <div>
              <button id="${item.id}-view" class="btn btn-primary" data-id="${item.id}"><icon-view></icon-view>View</button>
              <button id="${item.id}-edit" class="btn btn-secondary"><icon-edit></icon-edit>Edit</button>
              <button id="${item.id}-delete" class="btn btn-danger"><icon-trash></icon-trash>Delete</button>
            </div>
          </div>
          `;
          list.appendChild(li);
          //atach event listeners to the buttons
          const viewButton = this.shadowRoot.getElementById(`${item.id}-view`);
          const editButton = this.shadowRoot.getElementById(`${item.id}-edit`);
          const deleteButton = this.shadowRoot.getElementById(
            `${item.id}-delete`
          );
          viewButton.addEventListener("click", () => {
            const event = new CustomEvent("view-recipe", {
              detail: { id: item.id },
              bubbles: true,
              composed: true,
            });
            this.dispatchEvent(event);
          });
          editButton.addEventListener("click", () => {
            const event = new CustomEvent("edit-recipe", {
              detail: { id: item.id },
              bubbles: true,
              composed: true,
            });
            this.dispatchEvent(event);
          });
          deleteButton.addEventListener("click", () => {
            const event = new CustomEvent("delete-recipe", {
              detail: { id: item.id },
              bubbles: true,
              composed: true,
            });
            this.dispatchEvent(event);
          });
        });
        break;
      default:
        console.warn(`No render logic for attribute: ${name}`);
        break;
    }
  }
}

// Define the custom element
customElements.define("recipe-list", RecipeList);
