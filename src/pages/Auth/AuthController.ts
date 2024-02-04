import UserModel from './UserModel';

const AuthController = {
    handleLogin: async (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (!userModel.validateEmail(userModel.email) || !userModel.validatePassword(userModel.password)) {
            alert('Invalid email or password.');
            return;
        }

        // Make an API call to login the user
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userModel.email,
                password: userModel.password
            })
        });

        if (response.ok) {
            console.log(`Logged in with email: ${userModel.email}`);
            navigate('/home');
        } else {
            console.error('Error logging in:', response.statusText);
        }
    },

    handleSignUp: async (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (!userModel.validateEmail(userModel.email) || !userModel.validatePassword(userModel.password) || userModel.password !== userModel.confirmPassword) {
            alert('Invalid email, password, or passwords do not match.');
            return;
        }

        // Make an API call to register the user
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userModel.email,
                password: userModel.password,
                username: userModel.username
            })
        });

        if (response.ok) {
            console.log(`Signed up with username: ${userModel.username}, email: ${userModel.email}`);
            navigate('/home');
        } else {
            console.error('Error signing up:', response.statusText);
        }
    },

    handleAuth: (userModel: typeof UserModel, navigate: (path: string) => void) => {
        if (userModel.isLogin) {
            AuthController.handleLogin(userModel, navigate);
        } else {
            AuthController.handleSignUp(userModel, navigate);
        }
    }
};

export default AuthController;
