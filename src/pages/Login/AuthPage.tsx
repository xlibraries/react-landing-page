import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputHandler from './InputHandler';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!InputHandler.validateEmail(email) || !InputHandler.validatePassword(password)) {
            alert('Invalid email or password.');
            return;
        }

        // Replace this with your own logic for handling login
        console.log(`Logging in with email: ${email} and password: ${password}`);
        navigate('/home');
    };

    const handleSignUp = () => {
        if (!InputHandler.validateEmail(email) || !InputHandler.validatePassword(password) || password !== confirmPassword) {
            alert('Invalid email, password, or passwords do not match.');
            return;
        }

        // Replace this with your own logic for handling sign up
        console.log(`Signing up with username: ${username}, email: ${email}, and password: ${password}`);
        navigate('/home');
    };

    return (
        <div>
            <h1>{isLogin ? 'Login Page' : 'Sign Up Page'}</h1>
            {!isLogin && <input type="text" value={username} onChange={(e) => setUsername(InputHandler.preventDOMInjection(e.target.value))} placeholder="Username" />}
            <input type="email" value={email} onChange={(e) => setEmail(InputHandler.preventDOMInjection(e.target.value))} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(InputHandler.preventDOMInjection(e.target.value))} placeholder="Password" />
            {!isLogin && <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(InputHandler.preventDOMInjection(e.target.value))} placeholder="Confirm Password" />}
            <button onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? 'Login' : 'Sign Up'}</button>
            <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Go to Sign Up' : 'Go to Login'}</button>
        </div>
    );
}

export default AuthPage;
