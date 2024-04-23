import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { RoutePaths } from "./routePaths";

import { Notification } from "../components";

import { LandingPage } from "./LandingPage";
import { LoginPage, SignupPage } from "./AuthPages";

import { ProfilePage } from "./ProfilePage";

import { ScrollToTop } from "./ScrollToTop";

import { useNotification, notificationInitialState } from "../hooks/notificationProvider";
import { useSelector } from "react-redux";
import { VerificationPage } from "./EmailVerificationPage";
import { EmailVerify } from "./EmailVerificationPage/EmailVerify";
import { EmailSuccess } from "../pages/EmailSuccess/EmailSuccess";
import {PaymentSuccessPage} from "../pages/PaymentSuccessPage"
import { Congratulations } from "./CongratulationPage/Congratulations";
import { PasswordReset } from "./AuthPages/Login/components/PasswordReset/PasswordReset";
import { JoinPage } from "./AuthPages/Join/join";
import { SuccessBox } from "./AuthPages/Login/components/SuccessBox/SuccessBox";
import Membership from "./Membership/Membership";
import Cookies from "js-cookie";

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path={`${RoutePaths.Root}`} element={<ProfilePage />} />
      <Route path={`${RoutePaths.Profile}`} element={<ProfilePage />} />
      <Route path={`${RoutePaths.Membership}`} element={<Membership />} />
      <Route path={`${RoutePaths.PaymentSuccess}/:checkoutSessionId`} element={<PaymentSuccessPage />} />

      <Route path={`${RoutePaths.EmailVerify}`} element={<EmailVerify />} />
      <Route path={`${RoutePaths.EmailSuccess}`} element={<EmailSuccess />} />

      <Route path={`${RoutePaths.Signup}`} element={<SignupPage />} />

      {/* <Route path={`${RoutePaths.Join}`} element={<JoinPage />} /> */}

      <Route path={`${RoutePaths.SuccessBox}`} element={<SuccessBox />} />
      <Route path="*" element={<LandingPage />} />


    </Routes>
  );
};

export const AutoMoveToProfilePage = () => {
  return <Navigate to={`${RoutePaths.Login}`} />;
};

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      {/* <Route path={`${RoutePaths.Profile}`} element={<ProfilePage />} /> */}
      <Route path={`${RoutePaths.Root}`} element={<LoginPage />} />
      <Route path={`${RoutePaths.Login}`} element={<LoginPage />} />
      <Route path={`${RoutePaths.Signup}`} element={<SignupPage />} />
      <Route path={`${RoutePaths.Join}`} element={<JoinPage />} />
      <Route path={`${RoutePaths.EmailSuccess}`} element={<EmailSuccess />} />
      <Route path={`${RoutePaths.PostPayment}`} element={<Congratulations />} />
      <Route path={`${RoutePaths.EmailVerify}`} element={<EmailVerify />} />
      <Route path={`${RoutePaths.ResetPassword}`} element={<PasswordReset />} />
      <Route path={`${RoutePaths.SuccessBox}`} element={<SuccessBox />} />

      <Route path="*" element={<AutoMoveToLoginPage />} />
    </Routes>
  );
};

export const AutoMoveToLoginPage = () => {
  return <Navigate to={`${RoutePaths.Login}`} />;
};

export const Routing = () => {
  let isLogin = useSelector((state) => state.isLogin);
  const { notification, triggerNotification } = useNotification();
  //const userDetail = useSelector((state) => state.authReducer.userDetail);
  const token = Cookies.get('token')
  let userDetail = token;

  return (
    <React.Fragment>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => triggerNotification(notificationInitialState)}
      />
      <ScrollToTop />
      {(userDetail != null && userDetail !== '' && isLogin) && <AuthenticatedRoutes />}
      {(userDetail == null || userDetail === '' && !isLogin) && <UnAuthenticatedRoutes />}

      {/* {userDetail !== null && <AuthenticatedRoutes />}
      {userDetail === null && <UnAuthenticatedRoutes />} */}
      {/* <UnAuthenticatedRoutes /> */}
    </React.Fragment>
  );
};
