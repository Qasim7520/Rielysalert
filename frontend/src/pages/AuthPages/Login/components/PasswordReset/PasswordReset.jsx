import React from "react";
import AuthStyles from "../../../AuthStyles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";
import * as yup from "yup";

import { Layout } from "../../../../../views/Layout";
import { Separator, Spinner } from "../../../../../components";
import { LabeledInput } from "../../../../../components/LabeledInput/LabeledInput";
import { RoutePaths } from "../../../../routePaths";

import { useNotification } from "../../../../../hooks/notificationProvider";



const ForgetPasswordPageValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .max(16, "Maximum 16 characters are allowed")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .max(16, "Maximum 16 characters are allowed")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

export const PasswordReset = ({ setSelectedForm }) => {
  const push = useNavigate();
  const { triggerNotification } = useNotification();
  const url = new URL(window.location.href);
  const code = url.searchParams.get('token');

  // const callLoginAPI = async (values) => {
  //   login(values)
  //     .then(() => {
  //       console.log('Inside login')
  //       //push('/success_box')
  //     })
  //     .catch((err) => {
  //       if (err.status === 422) {
  //         const outputObject = {};
  //         Object.keys(err.data.errors).forEach((field) => {
  //           outputObject[field] = err.data.errors[field].message;
  //         });
  //       } else {
  //         triggerNotification({
  //           message: err.data.message,
  //           type: "error",
  //         });
  //       }
  //     });

  // }
  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={AuthStyles.pageContainer}>
        <div className={AuthStyles.formContainer}>
          <div className={AuthStyles.heading}>Change password</div>
          <Separator height="30px" />
          <Formik
            initialValues={{ confirmPassword: "", password: "", }}
            validationSchema={ForgetPasswordPageValidationSchema}
          // onSubmit={(values, { setSubmitting }) => {
          //   resetpassword(values.confirmPassword, values.password, code)
          //     .then((res) => {
          //       triggerNotification({
          //         message: res.message,
          //         type: "success",
          //       });
          //       setSubmitting(false);
          //       const values = { email: res?.updatedUser?.email, password: "123456", emailVerify: true }
          //       //callLoginAPI(values)
          //       push(`/success_box?email=${res?.updatedUser?.email}`);
          //       // setSelectedForm(3);
          //     })
          //     .catch((err) => {
          //       console.log('Error', err)
          //       setSubmitting(false);
          //       triggerNotification({
          //         message: err.data.message,
          //         type: "error",
          //       });
          //     });
          // }}
          >
            {({ isSubmitting }) => (
              <FormikForm style={{ width: "100%" }}>
                <div className={AuthStyles.fieldItem}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Enter new password"
                        type="password"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                        style={{ maxWidth: '335px', overflow: 'hidden' }}
                        className={AuthStyles.customfield1}
                      />
                    )}
                  </Field>
                </div>
                <Separator height="15px" />
                <div className={AuthStyles.fieldItem}>
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Re-enter your new password"
                        type="password"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                        style={{ maxWidth: '335px', overflow: 'hidden' }}
                        className={AuthStyles.customfield1}
                      />
                    )}
                  </Field>
                </div>
                <Separator height="15px" />
                {/* <div className={AuthStyles.fieldItem}>
                  <Field name="code">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Enter Code"
                        type="text"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </div> */}
                <Separator height="10px" />
                {/* <div className={AuthStyles.lineContainer}>
                  <div className={AuthStyles.line} />
                  <div className={AuthStyles.line} />
                  <div className={AuthStyles.line} />
                </div> */}
                {/* <Separator height="10px" />
                <p className={AuthStyles.li}>Upper and lowercase letters</p>
                <p className={AuthStyles.li}>More than 8 characters</p>
                <p className={AuthStyles.li}>
                  Contains a number and a symbol
                </p> */}
                <Separator height="10px" />
                <button className={AuthStyles.authButton} type="submit">
                  {isSubmitting ? (
                    <Spinner extraSmall={true} />
                  ) : (
                    "Change password"
                  )}
                </button>
              </FormikForm>
            )}
          </Formik>
          <Separator height="10px" />
          <div className={AuthStyles.bottomText}>
            {/* <Link
              className={AuthStyles.link}
              to="/login"
            >
              <span>Cancel</span>
            </Link> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
