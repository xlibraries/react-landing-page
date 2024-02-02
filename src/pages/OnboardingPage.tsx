import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const skipOnboarding = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Onboarding Page</h1>
            <p>{slides[currentSlide]}</p>
            <button onClick={nextSlide}>Next</button>
            <button onClick={skipOnboarding}>Skip</button>
        </div>
    );
}

export default OnboardingPage;
