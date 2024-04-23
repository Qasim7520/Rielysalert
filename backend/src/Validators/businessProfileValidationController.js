const yup = require("yup")
module.exports = {
    create_business_profile: async (req, res, next) => {
        const schema = yup.object().shape({
            pointOfContact: yup.string().required("Point of Contact is required"),
            name: yup.string().required("Name is required"),
            email: yup.string().required("Email is required").email("Email is invalid")
                .test('is-valid-domain', 'Invalid email domain', (value) => {
                    if (!value) return true;
                    const parts = value.split('@');
                    if (parts.length !== 2) return false;
                    const domain = parts[1];
                    return domain.includes('.');
                }),
            phone: yup.string().required("Phone number is required."),
            password: yup.string().required("Password is required"),
            confirm_password: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm Password is required"),
            zip_code: yup.string().required("Zip Code is required."),
            address: yup.string().required("Address is required.")

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

    business_profile_rating: async (req, res, next) => {
        const schema = yup.object().shape({
            rating: yup.number().required("Rating is required"),
            userId:yup.string().required("User Id is required"),
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
}