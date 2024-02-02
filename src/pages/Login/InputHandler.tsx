class InputHandler {
    static validateEmail(email: string) {
        // Basic email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static validatePassword(password: string) {
        // Password should be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return re.test(password);
    }

    static preventDOMInjection(input: string) {
        // Replace < and > with their HTML entities to prevent DOM injection
        return input.replace(/</g, '<').replace(/>/g, '>');
    }
}

export default InputHandler;
