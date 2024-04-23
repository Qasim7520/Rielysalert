import React from "react";
import styled from "styled-components";

import Label from "../Label/Label";

const ControlContainer = styled.div`
  width: 100%;
  display: inline-block;
`;

export const ControlLabels = (props) => (
  <ControlContainer className={props.className}>
    <Label
      error={props.error}
      success={props.success}
      message={props.message}
      additionLength={props.labelAdditionLength}
      nextLine={props.nextLine}
    >
      {props.label}
    </Label>
    {props.children}
  </ControlContainer>
);
