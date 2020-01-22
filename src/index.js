import html from "./content.html";
import GridLayout from "./components/GridLayout/GridLayout";
import "./app.css";

window.customElements.define("grid-layout", GridLayout);

const template = document.createElement("template");
template.innerHTML = html;

class App extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: "closed"
    });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("gallery-app", App);
document.body.append(document.createElement("gallery-app"));
