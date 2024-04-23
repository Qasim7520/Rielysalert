import React from "react";
import styled from "styled-components";

import { Spinner } from "../Spinner/Spinner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 10005;
  position: static;
`;

export const LoadingPage = ({full, position, smallLoader}) => {
  return (
    <Container full={full} position={position}>
      <Spinner small={smallLoader} />
    </Container>
  );
};