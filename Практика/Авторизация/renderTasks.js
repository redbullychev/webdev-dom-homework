// Модуль renderTasks.js
import { deleteTodo, postTodo } from "./api.js";
import { loginName } from "./renderLogin.js";
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js";
import { format } from "date-fns";

//   const listElement = document.getElementById("list");

export const renderTasks = ({ tasks, fetchAndRenderTasks }) => {
  const appElement = document.getElementById("app");
  const country = "ru";
  const tasksHtml = tasks
    .map((task) => {
      const createDate = format(new Date(task.created_at), 'dd/MM/yyyy hh:mm:ss');
      return `
      <li class="task">
        <p class="task-text">
          ${task.text}
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
        <p><i>Задача создана: ${createDate}</i></p>
      </li>`;
    })
    .join("");

const appHtml = `
<h1>Список задач</h1>
    <ul class="tasks" id="list"> ${tasksHtml} </ul>
    <br />
    <div class="form">
      <div>Пользователь: ${loginName} </div>
      <h3 class="form-title">Форма добавления</h3>
      <div class="form-row">
        Что нужно сделать:
        <input
          type="text"
          id="text-input"
          class="input"
          placeholder="Выпить кофе"
        />
      </div>
      <br />
      <button class="button" id="add-button">Добавить</button>
      <a href="login.html" id="link-to-link">Перейти на страницу логина</a>
    </div>
`;

appElement.innerHTML = appHtml;
const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;

      deleteTodo({ id }).then(() => {
        fetchAndRenderTasks();
      });
    });
  }

const buttonElement = document.getElementById("add-button");
const textInputElement = document.getElementById("text-input"); 

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавляется...";

  postTodo({
    text: textInputElement.value,
  })
    .then(() => {
      return fetchAndRenderTasks();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
    });

  renderTasks({ tasks, fetchAndRenderTasks });
});
};