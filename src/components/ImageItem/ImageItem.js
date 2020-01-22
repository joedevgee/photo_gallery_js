import html from "./ImageItem.html";

const template = document.createElement("template");
template.innerHTML = html;

class ImageItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      .getElementById("image-thumbnail")
      .addEventListener("click", () => {
        this.open = true;
      });
    const img = this.shadowRoot.getElementById("figure-image");
    img.style.backgroundColor = this.getAttribute("color");
    img.setAttribute("src", this.getAttribute("small"));
    img.setAttribute("alt", this.getAttribute("id"));
    const lightBoxImage = this.shadowRoot.getElementById("lightbox-image");
    lightBoxImage.setAttribute("src", this.getAttribute("full"));
    lightBoxImage.setAttribute("alt", this.getAttribute("id"));
    this.shadowRoot.getElementById("lightbox").addEventListener("click", () => {
      this.open = "";
    });
  }
  get open() {
    return this.hasAttribute("open");
  }
  set open(v) {
    if (v) {
      this.setAttribute("open", true);
    } else {
      this.removeAttribute("open");
    }
  }
  static get observedAttributes() {
    return ["open"];
  }
  attributeChangedCallback(_, __, newVal) {
    this.shadowRoot.getElementById("lightbox").style.display = newVal
      ? "flex"
      : "none";
  }
}

export default ImageItem;
