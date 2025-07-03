const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<form>
  <div>
    <label for="title">Recipe Title:</label>
    <input type="text" id="title" name="title" required />
  </div>

  <div class="ingredients-section">
  <label>Ingredients:</label>
  <div class="ingredient-inputs">
    <input type="text" id="ingredient-name" placeholder="e.g., sugar" />
    <input type="number" id="ingredient-qty" placeholder="Qty" min="0" step="any" />
    <select id="ingredient-unit">
      <option value="">--unit--</option>
    </select>
    <button type="button" id="add-ingredient">Add</button>
  </div>

  <ul id="ingredient-list"></ul>
</div>

  <div>
    <label for="instructions">Instructions:</label>
    <textarea
      id="instructions"
      name="instructions"
      rows="8"
      required
    ></textarea>
  </div>

  <div>
    <label for="tags">Tags (optional):</label>
    <input
      type="text"
      id="tags"
      name="tags"
      placeholder="e.g., dessert, quick, vegan"
    />
  </div>

  <button type="submit">Save Recipe</button>
</form>
`;

style.replaceSync(`

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: .5rem;
    background: var(--pale-purple, #feeafa);
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #aaa;
    border-radius: 4px;
    font-size: 1rem;
  }

  button[type="submit"] {
    align-self: flex-start;
    background-color: var(--button-bg, #efd3d7);
    color: var(--text-turquoise, #8e9aaf);
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: var(--button-hover, #dee2ff);
  }
    .ingredients-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ingredient-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ingredient-inputs input,
.ingredient-inputs select,
.ingredient-inputs button {
  font-size: 1rem;
  padding: 0.4rem;
}

#ingredient-list {
  list-style: none;
  padding-left: 1rem;
  margin: 0.5rem 0 0 0;
}

#ingredient-list li::before {
  content: "• ";
}

#ingredient-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0.25rem 0;
}

#ingredient-list li button {
  background: none;
  border: none;
  color: var(--text-turquoise);
  font-size: 1rem;
  cursor: pointer;
}
`);
const createTemplate = {
  template,
  style,
};

export default createTemplate;
