import premierLeagueMatches from "./premier.js";


premierLeagueMatches(3)
  .then(products => console.log(products))
  .catch(error => console.error("Ocurrió un error:", error));
