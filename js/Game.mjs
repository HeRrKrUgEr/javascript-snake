import { Snake } from "./Snake.mjs";
import { Candy } from "./Candy.mjs";

class Game {
  constructor(width, height, fps) {
    console.log("Area init");
    this.width = width;
    this.height = height;
    this.fps = fps;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.snake = null;
    this.txtScore = document.getElementById("score");
    this.score = 0;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    console.log("Canvas drawn");
  }

  newGame() {
    let _ = this;
    console.log("Starting new game");
    this.updateScore(true);
    this.snake = new Snake();
    this.candy = new Candy(this.canvas.width, this.canvas.height);
    if (typeof this.updater != "undefined") clearInterval(this.updater);
    this.updater = setInterval(
      function (e) {
        _.updateBoard();
      },
      1000 / this.fps,
      this
    );
    document.addEventListener("keydown", function (e) {
      _.snake.changeDirection(e);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateScore(start = false) {
    start ? (this.score = 0) : this.score++;
    this.txtScore.innerHTML = this.score;
  }

  updateBoard() {
    this.clear();
    this.snake.move();
    this.snake.parts.forEach((element) => {
      this.ctx.fillStyle = this.snake.color;
      this.ctx.fillRect(element.x, element.y, this.snake.size, this.snake.size);
    });

    this.ctx.beginPath();
    this.ctx.fillStyle = this.candy.color;
    this.ctx.arc(this.candy.x, this.candy.y, this.candy.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    //collision
    if (
      this.snake.parts[0].x < 0 ||
      this.snake.parts[0].x > this.width ||
      this.snake.parts[0].y < 0 ||
      this.snake.parts[0].y > this.height ||
      this.snake.selfCollision()
    ) {
      this.gameOver();
    }

    //candycatch
    if (this.catchCandy()) {
      this.snake.addBodyPart();
      this.candy = new Candy(this.canvas.width, this.canvas.height);
      this.updateScore();
    }

    //mouseCollision
  }

  gameOver() {
    clearInterval(this.updater);
    this.snake = null;
    this.candy = null;
    this.clear();
  }

  catchCandy() {
    return (
      this.snake.parts[0].x < this.candy.x + this.candy.radius &&
      this.snake.parts[0].x + this.snake.size >
        this.candy.x - this.candy.radius &&
      this.snake.parts[0].y < this.candy.y + this.candy.radius &&
      this.snake.parts[0].y + this.snake.size > this.candy.y - this.candy.radius
    );
  }
}

export { Game };
