class Space {
  constructor(row, column) {
    this.row = row
    this.column = column
    this.hasSnake = false
    this.hasApple = false
  }
  getSnake() {
    this.hasSnake = true;
  }
  removeSnake() {
    this.hasSnake = false;
  }
}

export default Space;

