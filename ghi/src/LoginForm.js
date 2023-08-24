import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (username === 'your_username' && password === 'your_password') {

            navigate('/home'); // Redirect to home page
        } else {

            console.log('Invalid username or password');
        }

        // reset fields
        setUsername('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <button type="submit">Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;
