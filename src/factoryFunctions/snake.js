import arrayWithinArray from "../functions/arrayWithinArray";

class Snake {
  constructor(boardSize, oldSnake) {
    let midBoard = Math.floor(boardSize / 2) - 1
    this.boardSize = boardSize
    this.spots = oldSnake?.spots || [[midBoard, midBoard], [midBoard, midBoard + 1], [midBoard, midBoard + 2]]
    this.direction = oldSnake?.direction || [1, 0]
    this.dead = oldSnake?.dead || false
  }
  allowableSpot(twoElementArray) {
    return [...Array(this.boardSize).keys()].includes(twoElementArray[0]) && [...Array(this.boardSize).keys()].includes(twoElementArray[1]) && !arrayWithinArray(this.spots, twoElementArray);
  }
  die() {
    this.dead = true
  }
  addDirection(twoElementArray) {
    return [twoElementArray[0] + this.direction[0], twoElementArray[1] + this.direction[1]]
  }
  move() {
    this.takeNextSpot()
    if (!this.dead && !(this.direction[0] === 0 && this.direction[1] === 0)) {
      this.spots.pop()
    }
  }
  takeNextSpot() {
    let nextSpot = this.addDirection(this.spots[0])
    if (this.allowableSpot(nextSpot) && !this.dead) {
      this.spots.unshift(nextSpot)
    } else if (this.direction[0] === 0 && this.direction[1] === 0) {

    } else {
      this.die()
    }
  }
  keyboardCodetoDirection(key) {
    switch (key) {
      case "ArrowLeft": //leftArrow
        this.direction = [0, -1];
        break;
      case "ArrowUp": // upArrow
        this.direction = [-1, 0];
        break;
      case "ArrowRight": //rightArrow
        this.direction = [0, 1];
        break;
      case "ArrowDown": // downArrow
        this.direction = [1, 0];
        break;
      case "Space": //spacebar or enter
        this.direction = [0, 0];
        break;
      default:
      // do nothing
    }
  }
}

export default Snake;