import React from "react";
import styles from "./SidebarItem.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

export const SidebarItem = ({path, children, isSelected}) => {
    return (
        <Link
            className={classNames(styles.container, {[styles.isSelected]: isSelected})}
            to={path ?? "#"}
        >
            {children}
        </Link>
    );
};