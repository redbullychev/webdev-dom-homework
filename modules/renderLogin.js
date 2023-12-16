import { getApi, token, setToken, login } from "./api.js";
import { date_time } from "./curentDate.js";
import { renderComment } from "./renderComments.js";

const addformEllement = document.querySelector(".add-form");
const appElement  =document.getElementById("app");
const listElement = document.getElementById("add-comment");
export let userName;

export const renderLogin = ( comments ) => { 
  getApi()
  .then((responseData) => {
      const appComments = responseData.comments.map((comment) =>{
        return {
          name: comment.author.name,
          date: date_time(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      comments = appComments;
      renderComment( comments );
  }).then(() => {
    const loaderComment = document.getElementById("loader");
    loaderComment.innerHTML = `<p>Что бы добавить комментарий, <a href="#" class="login" id="login">авторизуйтесь</a></p>`;
    const loginButton = document.getElementById("login");
    loginButton.addEventListener("click", () => {
    loaderComment.innerHTML = "";
    listElement.innerHTML = `
    <div class="add-form-login" >
        <div>Форма входа</div>
        <input id="login-name" type="text" class="login-input" placeholder="Введите логин" />
        <input id="login-password" type="text" class="login-input" placeholder="Введите пароль" />
        <button class="add-form-button" id="login-button">Войти</button>
        <div><a class="registration" href="#">Зарегистрироваться</a></div>
      </div>
    `;
    const buttonRegistration = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-name");
    const passwordInputElement = document.getElementById("login-password");

    buttonRegistration.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setToken(responseData.user.token);
            userName = responseData.user.name;
            console.log(token);
            addformEllement.style.display = 'flex'; 
            renderComment( comments ); 
        }).then(() =>{
            const nameInputElement = document.getElementById("name-input");
            nameInputElement.value = userName;
            nameInputElement.disabled = true;
        })
    });
  });
  })
    
  
};


