import React from "react";
import { Dialog } from "@headlessui/react";
import classNames from "classnames";

import styles from "./Modal.module.scss";

const cardStyleBySize = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

export const Modal = ({
  children,
  size,
  onClose,
  testId,
  isPadding,
  className,
}) => {
  return (
    <Dialog
      open
      onClose={() => onClose?.()}
      data-testid={testId}
      className={styles.modalPageContainer}
    >
      <div className={styles.backdrop} />
      <div className={styles.modalContainer}>
        <Dialog.Panel className={styles.modalPanel}>
          <div
            className={classNames(styles.card, {
              [cardStyleBySize[size]]: size,
              [styles.isPadding]: isPadding,
              [className]: className,
            })}
          >
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
