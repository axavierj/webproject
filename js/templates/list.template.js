const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<aside>
  <ul>
    <li>no items</li>
  </ul>
</aside>
`;

style.replaceSync(`
:host {
  display: block;
  height: 100%;
}
  aside {
  background-color: var(--lavender-web, #dee2ff);
  padding: 1rem;
  border-right: 1px solid #ccc;
  min-height: 100%;
  overflow-y: auto;
}

aside ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

aside li {
  background: var(--pale-purple, #feeafa);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-weight: bold;
  color: var(--cool-gray, #8e9aaf);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

aside li:hover {
  background: var(--misty-rose, #efd3d7);
  transform: translateX(4px);
}
  /* Button Base */
.btn {
  font-size: 0.9rem;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  border: 1px solid transparent;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  margin-right: 0.5rem;
}

/* View (Primary) */
.btn-primary {
  background-color: var(--misty-rose, #efd3d7);
  border-color: #e0bcbc;
  color: #333;
}

.btn-primary:hover {
  background-color: var(--pale-purple, #feeafa);
}

/* Edit (Secondary) */
.btn-secondary {
  background-color: var(--lavender-web, #dee2ff);
  border-color: #c0c7f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #c8d1ff;
}

/* Delete (Danger) */
.btn-danger {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  color: #a00;
}

.btn-danger:hover {
  background-color: #f1b0b7;
  color: #700;
}

`);

const listTemplate = {
  template,
  style,
};

export default listTemplate;
