import React, { useState, useEffect } from "react";
import AuthStyles from "../../pages/AuthPages/AuthStyles.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { Separator, Spinner } from "../../../src/components";
import { useNotification } from "../../../src/hooks/notificationProvider";
import { userVerify } from "../../Api/businessprofile";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux toolkit/store";


export const EmailVerify = () => {
  const { triggerNotification } = useNotification();
  const push = useNavigate();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');
  console.log("token", token);



  const verify = async (token) => {
    try {
      const response = await userVerify(token)

      if (response?.status === 200) {
        console.log('response?.status === 200', response?.data?.msg,)
        Cookies.set("token", response?.data?.data.jwtoken, { expires: 6 })
        Cookies.set("UserId", response?.data?.data._id, { expires: 6 })

        dispatch(authActions.login());
        triggerNotification({
          message: response?.data?.msg,
          type: "success",
        });
        setTimeout(() => {
          push('/profile');
        }, 2000);
      }
      else if (response?.response?.data?.status === 404) {
        console.log('response verify mail', response?.response?.data?.msg)
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
        setTimeout(() => {
          push('/login');
        }, 1500);
      }
      else {
        console.log('inside else', response?.response?.data?.msg)
        triggerNotification({
          message: response?.response?.data?.msg,
          type: "error",
        });
        setTimeout(() => {
          push('/login');
        }, 1500);
      }

    } catch (error) {
      console.log('error', error)

    }
  };

  const [verificationRequested, setVerificationRequested] = useState(false);

  useEffect(() => {
    if (!token || verificationRequested) {
      push('/login');
      return;
    }

    verify(token);
    setVerificationRequested(true);
  }, [token, verificationRequested]);


  return (

    <div className={AuthStyles.pageContainer} style={{ marginTop: "200px" }}>
      <div className={AuthStyles.formContainer}>
        <div className={AuthStyles.heading} style={{ paddingTop: "30px" }}>
          Verifying your Email Address <br />
        </div>
        <Separator height="30px" />

        <Separator height="15px" />
      </div>
    </div>
  );
};

