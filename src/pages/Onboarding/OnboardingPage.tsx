import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OnboardingModel from './OnboardingModel';
import OnboardingController from './OnboardingController';
import './OnboardingPage.css';

const OnboardingPage: React.FC = () => {
    const [onboardingModel, setOnboardingModel] = useState(OnboardingModel);
    const navigate = useNavigate();

    return (
        <Box className="onboarding">
            <Box className="onboarding-header">
                <Typography variant="h4">Onboarding Page</Typography>
                <Box className="header-aside">
                    <Button variant="contained" color="primary" onClick={() => OnboardingController.navigateTo('/auth/login', navigate)}>Login</Button>
                    <Button variant="contained" color="secondary" onClick={() => OnboardingController.navigateTo('/auth/signup', navigate)}>Create an account</Button>
                </Box>
            </Box>
            <Box className='feature'>
                <Button className="arrow-button" onClick={() => setOnboardingModel({ ...onboardingModel, currentSlide: OnboardingController.prevSlide(onboardingModel) })}><ArrowBackIcon /></Button>
                <Typography variant="body1">{onboardingModel.slides[onboardingModel.currentSlide]}</Typography>
                <Button className="arrow-button" onClick={() => setOnboardingModel({ ...onboardingModel, currentSlide: OnboardingController.nextSlide(onboardingModel) })}><ArrowForwardIcon /></Button>
            </Box>
            <Button variant="outlined" color="primary" onClick={() => OnboardingController.navigateTo('/auth/login', navigate)}>Skip</Button>
        </Box>
    );
}

export default OnboardingPage;
