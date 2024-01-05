import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale'


export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function getDateBefore(value) {
  return formatDistance(new Date(value), new Date(), { locale: ru })
}
