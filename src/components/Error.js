import { Link } from "react-router-dom"

function Error(props) {
    const { error } = props
    console.log(error)
    return (
        <main id="error">
            <Link to="/" className="backBtn backBtnFlex">BACK</Link>
            <h2>Error</h2>
        </main>
    );
}

export default Error;