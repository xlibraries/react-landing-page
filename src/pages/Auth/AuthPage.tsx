import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, Card, CardContent } from '@material-ui/core';
import UserModel from './UserModel';
import AuthController from './AuthController';
import './AuthPage.css';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const { mode } = useParams(); // Get the mode (login or signup) from the route parameters
    const isLogin = mode === 'login';
    const [userModel, setUserModel] = useState({ ...UserModel, isLogin }); // Set isLogin based on the mode

    return (
        <Box className="auth-page">
            <Card className="auth-card">
                    <CardContent>
                    <Typography className="auth-title" variant="h4">{userModel.isLogin ? 'Login' : 'Sign Up'}</Typography>
                    <div className="auth-fields">
                        {!userModel.isLogin && <TextField value={userModel.username} onChange={(e) => setUserModel({ ...userModel, username: e.target.value })} label="Username" />}
                        <TextField className="auth-field" type="email" value={userModel.email} onChange={(e) => setUserModel({ ...userModel, email: e.target.value })} label="Email" />
                        <TextField className="auth-field" type="password" value={userModel.password} onChange={(e) => setUserModel({ ...userModel, password: e.target.value })} label="Password" />
                        {!userModel.isLogin && <TextField className="auth-field" type="password" value={userModel.confirmPassword} onChange={(e) => setUserModel({ ...userModel, confirmPassword: e.target.value })} label="Confirm Password" />}
                    </div>
                    <div className="auth-buttons">
                        <Button className="auth-button" variant="contained" color="primary" onClick={() => AuthController.handleAuth(userModel, navigate)}>{userModel.isLogin ? 'Login' : 'Sign Up'}</Button>
                        <Button className="auth-button" variant="contained" color="secondary" onClick={() => setUserModel({ ...userModel, isLogin: !userModel.isLogin })}>{userModel.isLogin ? 'Go to Sign Up' : 'Go to Login'}</Button>
                    </div>
                    </CardContent>
            </Card>
        </Box>
    );
}

export default AuthPage;
