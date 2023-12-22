import { getApi, postApi } from "./api.js";
import { renderComment } from "./renderComments.js";
import { renderLogin } from "./renderLogin.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { validButton } from "./validButton.js";
import { format } from "date-fns";

// Объявляем переменные

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("add-comment");
const nameInputElement = document.getElementById("name-input")
const commentInputElement = document.getElementById("comment-input");
const addformEllement = document.querySelector(".add-form");
const loaderComment = document.getElementById("loader");




// Массив объектов

export let comments = [
    
  ];

buttonElement.disabled = true;
renderLogin( comments );

  


function getComments() {
getApi()
.then((responseData) => {
    const appComments = responseData.comments.map((comment) =>{
      const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss');
      return {
        name: comment.author.name,
        date: createDate,
        text: comment.text,
        likes: comment.likes,
        isLiked: false
      };
    });
    comments = appComments;
    nameInputElement.value = "";
    commentInputElement.value = "";
    renderComment( comments );
  });
}

// Функция добавления комментария 
function addComment() {
  let oldLoader = loaderComment.innerHTML
  addformEllement.style.display = 'none';
  loaderComment.textContent = "Комментарий загружается";
  
  postApi(sanitizeHtml(nameInputElement.value), sanitizeHtml(commentInputElement.value))
    .then((response) => {
      if (response.status === 200){
        return response.json()
      } else if (response.status === 400) {
        throw new Error ("400");
      } else if (response.status === 500) {
        throw new Error ("500");
      }
    })
      .then((data) => {
      return getComments();
    })
    .then((response) => {
    addformEllement.style.display = 'flex';
    loaderComment.innerHTML = oldLoader;
    })
    .catch((error) => {
      if (error.message === "400") {
        alert("Поле ввод должно содержать более 3-х символов");
        addformEllement.style.display = 'flex';
        loaderComment.innerHTML = oldLoader;
      } else if (error.message === "500") {
        loaderComment.innerHTML = oldLoader;
        console.log("Повторный запрос");        
        addComment();
      } else {
        alert("Кажется у вас сломался интернет, попробуйте позже!");
        addformEllement.style.display = 'flex';
        loaderComment.innerHTML = oldLoader;
      } 
    }); 
  
  }


// Валидация кнопки

nameInputElement.addEventListener('input', () => {
  validButton();
  });
commentInputElement.addEventListener('input', () => {
  validButton();
  });


// Обработчик клика по кнопке "Написать"

buttonElement.addEventListener("click", () => {
  addComment();
  renderComment( comments );
  
});

// Добавление комментария клавишей Enter

commentInputElement.addEventListener("keyup", (e) => { 
  if (e.code === 'Enter') {
    addComment();
    renderComment( comments );
  }
});