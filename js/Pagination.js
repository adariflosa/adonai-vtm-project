export default class Pagination {
  constructor(list) {
    this._list = list;
    this._refHtml = this.generateHtml();
    this.setEvents();
  }
  generateHtml() {
    this._list._holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="pagination">
          <button class="prev">Prev</button>
         
          <button class="next">Next</button>
      </div>
      `
    );
    return this._list._holder.querySelector(".pagination");
  }
  setEvents() {
    this._refHtml
      .querySelector(".next")
      .addEventListener("click", this.nextPage.bind(this));
    this._refHtml
      .querySelector(".prev")
      .addEventListener("click", this.prevPage.bind(this));
  }

  nextPage() {
    this._list._pageNr += 5;
    this._list._holder.children[0].innerHTML = "";
    this._list.loadData();
  }
  prevPage() {
    if (this._list._pageNr > 0) {
      // use if to prevent to go minus pages // for not to get an error
      this._list._pageNr -= 5;
      this._list._holder.children[0].innerHTML = "";
      this._list.loadData();
      console.log(this._list._holder.children[0].innerHTML);
    }
  }

  hide() {
    this._refHtml.style.display = "none";
  }

  show() {
    this._refHtml.style.display = "flex";
  }
}
