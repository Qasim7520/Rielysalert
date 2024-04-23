import React from "react";
import EmailStyles from "./EmailSuccess.module.scss";
import { useNavigate } from "react-router-dom";

import { Separator } from "../../../src/components";

export const EmailSuccess = () => {
    const push = useNavigate();
    return (

        <div className={EmailStyles.pageContainer} style={{ marginTop: "200px" }}>
            <div className={EmailStyles.formContainer}>
                <div className={EmailStyles.heading} style={{ paddingTop: "30px", }}>
                    Click on the link sent on your email to <br />verify your <span style={{ color: "red" }}>Riley's Alert</span> Account.<br />
                </div>
                <div className={EmailStyles.subHeading}>
                    <span>
                        Already verified? Click here to
                    </span>
                    <span style={{ cursor: "pointer" }} onClick={() => { push("/login") }}>
                        &nbsp;<u>login!</u>
                    </span>
                </div>

                <Separator height="30px" />

                <Separator height="15px" />
            </div>
        </div>
    );
};
