import React from "react";
import AuthStyles from "../../../AuthStyles.module.scss";
import styles from "./SuccessBox.module.scss";

import { Layout } from "../../../../../views/Layout";
import { Separator } from "../../../../../components";
import { useLocation } from "react-router-dom/dist";

export const SuccessBox = ({ setSelectedForm }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  return (
    <Layout isLoggedIn={false} isFooter={false}>
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <div className={styles.heading}>
            You’ve got yourself a new password.
          </div>
          <Separator height="30px" />
          <div className={styles.text}>
            The password for {email} has been <br /> successfully changed.
          </div>
          {/* <Separator height="30px" />
          <div className={AuthStyles.bottomText}>
            Now please&nbsp;
            <span
              className={AuthStyles.link}
              onClick={() => setSelectedForm(0)}
            >
              Login
            </span>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};
