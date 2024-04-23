import React from "react";
import CongratulationStyles from "./Congratulations.module.scss";
import { useNavigate } from "react-router-dom";
import amazon from "../../resources/images/amazonuk.png"
import ebay from "../../resources/images/ebay.png"
import asos from "../../resources/images/asos.png"
import argos from "../../resources/images/argos.png"

import { Separator } from "../../../src/components";

export const Congratulations = () => {
    const push = useNavigate();
    return (

        <div className={CongratulationStyles.pageContainer} style={{ marginTop: "200px" }}>
            <div className={CongratulationStyles.formContainer}>
                <div className={CongratulationStyles.heading} style={{ paddingTop: "30px", }}>
                    Congratulations on your purchase!<br />
                    Start using <span style={{color:"orange"}}>Poundsqueeze</span>  to cut your expenses!<br />
                </div>
                <div className={CongratulationStyles.subHeading}>
                    <span>
                        Or go to
                    </span>
                    <span style={{ cursor: "pointer" }} onClick={() => { push("/profile") }}>
                        &nbsp;<u>Dashboard</u>
                    </span>
                </div>
                <div className={CongratulationStyles.brands}>
                    <img src={amazon} style={{ paddingRight: "80px" }} alt="amazon" width={259} height={259} />
                    <img src={ebay} style={{ paddingTop: "100px", paddingRight: "80px" }} alt="amazon" width={138} height={53} />
                    <img src={asos} style={{ paddingTop: "105px", paddingRight: "80px" }} alt="asos" width={136} height={50} />
                    <img src={argos} style={{ paddingTop: "100px", paddingRight: "80px" }} alt="argos" width={125} height={64} />

                </div>

                <Separator height="30px" />

                <Separator height="15px" />
            </div>
        </div>
    );
};
