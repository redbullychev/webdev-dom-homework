export function getApi() {
    return fetch("https://wedev-api.sky.pro/api/v1/bulychev-ivan/comments"
  , {
    method: "GET"
  }).then((response) => {
    return response.json() })
  }

  export function postApi(name, text) {
    return fetch("https://wedev-api.sky.pro/api/v1/bulychev-ivan/comments", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          name: name,
          forceError: false
        })
      }); 
  }