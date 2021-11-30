import React from "react";
import { Icon } from "react-feather";

import { iconColor } from "../../utils/constants";

export interface ActionButtonProps {
  disabled?: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
  icon: Icon;
  label: string;
  text: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  disabled = false,
  handler,
  icon: IconCmp,
  label,
  text,
}) => {
  return (
    <button
      className="action-button"
      aria-label={label}
      onClick={() => handler((curr) => !curr)}
      disabled={disabled}
      title={label}
    >
      <IconCmp
        size={18}
        className="action-button-icon"
        color={iconColor}
        aria-hidden="true"
        focusable="false"
      />
      <span>{text}</span>
    </button>
  );
};
