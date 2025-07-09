const template = document.createElement("template");
template.innerHTML = `
<div class="field">
  <input id="password-input" type="password" required />
  <label class="toggle-switch">
    <input type="checkbox" id="toggle">
    <span class="slider"></span>
  </label>
</div>
`;

const style = new CSSStyleSheet();
style.replaceSync(`
  .field {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          label {
            font-weight: bold;
            display: block;
            margin-bottom: 0.25rem;
          }

          input[type="password"],
          input[type="text"] {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #aaa;
            border-radius: 6px;
            font-size: 1rem;
          }

          .toggle-switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 22px;
          }

          .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            border-radius: 22px;
            transition: 0.3s;
            cursor: pointer;
          }

          .slider:before {
            content: "";
            position: absolute;
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            border-radius: 50%;
            transition: 0.3s;
          }

          .toggle-switch input:checked + .slider {
            background-color: #40e0d0;
          }

          .toggle-switch input:checked + .slider:before {
            transform: translateX(18px);
          }
            `);

const toggleTemplate = {
  template,
  style,
};

export default toggleTemplate;
