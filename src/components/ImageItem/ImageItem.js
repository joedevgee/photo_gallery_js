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
    img.style.backgroundImage = `url(${this.getAttribute("regular")})`;
    const lightBoxImage = this.shadowRoot.getElementById("lightbox-image");
    lightBoxImage.style.backgroundColor = this.getAttribute("color");
    lightBoxImage.setAttribute("src", this.getAttribute("regular"));
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
      ? "block"
      : "none";
  }
}

export default ImageItem;
