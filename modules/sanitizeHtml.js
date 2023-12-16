// Создаем функцию, которая принимает строку и возвращает обработанный результат
export const sanitizeHtml = (htmlString) => {
    return htmlString
           .replaceAll("&", "&amp;")
           .replaceAll("<", "&lt;")
           .replaceAll(">", "&gt;")
           .replaceAll('"', "&quot;");
   };