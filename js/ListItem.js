import axios from "axios";
import * as basicLightbox from "basiclightbox"; // ctrl +click here
// import { timingSafeEqual } from "crypto";

export default class ListItems {
  constructor(article, holder) {
    this._article = article;
    this._holder = holder;
    this._refHtml = this.generateHtml();
    console.log(this._article);
    this.setEvents();
  }
  generateHtml() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
            <div class="listItem">
                <img class="imgItem" src="${this._article.image.thumb}">
                <h5>${this._article.title}</h5>
                <p>${this._article.created.formatted}</p> 
            <div>
     `
    );
    return [...this._holder.querySelectorAll(".listItem")].reverse()[0];
  }

  setEvents() {
    this._refHtml
      .querySelector(".imgItem") // this All is killing you !!!!
      .addEventListener("click", this.getVideo.bind(this));

    // here you bind but thats noly necessary when you use this in the function intself
  }

  getVideo() {
    //in here you never use this to refer to the object ListItem
    //so you don't need to bind.
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles?ids=${
          this._article.id
        }&fields=video`
        // you are loading them all
        //
      )
      .then(result => {
        console.log(result);
        const htmlToShowInLightbox = `
            <video controls>
                <source src="${
                  result.data.response.items[0].video.url.default
                }" type="video/mp4">
            </video>
        `;
        console.log("1. " + result.data.response.items.url);
        //i want to bind the lightbox to the listitme object so now i need this ;-)
        this._instance = basicLightbox.create(htmlToShowInLightbox);
        this._instance.show();
        console.log("2. " + this._instance);
        //now we still need to connect the css
        // trick is to find the nodemodules folder
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
