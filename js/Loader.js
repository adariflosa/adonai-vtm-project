export default class Loader {
  constructor(holder) {
    this._holder = holder;
    this._loaderRefHtml = this.generateHtml();
  }

  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="loader">
      <p> Loading... </p>
      </div>

      `
    );
    return this._holder.querySelector(".loader");
  }

  show() {
    this._loaderRefHtml.style.display = "block";
  }

  hide() {
    this._loaderRefHtml.style.display = "none";
  }
}
