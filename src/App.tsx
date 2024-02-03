import React from 'react';
import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Login/AuthPage';
//import SignUpPage from './pages/Login/SignUpPage';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<OnboardingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
}