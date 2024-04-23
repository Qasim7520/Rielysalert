import React from "react";
import styled from "styled-components";

const Content = styled.label`
  display: block;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #1a194d;
  padding-bottom: 5px;
  width: calc(100% + 30px);

  & a {
    text-decoration: underline;
    color: ${({ theme }) => '#4f46e5'};
  }
`;

const MessageText = styled.span`
  white-space: break-spaces;
  color: ${(props) => props.error ? '#ff5454' : props.success ? '#068c24' : '#afafc1'};
  font-size: 13px;
`;

const Label = (props) => (
  <Content additionLength={props.additionLength} className={props.className} onClick={props.onClick}>
    {props.children}
    {props.message && (
      <span>
        {props.children ? props.nextLine ? <br /> : " - " : null}
        <MessageText error={props.error}>{props.message}</MessageText>
      </span>
    )}
  </Content>
);

export default Label;
