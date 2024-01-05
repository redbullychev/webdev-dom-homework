import { renderHeaderComponent } from "./header-component.js";
import { posts, getToken, goToPage } from "../index.js";
import { USER_LIKE_ACTION } from "../routes.js";
import { like, disLike } from "../api.js";
import { getDateBefore } from "../helpers.js";


export function userPostPageComponent(appEl) {
let likeImage;
let likes;
const appHtml = posts.map((post) => {
    if (post.likes.length === 1) {
        likes = post.likes[0].name;
      } else if (post.likes.length > 1) {
        likes = `${post.likes[0].name} и еще ${post.likes.length - 1}`;
      } else {
        likes = "0";
      }

    if (post.isLiked) {
        likeImage = '<img src="./assets/images/like-active.svg"></img>';
      } else {
        likeImage = '<img src="./assets/images/like-not-active.svg"></img>';
      }
    return `
      <ul class="posts">
        <li class="post">
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button id="${post.id}" class="like-button">
            ${likeImage}
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${likes}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
          ${getDateBefore(post.createdAt)} назад
          </p>
        </li>
      </ul>
    `;
  })
  .join(""); 
    let uId = posts.map((post) => {
      return post.user.id;
    })
    let uImageUrl = posts.map((post) => {
      return post.user.imageUrl;
    })
    let uName = posts.map((post) => {
      return post.user.name;
    })

  appEl.innerHTML = `
  <div class="page-container">
  <div class="header-container"></div>
  <div class="post-header" data-user-id="${uId[0]}">
  <img src="${uImageUrl[0]}" class="posts-user-header__user-image">
  <p class="posts-user-header__user-name">${uName[0]}</p>
</div>  ${appHtml}
</div>`;

const likeButtonElement = document.querySelectorAll(".like-button");
  for (let likeEl of likeButtonElement) {
    likeEl.addEventListener("click", (event) => {
      console.log(event.currentTarget.id);
      const currentPost = posts.find(post => post.id === event.currentTarget.id)
      if (currentPost.isLiked) {
       disLike({id: event.currentTarget.id, token: getToken()})
       .then(() => {
       return goToPage(USER_LIKE_ACTION, uId[0]);
       });
      } else {
       like({id: event.currentTarget.id, token: getToken()})
       .then(() => {
        return goToPage(USER_LIKE_ACTION, uId[0]);
        });
      }
      // const likePost = document.querySelector(`[data-id="${event.currentTarget.id}"]`);
      // likePost.innerHTML = renderLikes(nlike);
    })
  }


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });
}