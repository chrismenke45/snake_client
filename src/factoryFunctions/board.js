import Space from "./Space";
import arrayWithinArray from "../functions/arrayWithinArray";

function Board(boardSize) {
  let spaces = []
  for (var i = 0; i < boardSize; i++) {
    let row = []
    for (var j = 0; j < boardSize; j++) {
      row.push(new Space(i, j))
    }
    spaces.push(row)
  }
  return {
    boardSize,
    spaces,
    applePlaced() {
      return this.spaces.some(row => row.some(space => space.hasApple))
    },
    snakeOnBoard(snake) {
      spaces.forEach(row => {
        row.forEach(space => {
          if (arrayWithinArray(snake.spots, [space.row, space.column])) {
            space.getSnake()
          } else {
            space.removeSnake()
          }
        })
      })
    },
    appleOnBoard() {
      let notValidSpot = true;
      let appleSpot
      while (notValidSpot) {
        appleSpot = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];
        if (!this.spaces[appleSpot[0]][appleSpot[1]].hasSnake) { notValidSpot = false }
      }
      this.spaces[appleSpot[0]][appleSpot[1]].hasApple = true;
    },
    clearApple() {
      this.hasApple = false;
      this.spaces.forEach(row => {
        row.forEach(space => space.hasApple = false)
      })
    },
    showBoard(snakeDead) {
      let content = []
      spaces.forEach(row => {
        row.forEach(space => {
          let identifier = `${space.row}.${space.column}`
          if (space.hasSnake) {
            content.push(<div id={"s" + identifier} className={snakeDead ? "hasDeadSnake" : "hasSnake"} key={identifier}></div>)
          } else if (space.hasApple) {
            content.push(<div id={"s" + identifier} className="hasApple" key={identifier}></div>)
          } else {
            content.push(<div id={"s" + identifier} key={identifier}></div>)
          }
          //content.push(space.hasSnake ? <div id={"s" + identifier} className="hasSnake" key={identifier}></div> : <div id={"s" + identifier} key={identifier}></div>)
        })
      })
      return content
    }
  };
}

// class Board {
//   constructor(boardSize) {
//     this.boardSize = boardSize
//     let spaces = []
//     for (var i = 0; i < boardSize; i++) {
//       let row = []
//       for (var j = 0; j < boardSize; j++) {
//         row.push(new Space(i, j))
//       }
//       spaces.push(row)
//     }
//     this.spaces = spaces
//   }
//   applePlaced() {
//     return this.spaces.some(row => row.some(space => space.hasApple))
//   }
//   appleOnBoard() {
//     let notValidSpot = true;
//     let appleSpot
//     while (notValidSpot) {
//       appleSpot = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];
//       if (!this.spaces[appleSpot[0]][appleSpot[1]].hasSnake) { notValidSpot = false }
//     }
//     this.spaces[appleSpot[0]][appleSpot[1]].hasApple = true;
//   }
//   clearApple() {
//     this.hasApple = false;
//     this.spaces.forEach(row => {
//       row.forEach(space => space.hasApple = false)
//     })
//   }
//   snakeOnBoard(snake) {
//     this.spaces.forEach(row => {
//       row.forEach(space => {
//         if (arrayWithinArray(snake.spots, [space.row, space.column])) {
//           space.getSnake()
//         } else {
//           space.removeSnake()
//         }
//       })
//     })
//   }
//   showBoard(snakeDead) {
//     let content = []
//     this.spaces.forEach(row => {
//       row.forEach(space => {
//         let identifier = `${space.row}.${space.column}`
//         if (space.hasSnake) {
//           content.push(<div id={"s" + identifier} className={snakeDead ? "hasDeadSnake" : "hasSnake"} key={identifier}></div>)
//         } else if (space.hasApple) {
//           content.push(<div id={"s" + identifier} className="hasApple" key={identifier}></div>)
//         } else {
//           content.push(<div id={"s" + identifier} key={identifier}></div>)
//         }
//         //content.push(space.hasSnake ? <div id={"s" + identifier} className="hasSnake" key={identifier}></div> : <div id={"s" + identifier} key={identifier}></div>)
//       })
//     })
//     return content
//   }
// }

export default Board;

