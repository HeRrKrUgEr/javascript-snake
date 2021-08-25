class Snake {
  constructor() {
    this.parts = [new BodyPart(1, 1)];
    this.direction = "r";
    this.size = 10;
    this.speed = 5;
    this.color = "#007fab";
    this.growing = false;
    this._ = this;
  }

  changeDirection(e) {
    switch (e.keyCode) {
      case 38:
        if (this.direction == "l" || this.direction == "r")
          this.direction = "t";
        break;
      case 40:
        if (this.direction == "l" || this.direction == "r")
          this.direction = "b";
        break;
      case 37:
        if (this.direction == "t" || this.direction == "b")
          this.direction = "l";
        break;
      case 39:
        if (this.direction == "t" || this.direction == "b")
          this.direction = "r";
        break;
      default:
        break;
    }
  }

  move() {
    let { x, y } = this.parts[0];
    switch (this.direction) {
      case "r":
        x += this.speed;
        break;
      case "l":
        x -= this.speed;
        break;

      case "t":
        y -= this.speed;
        break;

      case "b":
        y += this.speed;
        break;
    }
    this.parts.unshift(new BodyPart(x, y));
    this.parts.pop();
  }

  addBodyPart() {
    let { x, y } = this.parts[0];
    switch (this.direction) {
      case "r":
        x -= this.width;
        break;
      case "l":
        x += this.width;
        break;

      case "t":
        y += this.height;
        break;

      case "b":
        y -= this.height;
        break;
    }
    this.parts.push(new BodyPart(x, y));
    console.log(this.parts);
  }

  selfCollision() {
    let rd = this.parts.reduce((acc, current) => {
      if (acc.find((item) => item.x === current.x && item.y === current.y))
        return acc;
      else return acc.concat(current);
    }, []);
    return rd.length != this.parts.length;
  }
}

class BodyPart {
  constructor(x, y) {
    this.isHead = false;
    this.isTail = false;
    this.x = x;
    this.y = y;
  }
}

export { Snake };
