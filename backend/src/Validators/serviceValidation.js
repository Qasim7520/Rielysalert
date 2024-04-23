const yup = require("yup")
module.exports = {
    create_service: async (req, res, next) => {
        const schema = yup.object().shape({
            name: yup.string().required("Service Name is required"),
            subServices: yup.array().required("Sub Services is required."),
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