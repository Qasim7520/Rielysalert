import React from "react";
import styles from "./Checkbox.module.scss";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CheckBox = ({checked, label, onClick}) => (
  <div className={styles.container}>
    <label className={styles.label}>
      <input className={styles.input} checked type="checkbox" onClick={onClick} />
      {checked && <FontAwesomeIcon icon={faCheck} />}
    </label>
    {label && <div className={styles.labeledtext}>{label}</div>}
  </div>
);
