function space(row, column) {
    return {
      row: row,
      column: column,
      hasSnake: false,
      hasApple: false,
      getSnake() {
        this.hasSnake = true;
      },
      removeSnake() {
        this.hasSnake = false;
      }
    };
  }
export default space;