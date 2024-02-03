import UserModel from './UserModel';

const AuthController = {
    handleLogin: (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (!userModel.validateEmail(userModel.email) || !userModel.validatePassword(userModel.password)) {
            alert('Invalid email or password.');
            return;
        }

        // Replace this with your own logic for handling login
        console.log(`Logging in with email: ${userModel.email} and password: ${userModel.password}`);
        navigate('/home');
    },

    handleSignUp: (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (!userModel.validateEmail(userModel.email) || !userModel.validatePassword(userModel.password) || userModel.password !== userModel.confirmPassword) {
            alert('Invalid email, password, or passwords do not match.');
            return;
        }

        // Replace this with your own logic for handling sign up
        console.log(`Signing up with username: ${userModel.username}, email: ${userModel.email}, and password: ${userModel.password}`);
        navigate('/home');
    },

     handleAuth: (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (userModel.isLogin) {
            AuthController.handleLogin(userModel, navigate);
        } else {
            AuthController.handleSignUp(userModel, navigate);
        }
    }
    // Add other methods related to user interactions here
};
export default AuthController;
