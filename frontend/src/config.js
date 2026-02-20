export const urlBase =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api"; // sur le serveur, les fetch commencent juste par /api