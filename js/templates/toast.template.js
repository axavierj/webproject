const template = document.createElement("template");
const style = new CSSStyleSheet();

template.innerHTML = `
<dialog class="toast"></dialog>
`;

style.replaceSync(`
  .toast {
  background: #333;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  font-size: 1rem;
  pointer-events: auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.toast[open] {
  opacity: 1;
  transform: translateY(0);
}

.toast.success {
  background: var(--success-bg, #28a745);
  color: white;
}

.toast.error {
  background: var(--danger-bg, #dc3545);
}

.toast.info {
  background: var(--accent-lavender, #17a2b8);
  color: white;
}

.toast.warning {
  background: #ffc107;
  color: black;
}
`);

const toastTemplate = {
  template,
  style,
};

export default toastTemplate;
