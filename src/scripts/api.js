import { cohort, token } from "./config.js";

function fetchUserData() {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/users/me`, {
    headers: {
      Authorization: token,
    },
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - fetchUserData`)
  );
}

function fetchCardItems() {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/cards`, {
    headers: {
      Authorization: token,
    },
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - fetchCardItems`)
  );
}

function updateUserProfile(newUserData) {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - updateUserProfile`)
  );
}

function postCard(newCard) {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/cards`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - postCard`)
  );
}

function deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - deleteCard`)
  );
}

function likeCard(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    }
  ).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - likeCard`)
  );
}

function dislikeCard(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  ).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - dislikeCard`)
  );
}

function postAvatar(newAvatar) {
  return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAvatar),
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`${response.status} - postAvatar`)
  );
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
