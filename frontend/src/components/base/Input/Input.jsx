import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useToggle } from "react-use";

import styles from "./Input.module.scss";

export const Input = ({ light, error, grey, focusedStyle, ...props }) => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const inputSelectionStartRef = useRef(null);

  const [isContentVisible, toggleIsContentVisible] = useToggle(false);
  const [focused, setFocused] = useState(false);

  const isPassword = props.type === "password";
  const isVisibilityButtonVisible = isPassword && !props.disabled;
  const type = isPassword ? (isContentVisible ? "text" : "password") : props.type;

  const onContainerFocus = () => {
    setFocused(true);
  };

  const onContainerBlur = (event) => {
    if (isVisibilityButtonVisible && event.target === inputRef.current) {
      inputSelectionStartRef.current = inputRef.current.selectionStart;
    }

    setFocused(false);

    if (isPassword) {
      window.setTimeout(() => {
        if (document.activeElement !== inputRef.current && document.activeElement !== buttonRef.current) {
          toggleIsContentVisible(false);
          inputSelectionStartRef.current = null;
        }
      }, 0);
    }
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.disabled]: props.disabled,
        [styles.focused]: focused && focusedStyle,
      })}
      data-testid="input-container"
      onFocus={onContainerFocus}
      onBlur={onContainerBlur}
    >
      <input
        data-testid="input"
        {...props}
        ref={inputRef}
        type={type}
        className={classNames(styles.input,
          {
            [styles.disabled]: props.disabled,
            [styles.password]: isPassword,
          },
          props.className
        )}
      />
    </div>
  );
};