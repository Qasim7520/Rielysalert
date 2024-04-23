import React from "react";
import classnames from "classnames";

import styles from "./Spinner.module.scss";

export const Spinner = ({small, extraSmall, color}) => {
  const spinnerStyles = {
    borderStyle: "solid",
    borderColor: color ?? "#000",
    borderTopColor: "transparent",
  };
  
  return (
    <div
      className={classnames(styles.spinner, {
        [styles.small]: small,
        [styles.extraSmall]: extraSmall 
      })}
      style={spinnerStyles}
    />
  );
};