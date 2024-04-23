import React, { useState } from "react";
import styles from "./Signup.module.scss";
import AuthStyles from "../AuthStyles.module.scss";
import { Link } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";
import * as yup from "yup";


import { Layout } from "../../../views/Layout";
import { Separator, Spinner } from "../../../components";
import { LabeledInput } from "../../../components/LabeledInput/LabeledInput";
import { CheckBox } from "../../../components/base/CheckBox/CheckBox";
import { RoutePaths } from "../../routePaths";
import Google from "../../../resources/images/Google_Logo.png"
import Facebook from "../../../resources/images/Facebook_Logo.png"


import { useNavigate } from 'react-router-dom';

import { useNotification } from "../../../hooks/notificationProvider";

const LoginPageValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required")
});

export const SignupPage = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const referralParam = url.searchParams.get('referral');
  console.log("referralParam", referralParam)
  const googleAuth = () => {
    window.open(
      `https://api.poundsqueeze.co.uk/auth/google`,
      "_self"
    );
  };
  function clearStoredTokens() {
    localStorage.removeItem('PS_USER'); // Remove access token from localStorage or session storage
  }
  const facebookAuth = () => {
    clearStoredTokens();
    window.location.href = 'https://api.poundsqueeze.co.uk/login/facebook';
  };

  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={AuthStyles.pageContainer}>
        <div className={AuthStyles.formContainer}>
          <div className={AuthStyles.heading}>
            Welcome to Poundsqueeze
          </div>
          <Separator height="30px" />

          <button className={styles.google_btn} onClick={googleAuth}>
            <img src={Google} alt="google icon" />
            <span>Continue Google</span>
          </button>

          <button className={styles.google_btn} onClick={facebookAuth}>
            <img src={Facebook} alt="facebook icon" style={{ marginLeft: "20px" }} />
            <span>Continue Facebook</span>
          </button>

          <h2 className={styles.hr_lines}>Or</h2>


          <Separator height="30px" />
          <Formik
            initialValues={{
              email: ""
            }}
            validationSchema={LoginPageValidationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              if (values.email) {
                navigate(`/join?email=${values.email}`)
              }
            }}
            validateOnBlur
            validateOnChange
          >
            {({ isSubmitting }) => (
              <FormikForm style={{ width: "100%" }}>
                <div className={AuthStyles.fieldItem}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Email"
                        type="email"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </div>

                <Separator height="30px" />
                <button className={AuthStyles.authButton} type="submit">
                  {isSubmitting ? (
                    <Spinner extraSmall={true} />
                  ) : (
                    "Continue"
                  )}
                </button>
              </FormikForm>
            )}
          </Formik>
          <p className={styles.text}>or</p>

          <Separator height="25px" />
          <div className={AuthStyles.bottomText2}>
            By proceeding, you agree to the
          </div>
          {/* <Separator height="10px" /> */}
          <div className={AuthStyles.bottomText2}>
            <span>Terms and Service</span> and <span>Privacy Policy</span>
          </div>

          <Separator height="25px" />
          <div className={AuthStyles.bottomText}>
            Already have an account?&nbsp;
            <Link to={`${RoutePaths.Login}`} className={AuthStyles.link}>
              Login
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
};
