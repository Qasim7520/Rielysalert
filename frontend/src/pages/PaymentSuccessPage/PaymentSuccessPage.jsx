import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingPage } from "../../components";

import { saveSubscriptionRecord } from "../../Api/stripe";
import { RoutePaths } from "../routePaths";

import { useNotification } from "../../hooks/notificationProvider";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const PaymentSuccessPage = () => {
  const { triggerNotification } = useNotification();
  const push = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const token=Cookies.get("token")
      saveSubscriptionRecord(token,params.checkoutSessionId)
        .then((res) =>
        {
          triggerNotification({
            message: "Subscription stored successfully",
            type: "success",
          })   
          push("/membership")
        }
        )
        .catch((err) => {
          triggerNotification({ message: err.data.message, type: "error" });
        });
    } else {
      push(`${RoutePaths.PostPayment}`);
      triggerNotification({
        message: "To store payment please provide checkoutSessionId",
        type: "info",
      });
    }
  }, [params]);

  return (
    <Container>
      <LoadingPage />
    </Container>
  );
};
