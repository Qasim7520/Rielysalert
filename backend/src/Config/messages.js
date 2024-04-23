module.exports = {
    errorMessage: {
        accountAlreadyExist: "Account already exists with this email",
        unableToSendEmail: "Email sending error.Please try after later.",
        somethingWentWrong: "Something went wrong, please try again later.",
        internalServerError: "Internal Server Error, please try again later",
        wrongEmailOrPassword: "Email or password is wrong.",
        unAuthorized: "You are unauthorized to make this request!",
        doesNotExist: (name) => name ? `Requested ${name} data does not exist!` : 'Requested data does not exist!',
        retrievalFailed: (name) => `${name} retrieval failed`,
        creationFailed: (name) => `${name} creation failed`,
        updatingFailed: (name) => `${name} updating failed`,
    },
    successMessage: {
        successCheckEmail: "Account created successfully.Please check your email to verify your account.",
        successfullyRetrieved: (name) => `Successfully retrieved ${name}`,
        creationSuccess: (name) => `${name} was created successfully!`,
        updatingSuccess: (name) => `${name} updated successfully!`
    },
    validationMessages: {
        userName: "Username is required.",
        emailRequired: "Email is required",
        invalidEmail: "Email is not valid.",
        passwordRequired: "Password is required.",
        confirmPasswordRequired: "Confirm Password is required.",
        passwordLengthIsShort: "Password length is to short",
        isRequired: (name) => `${name} is required`
    }
}