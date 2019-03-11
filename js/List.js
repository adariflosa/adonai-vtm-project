import axios from "axios";

import ListItem from "./ListItem";
import Loader from "./Loader";
import Pagination from "./Pagination";

export default class List {
  constructor(nrArticles, holder) {
    this._nrArticles = nrArticles;
    this._pageNr = 0;
    this._holder = holder;
    this._refHtml = this.generateHtml(this);
    this._loader = new Loader(this._holder);
    this._pagination = new Pagination(this); // !!!!!!!!!!!!!!!!!!!!!!!!!!
    this.loadData();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      ` <div class="list">
        <div>
      `
    );
    return this._holder.querySelector(".list");
  }
  loadData() {
    this._loader.show();
    this._pagination.hide();
    axios
      .get(
        `/https://nieuws.vtm.be/feed/articles?type=video&count=${
          this._nrArticles
        }&from=${this._pageNr}`
      )
      .then(result => {
        //   console.log(result);
        this.addChildren(result.data.response.items);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addChildren(articles) {
    this._loader.hide();
    this._pagination.show();
    articles.forEach(article => {
      new ListItem(article, this._refHtml);
    });
  }
}
