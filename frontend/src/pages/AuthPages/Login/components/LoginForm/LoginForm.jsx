import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import AuthStyles from "../../../AuthStyles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from "formik";
import * as yup from "yup";

import { jwtDecode } from 'jwt-decode';

import { Layout } from "../../../../../views/Layout";
import { Separator, Spinner } from "../../../../../components";
import { LabeledInput } from "../../../../../components/LabeledInput/LabeledInput";
import { CheckBox } from "../../../../../components/base/CheckBox/CheckBox";
import { RoutePaths } from "../../../../routePaths";
import Cookies from "js-cookie";
import { userLogin } from "../../../../../Api/businessprofile";

import { useNotification } from "../../../../../hooks/notificationProvider";


import { useDispatch } from "react-redux";
import { authActions } from "../../../../../redux toolkit/store";

const LoginPageValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long")
    .max(16, "Maximum 16 characters are allowed")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
});

const token = Cookies.get('token')

export const LoginForm = ({ setSelectedForm }) => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const { triggerNotification } = useNotification();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!token) {
    }
  }, [token]);


  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;
    try {

      const response = await userLogin(email, password)

      if (response?.status == 201) {
        console.log("response?.status == 201", response)
        dispatch(authActions.login());
        triggerNotification({
          message: response?.data?.msg,
          type: "success",
        });

        Cookies.set("token", response?.data?.data.jwtoken, { expires: 6 })
        Cookies.set("UserId", response?.data?.data._id, { expires: 6 })

        resetForm();
        //dispatch(authActions.login());



        setTimeout(() => {
          push('/profile');
        }, 1500);
      } else if (response?.response?.status == 500) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }
      else if (response?.response?.status == 422) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }
      else if (response?.response?.status == 404) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }
      else if (response?.response?.status == 401) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }
      else if (response?.response?.status == 403) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }
      else if (response?.response?.status == 400) {
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
      }

    } catch (error) {
      setSubmitting(false);
      console.log(error)
    }

    setSubmitting(false);


  };




  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <div className={styles.heading}>
            Login in to your account
          </div>
          <Separator height="30px" />
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginPageValidationSchema}

            onSubmit={handleSubmitForm}
            validateOnBlur
            validateOnChange
          >
            {({ isSubmitting }) => (
              <FormikForm style={{ width: "100%" }}>
                <div className={styles.fieldItem}>
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
                <Separator height="15px" />
                <div className={styles.fieldItem}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <LabeledInput
                        {...field}
                        placeholder="Password"
                        type="password"
                        error={!!meta.error && meta.touched}
                        message={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </div>
                <Separator height="10px" />
                <div className={styles.row}>
                  {/* <CheckBox
                    checked={isLoggedIn}
                    label={<span style={{ color: 'rgba(120, 120, 120, 1)' }}>Stay Logged in</span>}
                    onClick={() => setIsLoggedIn((prev) => !prev)}
                    className={styles.checkbox}
                  /> */}
                  {/* <Link
                    className={styles.link}
                    onClick={() => setSelectedForm(1)}
                  >
                    Forget password?
                  </Link> */}
                </div>
                <Separator height="30px" />
                <button className={styles.authButton} type="submit">
                  {isSubmitting ? <Spinner extraSmall={true} /> : "Login"}
                </button>
              </FormikForm>
            )}
          </Formik>

          <Separator height="25px" />
          <div className={AuthStyles.bottomText}>
            <span style={{ color: 'rgba(120, 120, 120, 1)' }}> Don't have an account yet?&nbsp;</span>
            <Link to={`${RoutePaths.Join}`} className={AuthStyles.link}>
              <span style={{ fontWeight: 'bold', color: 'rgb(170, 5, 6)' }}>Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
