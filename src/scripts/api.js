import { baseUrl, token } from "./config.js";

function handleResponse(response) {
  return response.ok ? response.json() : Promise.reject(`${response.status} - ${context}`);
}

function fetchUserData() {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: token,
    },
  }).then((response) => handleResponse(response, "fetchUserData"));
}

function fetchCardItems() {
  return fetch(`${baseUrl}/cards`, {
    headers: {
      Authorization: token,
    },
  }).then((response) => handleResponse(response, "fetchCardItems"));
}

function updateUserProfile(newUserData) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  }).then((response) => handleResponse(response, "updateUserProfile"));
}

function postCard(newCard) {
  return fetch(`${baseUrl}/cards`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  }).then((response) => handleResponse(response, "postCard"));
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then((response) => handleResponse(response, "deleteCard"));
}

function likeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
  }).then((response) => handleResponse(response, "likeCard"));
}

function dislikeCard(cardId) {
  return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
  }).then((response) => handleResponse(response, "dislikeCard"));
}

function postAvatar(newAvatar) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAvatar),
  }).then((response) => handleResponse(response, "postAvatar"));
}

export {
  fetchUserData,
  fetchCardItems,
  updateUserProfile,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
  postAvatar,
};
