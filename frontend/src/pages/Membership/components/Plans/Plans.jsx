import React,  { useState,useEffect } from "react";
import styles from "./Plans.module.scss";

import { Separator, LoadingPage } from "../../../../components";
import { PlanItem } from "../PlanItem/PlanItem";

import { useSelector } from "react-redux";
import axios from "axios";

export const Plans = ({ isloading }) => {
  const { products, subscribedProduct } = useSelector((state) => state.paymentReducer);
  const [searchData,setSearchData]=useState(0)

  return (
    <div className={styles.container}>
      {/* <div className={styles.heading1}>
        You have 3 free credits.
      </div> */}
      <div className={styles.headingDiv}>
      <div className={styles.heading}>
       Credit Packs
      </div>
      <div className={styles.heading2}>
       Your credits: <span style={{fontWeight:"700", fontSize:"16px"}}>{searchData}</span>
      </div>
      </div>
      <div className={styles.headingDiv}>
      <div className={styles.heading3}>
       Buy credit packs and get testers for free. Credits never expire. 
      </div>
      </div>
     
      <Separator height="8px" />
      <Separator height="32px" />
      {isloading ? (
        <LoadingPage />
      ) : (
        <div className={styles.pricingContainer}>
          {products.map((product, index) => (
            <PlanItem product={product} subscribedProduct={subscribedProduct} index={index} />
          ))}
        </div>
      )}
      <Separator height="32px" />
      {/* <div className={styles.subText}>
        *Credits gives you the ability to perform a search on a product page of your choice. <br />
        The credits don’t have a time limit and if we don’t find any results for your product you won’t have credits deducted.<br />
        You will get free credits if you refer friends who sign up in the <b>Referrals</b> tab once logged in.
      </div> */}
    </div>
  );
};
