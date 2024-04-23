import React, { useEffect } from "react";
import styles from "./Content.module.scss";
import { useNavigate } from "react-router-dom"
import { Separator, MaxWidth } from "../../../../components";
import BgImage from "../../../../resources/images/1.png"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Content = () => {
  const navigate = useNavigate();
  // const handleButtonClick = () => {
  //   const url = "https://chrome.google.com/webstore/detail/poundsqueeze/ifbklbcndmmpkgioomcbcaoeeipfkfcb";
  //   window.open(url, "_blank");
  // };

  return (
    <>
      <div className={styles.container}>
        <MaxWidth>
          <div className={styles.contentContainer}>
            {/* <div className={styles.imageSection}>
              <img src={require("../../../../resources/images/1.png")} />
            </div>
            <div className={styles.content}>
              <div className={styles.heading}>Save £££</div>
              <Separator height="5px" />
              <div className={styles.subHeading}>
                Poundsqueeze before you buy to get cheaper prices for the same
                product.
              </div>
              <Separator />
              <div className={styles.text}>
                We use AI to scan thousands of stores to find the same product
                you’re about to purchase but cheaper.
              </div>
              <Separator />
              <div style={{ display: "flex" }}>
                <button onClick={handleButtonClick}>Add Poundsqueeze</button>
                <button onClick={() => navigate("/signup")} style={{ marginLeft: "10px" }}>Sign Up</button>
              </div>

            </div> */}
          </div>
        </MaxWidth>
      </div>

      {/* <div className={styles.showmobile}>


        <div className="container-fluid" style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundImage: `url(${BgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: "613px", width: "95%", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "613px", width: "100%", borderRadius: "12px", backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
              <div className={styles.content} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className={styles.heading}>Save £££</div>
                <Separator height="5px" />
                <div className={styles.subHeading}>
                  Poundsqueeze before you buy to get cheaper prices for the same
                  product.
                </div>
                <Separator />
                <div className={styles.text}>
                  We use AI to scan thousands of stores to find the same product
                  you’re about to purchase but cheaper.
                </div>
                <Separator />
                <div style={{ display: "flex" }}>
                  <button onClick={handleButtonClick}>Add Poundsqueeze</button>
                </div>

              </div>

            </div>
          </div>

        </div>


      </div> */}

    </>
  );
};
