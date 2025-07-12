const template = document.createElement("template");
const style = new CSSStyleSheet();
template.innerHTML = `
<aside>
  <ul>
    <skeleton-loader></skeleton-loader>
  </ul>
</aside>
`;

style.replaceSync(`
:host {
  display: block;
  height: 100%;
}
  aside {
  background-color: var(--bg-card, #dee2ff);
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
  color: var(--text-turquoise, #8e9aaf);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

aside li:hover {
  background: var(--accent-soft-pink, #efd3d7);
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
  background-color: var(--button-bg, #efd3d7);
  border-color: #e0bcbc;
  color: var(--text-turquoise, #8e9aaf);
}

.btn-primary:hover {
  background-color: var(--pale-purple, #feeafa);
}

/* Edit (Secondary) */
.btn-secondary {
  background-color: var(--success-bg, #dee2ff);
  border-color: #c8d1ff;
  color: var(--text-turquoise, #8e9aaf);
}

.btn-secondary:hover {
  background-color: #c8d1ff;
}

/* Delete (Danger) */
.btn-danger {
  background-color: var(--danger-bg, #f5c2c7);
  border-color: #f1b0b7;
  color: var(--text-turquoise, #8e9aaf);
}

.btn-danger:hover {
  background-color: #f1b0b7;
  color: var(--text-turquoise, #8e9aaf);
}

.icon {
  font-weight: bold;
}
  /*600px breakpoint*/
@media (min-width: 600px) {

aside {
    
    width: fit-content;
    margin-inline: auto;
}
`);

const listTemplate = {
  template,
  style,
};

export default listTemplate;
