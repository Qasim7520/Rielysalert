const yup = require("yup")
const { validationMessages, errorMessage } = require("../Config/messages")
const validateRequest = async (schema, request) => {
    try {
        const data = await schema.validate(request, { abortEarly: false });
        return data;
    } catch (error) {
        throw new Error(error.errors);
    }
};

module.exports = {
    create_account: async (req, res, next) => {
        const schema = yup.object().shape({
            first_name: yup.string().required("First name is required"),
            last_name: yup.string().required("Last name is required"),
            email: yup.string().required("Email is required").email("Email is invalid")
                .test('is-valid-domain', 'Invalid email domain', (value) => {
                    if (!value) return true;
                    const parts = value.split('@');
                    if (parts.length !== 2) return false;
                    const domain = parts[1];
                    return domain.includes('.');
                }),
            password: yup
                .string()
                .required("Password is required")
                .test('passwords-match', `Password doesn't match`, function (value) {
                    return value === this.parent.confirm_password;
                }),
            confirm_password: yup
                .string()
                .required("Confirm Password is required")
                .test('passwords-match', `Password doesn't match`, function (value) {
                    return value === this.parent.password;
                }),
        });



        schema.validate(req.body, { abortEarly: false })
            .then((data) => {
                return next();
            })
            .catch((error) => {
                console.log("ERROR::", error);
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },


    login: async (req, res, next) => {
        yup
            .object({
                body: yup.object().shape({
                    email: yup
                        .string()
                        .email("Email is invalid.")
                        .test('is-valid-domain', 'Invalid email domain', (value) => {
                            if (!value) return true;
                            const parts = value.split('@');
                            if (parts.length !== 2) return false;
                            const domain = parts[1];
                            return domain.includes('.');
                        }),
                    password: yup.string(),
                }),
            })
            .test('email-password-required', 'Email and password are required', function (value) {
                const { email, password } = value.body;

                if (!email && !password) {
                    return this.createError({
                        path: 'email-password-required',
                        message: 'Email and password are required',
                        params: value,
                    });
                }

                if (!email && password) {
                    return this.createError({
                        path: 'email-required',
                        message: 'Email is required',
                        params: value,
                    });
                }

                if (email && !password) {
                    return this.createError({
                        path: 'password-required',
                        message: 'Password is required',
                        params: value,
                    });
                }

                return true;
            })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },



    resendOtp: async (req, res, next) => {
        yup.object({
            body: yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Email is invalid.")
                    .test('is-valid-domain', 'Invalid email domain', (value) => {
                        if (!value) return true;
                        const parts = value.split('@');
                        if (parts.length !== 2) return false;
                        const domain = parts[1];
                        return domain.includes('.');
                    }),
            }),
        })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },
    verifyOtp: async (req, res, next) => {
        yup.object({
            body: yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Email is invalid.")
                    .test('is-valid-domain', 'Invalid email domain', (value) => {
                        if (!value) return true;
                        const parts = value.split('@');
                        if (parts.length !== 2) return false;
                        const domain = parts[1];
                        return domain.includes('.');
                    }),
                otp: yup
                    .string()
                    .required("OTP required")
            }),
        })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },
    resetPassword: async (req, res, next) => {
        yup.object({
            body: yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Email is invalid.")
                    .test('is-valid-domain', 'Invalid email domain', (value) => {
                        if (!value) return true;
                        const parts = value.split('@');
                        if (parts.length !== 2) return false;
                        const domain = parts[1];
                        return domain.includes('.');
                    }),
            }),
        })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },
    updatePassword: async (req, res, next) => {
        yup.object({
            body: yup.object().shape({
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Email is invalid.")
                    .test('is-valid-domain', 'Invalid email domain', (value) => {
                        if (!value) return true;
                        const parts = value.split('@');
                        if (parts.length !== 2) return false;
                        const domain = parts[1];
                        return domain.includes('.');
                    }),
                password: yup
                    .string()
                    .required("Password is required")
                    .test('passwords-match', `Password doesn't match`, function (value) {
                        return value === this.parent.confirm_password;
                    }),
                confirm_password: yup
                    .string()
                    .required("Confirm Password is required")
                    .test('passwords-match', `Password doesn't match`, function (value) {
                        return value === this.parent.password;
                    }),

            }),
        })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },

    addContact: async (req, res, next) => {
        yup.object({
            body: yup.object().shape({
                name: yup.string().required("Name is required"),
                email: yup
                    .string()
                    .required("Email is required")
                    .email("Email is invalid.")
                    .test('is-valid-domain', 'Invalid email domain', (value) => {
                        if (!value) return true;
                        const parts = value.split('@');
                        if (parts.length !== 2) return false;
                        const domain = parts[1];
                        return domain.includes('.');
                    }),
                phone: yup.string().required("Phone number is rerquired.")
            }),
        })
            .validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                { abortEarly: false }
            )
            .then((data) => {
                return next();
            })
            .catch((error) => {
                return res.json({ status: 403, error: true, msg: "Validation error", data: error.errors });
            });
    },
}

