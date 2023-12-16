// Обработчик клика по тексту комментария (перенос комментария в поле ввода)
const commentInputElement = document.getElementById("comment-input");

export const initAnswer = ( comments, renderComment) => {
    const commentsElement = document.querySelectorAll(".comment");
    for (const comment of commentsElement) {
      comment.addEventListener("click", () => {
        const index = comment.dataset.index;
        commentInputElement.value = `> ${comments[index].text}\n\n${comments[index].name}, `;
        renderComment( comments );
      });
    }
  };