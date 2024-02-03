import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

    const login = () => {
        navigate('/login');
    };

    return (
        <Box className="onboarding">
            <Box className="onboarding-header">
                <Typography variant="h4">Onboarding Page</Typography>
                <Box className="header-aside">
                    <Button variant="contained" color="primary" onClick={login}>Login</Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>Create an account</Button>
                </Box>
            </Box>
            <Box className='feature'>
                <Button className="arrow-button" onClick={prevSlide}><ArrowBackIcon /></Button>
                <Typography variant="body1">{slides[currentSlide]}</Typography>
                <Button className="arrow-button" onClick={nextSlide}><ArrowForwardIcon /></Button>
            </Box>
            <Button variant="outlined" color="primary" onClick={login}>Skip</Button>
        </Box>
    );
}

export default OnboardingPage;
