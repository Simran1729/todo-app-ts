import { useState } from "react"
import { Link } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSingup = async () => {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            window.location = "/todos";
        } else {
            alert("Error while signing up");
        }
    };


    return (
        <div style={{ justifyContent: 'center', display: 'flex', width: "100%" }}>
            <div>
                <h2>Singup</h2>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                Already signed up ? <Link to="/login">login</Link>
                <button onClick={handleSingup}>Signup</button>
            </div>

        </div>
    )
}

export default Signup