import React from "react";
import styles from "./MaxWidth.module.scss";
import classNames from "classnames";

export const MaxWidth = ({children, full}) => {
    return (
        <div className={classNames(styles.container, {[styles.fullHeight]: full})}>{children}</div>
    );
};