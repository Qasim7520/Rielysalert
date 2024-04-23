import React,  { useState,useEffect } from "react";
import styles from "./Plans.module.scss";

import { Separator, LoadingPage } from "../../../../components";
import { PlanItem } from "../PlanItem/PlanItem";

export const Plans = ({ isloading }) => {
  return (
    <div className={styles.container}>
    
     
      <Separator height="8px" />
      <Separator height="32px" />
      {isloading ? (
        <LoadingPage />
      ) : (
        <div className={styles.pricingContainer}>
          {/* {products?.map((product, index) => ( */}
            <PlanItem />
          {/* ))} */}
        </div>
      )}
      <Separator height="32px" />
    </div>
  );
};
