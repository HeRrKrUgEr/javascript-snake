import { Game } from "./Game.mjs";

let game;
window.onload = (event) => {
  game = new Game(800, 600, 50);

  document.getElementById("startBtn").onclick = function () {
    game.newGame();
  };
};
