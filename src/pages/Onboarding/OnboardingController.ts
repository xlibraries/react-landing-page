import OnboardingModel from './OnboardingModel';

const OnboardingController = {
    nextSlide: (onboardingModel: typeof OnboardingModel) => {
        return (onboardingModel.currentSlide + 1) % onboardingModel.slides.length;
    },

    prevSlide: (onboardingModel: typeof OnboardingModel) => {
        return (onboardingModel.currentSlide - 1 + onboardingModel.slides.length) % onboardingModel.slides.length;
    },

    navigateTo: (path: string, navigate: (path: string) => void) => {
        navigate(path);
    }
    // Add other methods related to user interactions here
};

export default OnboardingController;
