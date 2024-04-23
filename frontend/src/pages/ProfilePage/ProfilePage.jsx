import React, { useState, useEffect } from "react";

import { Layout } from "../../views/Layout";

import { ProfileCard } from "./components/ProfileCard";

import { Separator } from "../../components";

import { useNotification } from "../../hooks/notificationProvider";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";
export const ProfilePage = () => {


  const token = Cookies.get('token')
  let isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {

    if (token && isLogin) {

    }
  }, [token, isLogin]);

  const { triggerNotification } = useNotification();


  return (
    <React.Fragment>
      <Layout isLoggedIn={true} isFooter={false}>
        <ProfileCard />
        <Separator height="32px" />
      </Layout>
      {/* {benefitsModal && (
        <BenefitsModal
          onClose={() => {
            toggleBenefitsModal();
            showDownloadModal(false);
          }}
        />
      )} */}
      {/* {paymentModal && (
        <PaymentModal
          onClose={() => {
            togglePaymaentModal();
            showPaymentModal(false);
          }}
        />
      )} */}
    </React.Fragment>
  );
};
