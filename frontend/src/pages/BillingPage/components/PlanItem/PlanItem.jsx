import React, { useState,useEffect } from "react";
import styles from "./PlanItem.module.scss";
import Cookies from "js-cookie";
import { createCheckout } from "../../../../Api/stripe";
import { getUserData } from "../../../../Api/businessprofile";

export const PlanItem = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [userData,setUserData] = useState();

  const token = Cookies.get('token')
  
    const fetchData = async () => {
      let response;
      try {
  
        if (token) {
          response = await getUserData(token);
  
          if (response?.status == 200) {
            setUserData(response?.data?.data?.status)
            console.log('UserData', response)
          } else {
            console.error('Error fetching user data:');
          }
  
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  useEffect(() => {
    fetchData()
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createStripeCheckout=async(priceId)=>{
    try {
      const token=Cookies.get("token")
      const res=await createCheckout(token,priceId);
      if (res?.status==200)
      {
        const checkoutUrl = res?.data?.checkoutUrl;
        if (checkoutUrl) {
          window.location.href = checkoutUrl; 
        } else {
          console.log("Checkout URL not found in response.");
        }
      }
    } catch (error) {
      console.log("error",error)
    }
  }
console.log('user data',userData)

  return (
    <>
    <div className={styles.productcontainer}>
    {userData=="free" ?(<>
    <div className={styles.subscriptionStatus}>Subscribed</div>
    </>):(null)}
    <div className={styles.productcontainerdetail2}>
      
      <span className={styles.creditsDetail2}>
       Free
      </span>
    </div>
    <div className={styles.productcontainerdetail2}>
      <span className={styles.packagePrice}>
        £0
        <span>.00</span>
      </span>
    </div>
    </div>


      <div className={styles.productcontainer} onClick={() => createStripeCheckout("price_1P7CNvGXFPlucPnGpz6uaW5K")}>
      {userData=="paid" ?(<>
    <div className={styles.subscriptionStatus}>Subscribed</div>
    </>):(null)}
        <div className={styles.productcontainerdetail2}>
       
          <span className={styles.creditsDetail2}>
           Paid
          </span>
        </div>
        <div className={styles.productcontainerdetail2}>
          <span className={styles.packagePrice}>
            £50
            <span>.00</span>
          </span>
        </div>
      </div>
    </>

  );
};
