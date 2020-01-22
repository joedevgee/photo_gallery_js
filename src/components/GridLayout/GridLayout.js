import html from "./GridLayout.html";
import ImageItem from "../ImageItem/ImageItem";

window.customElements.define("image-item", ImageItem);

const template = document.createElement("template");
template.innerHTML = html;

class GridLayout extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({
      mode: "open"
    });
    shadow.appendChild(template.content.cloneNode(true));
  }
  static get observedAttributes() {
    return ["photos"];
  }

  get photos() {
    return this.getAttribute("photos");
  }
  set photos(v) {
    this.setAttribute("photos", JSON.stringify(v));
  }
  async fetchPhotos() {
    this.loading = true;
    const response = await fetch("./photos.json");
    const json = await response.json();
    this.photos = json.map(j => ({
      id: j.id,
      color: j.color,
      urls: j.urls
    }));
  }
  async connectedCallback() {
    await this.fetchPhotos();
  }
  attributeChangedCallback(_, __, v) {
    const photos = JSON.parse(v);
    const gridList = this.shadowRoot.getElementById("grid-list");
    gridList.innerHTML = "";
    photos.forEach(p =>
      gridList.insertAdjacentHTML(
        "beforeend",
        `
        <li slot="image-item">
          <image-item
            regular=${p.urls.small}
            color=${p.color}
            full=${p.urls.full}
          ></image-item>
        </li>
        `
      )
    );
  }
}

export default GridLayout;
