import React from "react";
import styles from "./Layout.module.scss";

import { MaxWidth } from "../../components";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";


export const Layout = ({ children, isLoggedIn, isContainer }) => {
  return (
    <React.Fragment>
      <Navbar />
      {!isLoggedIn && (
        <React.Fragment>
          <div className={styles.layoutContainer}>{children}</div>
          {/* {isFooter && <Footer />} */}
        </React.Fragment>
      )}
      {isLoggedIn && (
        <React.Fragment>
          <div className={styles.loggedInLayoutContainer}>
            <MaxWidth full={true}>
              <Sidebar />
              <div className={styles.contentContainer}>
                {isContainer ? (
                  <div className={styles.container}>{children}</div>
                ) : (
                  <>{children}</>
                )}
              </div>
            </MaxWidth>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
