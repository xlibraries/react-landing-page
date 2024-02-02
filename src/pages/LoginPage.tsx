import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Replace this with your own logic for handling login
        navigate('/home');
        console.log(`Logging in with email: ${email} and password: ${password}`);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
