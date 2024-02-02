import React, { useState } from 'react';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Replace this with your own logic for handling sign up
        console.log(`Signing up with username: ${username}, email: ${email}, and password: ${password}`);
    };

    return (
        <div>
            <h1>Sign Up Page</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}

export default SignUpPage;
