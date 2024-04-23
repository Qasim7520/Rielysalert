import React, { useState,useEffect } from "react";
import styles from "./PlanItem.module.scss";

import { Separator, Spinner } from "../../../../components";
import { useSelector } from "react-redux";

import { useNotification } from "../../../../hooks/notificationProvider";

import { createSubscriptionCheckout } from "../../../redux/actions";
import axios from "axios";

export const PlanItem = ({ product, subscribedProduct, index }) => {
  const { triggerNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const isSelected =
    product.default_price == subscribedProduct?.priceId ? true : false;


  const is_popular = product.name === "Silver Features" ? true : false;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call the function to set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createCheckout = (default_price, name) => {
    setIsLoading(true);
    createSubscriptionCheckout({ priceId: default_price, productName: name })
      .then((res) => {
        setIsLoading(false);
        const newTab = window.open(
          res.checkoutUrl,
          "_blank",
          "noopener,noreferrer"
        );
        if (newTab) newTab.focus();
      })
      .catch((err) => {
        setIsLoading(false);
        triggerNotification({ message: err.data.message, type: "error" });
      });
  };

  const calculatePrice = (p_name) => {
    if (p_name === "Bronze Package") {
      return 2;
    } else if (p_name === "Silver Package") {
      return 3;
    } else if (p_name === "Gold Package") {
      return 4;
    } else {
      return 0;
    }
  };

  const getModifiedProductName = (originalName) => {
    if (isMobile) {
      switch (originalName) {
        case "Gold Package":
          return "Gold";
        case "Bronze Package":
          return "Bronze";
        case "Silver Package":
          return "Silver";
        default:
          return originalName;
      }
    } else {
      return originalName;
    }
  };

  const description = product.description;
  const regex = /\d+/;
  const match = description.match(regex);
  let integerValue;
  if (match) {
    integerValue = parseInt(match[0], 10);
    console.log(integerValue);
  } else {
    console.log("No integers found in the description.");
  }
  return (
    <>
      {/* {index == 0 ? (
        <div className={styles.productcontainer}> */}
          {/* {subscribedProduct?.priceId === undefined && (
            <div className={styles.bestdeal}>Subscribed</div>
          )} */}
          {/* <div className={styles.productcontainerdetail2}>
          <span className={styles.packageName}>
          Free{isMobile ? "" : " Trial"}
          </span>
          </div>
          <div className={styles.productcontainerdetail2}>
            <span className={styles.creditsDetail}>
              3 {isMobile ? "" : " credits"}
            </span>
          </div>
          <div className={styles.productcontainerdetail2}>
            <span className={styles.packagePrice}>
              £0
              <span>.00</span>
            </span>
          </div>
        </div>
      ) : null} */}

      <div className={styles.productcontainer} onClick={() => createCheckout(product.default_price, product.name)}>
        {/* {isSelected && (<div className={styles.bestdeal}>Subscribed</div>)} */}
        {/* <div className={styles.productcontainerdetail2}>
          <span className={styles.packageName}>
            {getModifiedProductName(product.name)}
          </span>
        </div> */}
        <div className={styles.productcontainerdetail2}>
          <span className={styles.creditsDetail}>
            {integerValue}
          </span>
          <span className={styles.creditsDetail2}>
           {isMobile ? "" : " credits"}
          </span>
        </div>
        <div className={styles.productcontainerdetail2}>
          <span className={styles.packagePrice}>
            £{calculatePrice(product.name)}
            <span>.99</span>
          </span>
        </div>
      </div>
    </>

  );
};
