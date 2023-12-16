import { initLikesCounter } from "./likesCounter.js";
import { initAnswer } from "./initAnswer.js";
import { validButton } from "./validButton.js";

const listElement = document.getElementById("add-comment");
const buttonElement = document.getElementById("add-button");

export const renderComment = (comments) => {
    buttonElement.disabled = true;
    const commentHtml = comments.map((comment, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>
              ${comment.name}
            </div>
            <div class="date">${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span data-index="${index}" class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="${comment.isLiked ? 'like-button active-like' : 'like-button'}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
    listElement.innerHTML = commentHtml;
    buttonElement.disabled = true;
    
    initLikesCounter( comments, renderComment );
    initAnswer( comments, renderComment);
    validButton();
  
  };