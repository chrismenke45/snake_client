import React, { useEffect, useState } from 'react';

import Board from '../factoryFunctions/Board'
import Snake from '../factoryFunctions/Snake'

import ScoreForm from './ScoreForm';


function Game() {
    const incrementTime = 150;
    const boardSize = 15
    const [theSnake, setTheSnake] = useState(new Snake(boardSize))
    const [theBoard, setTheBoard] = useState(new Board(boardSize))
    const [savedScoreCount, setSavedScoreCount] = useState(0)
    const [startNewGame, setStartNewGame] = useState(0)

    const directionChange = (e) => {
        setTheSnake(prevSnake => {
            prevSnake.keyboardCodetoDirection(e.code)
            return { ...prevSnake }
        })
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => directionChange(e))
        return document.removeEventListener("keydown", (e) => directionChange(e))
    }, [])

    useEffect(() => {
        setTheSnake(new Snake(boardSize))
        setStartNewGame(prev => prev + 1)
    }, [savedScoreCount]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTheSnake((prevSnake) => {
                let currentHead = prevSnake.spots[0]
                let nextSpot = [currentHead[0] + prevSnake.direction[0], currentHead[1] + prevSnake.direction[1]]
                if (prevSnake.dead) {
                    clearInterval(timer)
                } else if (theBoard.spaces[nextSpot[0]] && theBoard.spaces[nextSpot[0]][nextSpot[1]] && theBoard.spaces[nextSpot[0]][nextSpot[1]].hasApple) {

                    prevSnake.takeNextSpot()
                    setTheBoard(prevBoard => {
                        prevBoard.clearApple()
                        prevBoard.snakeOnBoard(prevSnake)
                        if (!prevBoard.applePlaced()) {
                            prevBoard.appleOnBoard()
                        }
                        return { ...prevBoard }
                    })


                } else {
                    prevSnake.move()
                    setTheBoard(prevBoard => {
                        prevBoard.snakeOnBoard(prevSnake)
                        if (!prevBoard.applePlaced()) {
                            prevBoard.appleOnBoard()
                        }
                        return { ...prevBoard }
                    })

                }
                return { ...prevSnake }
            })
        }, incrementTime);
        return () => clearInterval(timer);
    }, [startNewGame])

    return (
        <main id="board">
            {theBoard.showBoard(theSnake.dead)}
            {theSnake.dead && (<ScoreForm score={theSnake.spots.length} setSavedScoreCount={setSavedScoreCount} />)}
        </main>


    );
}


export default Game;
