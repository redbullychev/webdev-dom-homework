import { USER_POSTS_PAGE, LIKE_ACTION } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp } from "../index.js";
import { like, disLike } from "../api.js";
import { getDateBefore } from "../helpers.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
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
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
         <div data-id=${post.id} class="render-likes">
         <div class="post-likes">
            <button id="${post.id}" class="like-button">
              ${likeImage}
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${likes}</strong>
            </p>
          </div>
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
    </div>`;
  })
  .join(""); 

  appEl.innerHTML = appHtml;

  const likeButtonElement = document.querySelectorAll(".like-button");
  for (let likeEl of likeButtonElement) {
    likeEl.addEventListener("click", (event) => {
      console.log(event.currentTarget.id);
      const currentPost = posts.find(post => post.id === event.currentTarget.id)
      if (currentPost.isLiked) {
       disLike({id: event.currentTarget.id, token: getToken()})
       .then(() => {
       return goToPage(LIKE_ACTION);
       });
      } else {
       like({id: event.currentTarget.id, token: getToken()})
       .then(() => {
        return goToPage(LIKE_ACTION);
        });
      }
      // const likePost = document.querySelector(`[data-id="${event.currentTarget.id}"]`);
      // likePost.innerHTML = renderLikes(nlike);
    })
  }

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      console.log(userEl.dataset.userId);
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}


// function renderLikes(post) {
//   return `
//   <div class="post-likes">
//             <button id="${post.id}" class="like-button">
//               <img src="./assets/images/like-active.svg">
//             </button>
//             <p class="post-likes-text">
//               Нравится: <strong>${post.likes.map((like) => {
//                 return " " + like.name;
//               })}</strong>
//             </p>
//           </div>
//   `
// }

