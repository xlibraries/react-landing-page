import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage.css';

function OnboardingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const slides = [
        'Feature 1: This is the first feature of the application.',
        'Feature 2: This is the second feature of the application.',
        'Feature 3: This is the third feature of the application.'
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const skipOnboarding = () => {
        navigate('/login');
    };

    return (
        <div className="onboarding">
            <header className="onboarding-header">
                <h1>Onboarding Page</h1>
                <div className="header-aside">
                    <button className='login-button' onClick={() => navigate('/login')}>Login</button>
                    <button className='signup-button' onClick={() => navigate('/signup')}>Create and account</button>
                </div>
            </header>
            <div className='feature'>
                <button className="arrow-button" onClick={prevSlide}>{'<'}</button>
                <p>{slides[currentSlide]}</p>
                <button className="arrow-button" onClick={nextSlide}>{'>'}</button>
            </div>
            <button className="skip-button" onClick={skipOnboarding}>Skip</button>
        </div>
    );
}

export default OnboardingPage;
