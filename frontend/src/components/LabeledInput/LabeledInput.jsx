import React from "react";

import { Input } from "../base/Input/Input";
import { ControlLabels } from "../LabeledControl/ControlLabels";

const LabeledInputComponent = ({
  error,
  success,
  message,
  label,
  labelAdditionLength,
  ...inputProps
}) => (
  <ControlLabels
    error={error}
    success={success}
    message={message}
    label={label}
    labelAdditionLength={labelAdditionLength}
  >
    <Input {...inputProps} error={error} focusedStyle />
  </ControlLabels>
);

export const LabeledInput = React.memo(LabeledInputComponent);
