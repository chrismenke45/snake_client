import React, { useEffect, useState } from 'react';

import board from '../factoryFunctions/board'
import snake from '../factoryFunctions/snake'

import ScoreForm from './ScoreForm';


function Game() {
    const incrementTime = 150;
    const boardSize = 15
    const [theSnake, setTheSnake] = useState(snake(boardSize))
    const [theBoard, setTheBoard] = useState(board(boardSize))
    const [savedScoreCount, setSavedScoreCount] = useState(0)

    const directionChange = (e) => {
        setTheSnake(prevSnake => {
            prevSnake.keyboardCodetoDirection(e.code)
            return { ...prevSnake }
        })
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => directionChange(e))
        //below is to ping api to start up server
        let url = (process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL) + '/records';
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        };
        fetch(url, options)
            .then((response) => response.json())
            .then(scores => {
                console.log("pinged API for startup")
            })
            .catch(error => {
                console.error('Error:', error)
            })
        //above is to ping api to start up server
        return document.removeEventListener("keydown", (e) => directionChange(e))
    }, [])

    useEffect(() => {
        setTheSnake(snake(boardSize))
        const timer = setInterval(() => {
            setTheSnake((prevSnake) => {
                let currentHead = prevSnake.spots[0]
                let nextSpot = [currentHead[0] + prevSnake.direction[0], currentHead[1] + prevSnake.direction[1]]
                setTheBoard(prevBoard => {
                    if (!prevBoard.applePlaced()) {
                        prevBoard.appleOnBoard()
                    }
                    return { ...prevBoard }
                })
                if (prevSnake.dead) {
                    clearInterval(timer)
                } else if (theBoard.spaces[nextSpot[0]] && theBoard.spaces[nextSpot[0]][nextSpot[1]] && theBoard.spaces[nextSpot[0]][nextSpot[1]].hasApple) {

                    prevSnake.takeNextSpot()
                    setTheBoard(prevBoard => {
                        prevBoard.clearApple()
                        prevBoard.snakeOnBoard(prevSnake)
                        return { ...prevBoard }
                    })


                } else {
                    prevSnake.move()
                    setTheBoard(prevBoard => {
                        prevBoard.snakeOnBoard(prevSnake)
                        return { ...prevBoard }
                    })

                }



                return { ...prevSnake }
            })
        }, incrementTime);
        return () => clearInterval(timer);
    }, [savedScoreCount]);

    return (
        <main id="board">
            {theBoard.showBoard(theSnake.dead)}
            {theSnake.dead && (<ScoreForm score={theSnake.spots.length} setSavedScoreCount={setSavedScoreCount} />)}
        </main>


    );
}


export default Game;
