export const urlBase =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api"; // sur le serveur, les fetch commencent juste par /api

export const urlBaseAvatar =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/uploads"
    : "/uploads"; // sur le serveur, les fetch commencent juste par /api