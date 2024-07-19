class BookPreview extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    //Create elements
    const wrapper = document.createElement("div");
    wrapper.classList.add("preview");

    const image = document.createElement("img");
    image.classList.add("preview__image");

    const info = document.createElement("div");
    info.classList.add("preview__info");

    const title = document.createElement("h3");
    title.classList.add("preview__title");

    const author = document.createElement("div");
    author.classList.add("preview__author");

    info.appendChild(title);
    info.appendChild(author);
    wrapper.appendChild(image);
    wrapper.appendChild(info);

    //Add styles
    const style = document.createElement("style");
    style.textContent = ` 
    .preview{
    border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}
  @media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}`;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".preview__image").src =
      this.getAttribute("image");
    this.shadowRoot.querySelector(".preview__title").innerText =
      this.getAttribute("title");
    this.shadowRoot.querySelector(".preview__author").innerText =
      this.getAttribute("author");
  }
}
customElements.define("book-preview", BookPreview);
