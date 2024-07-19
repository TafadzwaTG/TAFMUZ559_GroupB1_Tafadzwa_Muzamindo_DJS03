class OverlayManager extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (event.target.dataset.close) {
        this.open = false;
      }
    });
  }

  openOverlay(selector) {
    this.querySelector(selector).open = true;
  }
  closeOverlay(selector) {
    this.querySelector(selector).close = false;
  }
}
customElements.define("overlay-manager", OverlayManager);
