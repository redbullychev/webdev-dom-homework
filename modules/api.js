export let token;
const userURL = "https://wedev-api.sky.pro/api/user/login";

export const setToken = (newToken) => {
  token = newToken;
};


export function getApi() {
    return fetch("https://wedev-api.sky.pro/api/v2/bulychev-ivan/comments"
  , {
    method: "GET",
     headers: {
       Authorization: `Bearer ${token}`,
     },
  }).then((response) => {
    return response.json() })
  }

  export function postApi(name, text) {
    return fetch("https://wedev-api.sky.pro/api/v2/bulychev-ivan/comments", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          name: name,
          forceError: false
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
  }

  export function login({ login, password }) {
    return fetch(userURL, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    }).then((response) => {
      if (response.status === 400) {
        alert("неверный логин/пароль, попробуйте снова");
        throw new Error ("Неверный логин/пароль");
    }
      return response.json();
    });
  }