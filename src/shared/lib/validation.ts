export const getPasswordStrength = (password: string) => {
    return {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSymbol: /[!@#$%^&*]/.test(password),
    };
};

export const validatePassword = (password: string) => {
    const strength = getPasswordStrength(password);

    if (!strength.minLength) return 'auth.password_min_length';
    if (!strength.hasUpperCase) return 'auth.password_contain_uppercase';
    if (!strength.hasLowerCase) return 'auth.password_contain_lowercase';
    if (!strength.hasNumber) return 'auth.password_contain_number';
    if (!strength.hasSymbol) return 'auth.password_contain_symbol';

    return null;
};
