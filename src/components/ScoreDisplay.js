import { useEffect, useState } from "react"
import {
    Link
} from "react-router-dom";

function ScoreDisplay(props) {
    const [scores, setScores] = useState(null)

    useEffect(() => {
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
                setScores(scores)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])


    return (
        <main id="scores">
            {scores ? (
                <div id="scoresContainer">
                    <Link to="/" className="backBtn backBtnAbsolute">BACK</Link>
                    <h2 id="highScoresTitle">High Scores:</h2>
                    <ol>
                        {scores.map((score) => {
                            return (<li key={`score${score.id}`}>{score.name} - {score.score}</li>)
                        })}
                    </ol>
                </div>
            ) : (
                <div className="loadingContainer">
                    <Link to="/" className="backBtn backBtnFlex">BACK</Link>
                    <div className="loadingDots">
                        <div className="loading loading1"></div>
                        <div className="loading loading2"></div>
                        <div className="loading loading3"></div>
                    </div>
                </div>
            )}

        </main>
    );
}

export default ScoreDisplay;