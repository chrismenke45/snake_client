import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ScoreForm(props) {
    const { score, setSavedScoreCount } = props
    const [name, setName] = useState("")
    let navigate = useNavigate()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleNoSaveScore = (e) => {
        e.preventDefault(e);
        setSavedScoreCount(prev => prev + 1)

    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
        if (name === '') { 
            return
        } else {
            let url = (process.env.REACT_APP_PROD_API_URL || process.env.REACT_APP_DEV_API_URL) + '/records';
            let data = new FormData()
            data.append('record[name]', name)
            data.append('record[score]', score)
            const options = {
                method: 'POST',
                mode: 'cors',
                body: data,
                headers: {
                    'Accept': 'application/json',
                }
            };
            fetch(url, options)
                .then((response) => response.json())
                .then(record => {
                    setName("")
                    navigate('/scores')
                })
                .catch(error => {
                    console.error('Error:', error)
                    console.log("yee")
                    setSavedScoreCount(prev => prev + 1)
                })
        }
    }

    return (
        <form id="scoreForm" className="popupForm" onSubmit={handleSubmit}>
            <h3>Your snake got to a length of <span className="biggerFont">{score}!</span></h3>
            <div className="formGroup">
                <label htmlFor="record[name]" value={name} >Name:</label>
                <input type="text" name="record[name]" onChange={handleNameChange} minLength={2} maxLength={14} ></input>
            </div>
            <input type="submit" value="Post to leaderboard"></input>
            <button onClick={handleNoSaveScore}>I don't want to save my score</button>
        </form>
    );
}

export default ScoreForm;