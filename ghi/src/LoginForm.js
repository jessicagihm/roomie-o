import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();


        const isAuthenticated = await login(username, password);

        if (isAuthenticated) {
            navigate('/home'); // Redirect to home page upon successful login
        } else {
            console.log('Invalid username or password');
        }

        // Reset fields
        setUsername('');
        setPassword('');
    };

    return (
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
