class Candy {
  constructor(maxX, maxY) {
    this.radius = 5;
    this.color = "#ff0000";
    this.x = Math.floor(Math.random() * (maxX - this.radius));
    this.y = Math.floor(Math.random() * (maxY - this.radius));
  }
}

export { Candy };
