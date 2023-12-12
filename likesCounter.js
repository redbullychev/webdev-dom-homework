// Счетчик лайков

export const initLikesCounter = ( comments, renderComment ) => {
    const buttonsLikes = document.querySelectorAll(".like-button");
    for (const buttonLikes of buttonsLikes) {
      buttonLikes.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = buttonLikes.dataset.index;
        if (comments[index].isLiked == true) {
          comments[index].likes -=1;
          comments[index].isLiked = false;     
        } else {
          comments[index].likes +=1;
          comments[index].isLiked = true;      
        }
        renderComment( comments );
      });
    }
    };