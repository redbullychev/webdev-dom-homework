// Валидация кнопки
const nameInputElement = document.getElementById("name-input")
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("add-button");

export const validButton = () => {
    let validName = false;
    let validComment = false;
    
    if (nameInputElement.value !== '') {
       validName = true;
    }
    
    if (commentInputElement.value !== '') {
       validComment = true;
    }
    
    if (validName && validComment) {
         buttonElement.disabled = false;
    } else {
       buttonElement.disabled = true;
    }
    
    };