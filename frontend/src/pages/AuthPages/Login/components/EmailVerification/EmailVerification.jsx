import React, { useEffect, useState } from "react";
import AuthStyles from "../../../AuthStyles.module.scss";
import { Link, useNavigate } from "react-router-dom";

import { Separator } from "../../../../../components";
import { verifyEmail } from "../../../../../redux/actions";


export const EmailVerification = ({ setSelectedForm }) => {
  const push = useNavigate();
useEffect(()=>{
    // verifyUserEmail()
},[])

// const verifyUserEmail=()=>{
//     verifyEmail({code:token})
//     .then(()=>{})
//     .catch(()=>{})
// }
  return (
    
      <div className={AuthStyles.pageContainer} style={{marginTop:"150px"}}>
        <div className={AuthStyles.formContainer} style={{ height:"30vh"}}>
          <div className={AuthStyles.heading}>
            Verifying you email address. <br />
          </div>
         
          <Separator height="8px" />
         
          <Separator height="15px" />
        </div>
      </div>
  );
};
