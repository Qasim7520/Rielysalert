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

// import { forgetpassword } from "../../../../../redux/actions";

const ForgetPasswordPageValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const ForgetPassword = ({ setEmail, setSelectedForm }) => {
  const push = useNavigate();
  const { triggerNotification } = useNotification();

  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={AuthStyles.pageContainer}>
        <div className={AuthStyles.formContainer}>
          <div className={AuthStyles.heading}>Reset your password</div>
          <Separator height="30px" />
          <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgetPasswordPageValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              //   forgetpassword(values)
              //     .then((res) => {

              //       triggerNotification({
              //         message: res.message,
              //         type: "success",
              //       });
              //       setSubmitting(false);
              //       // setSelectedForm(2);

              //        setEmail(values.email);
              //     })
              //     .catch((err) => {
              //       setSubmitting(false);
              //       triggerNotification({
              //         message: err.data.message,
              //         type: "error",
              //       });
              //     });
            }}
          >
            {({ isSubmitting }) => (
              <FormikForm style={{ width: "100%" }}>
                <div className={AuthStyles.fieldItem}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Enter your email"
                        type="email"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                        style={{ maxWidth: '335px', overflow: 'hidden' }}
                        className={AuthStyles.customfield}
                      />
                    )}
                  </Field>
                </div>
                <Separator height="30px" />
                <button className={AuthStyles.authButton} type="submit">
                  {isSubmitting ? (
                    <Spinner extraSmall={true} />
                  ) : (
                    "Email me a recovery link"
                  )}
                </button>
              </FormikForm>
            )}
          </Formik>
          <Separator height="10px" />
          <div
            className={AuthStyles.bottomText}
            onClick={() => setSelectedForm(0)}
          >
            {/* <Link className={AuthStyles.link}>
              <span>Cancel</span>
            </Link> */}
          </div>
        </div>
      </div>
    </Layout >
  );
};
