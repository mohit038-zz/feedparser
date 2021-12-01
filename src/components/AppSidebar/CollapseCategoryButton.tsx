import React from "react";
import { ChevronDown, ChevronRight, Layers } from "react-feather";

export interface CollapseCategoryListButtonInterface {
  handler: () => void;
  label: string;
  isCategoryListOpen: boolean;
  showIcon: boolean;
}

export const CollapseCategoryListButton: React.FC<CollapseCategoryListButtonInterface> =
  ({ handler, label, isCategoryListOpen, showIcon }) => {
    return (
      <button className="collapse-button" onClick={handler} aria-label={label}>
        {showIcon ? (
          isCategoryListOpen ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <Layers size={16} />
        )}
        <h2>Publications</h2>
      </button>
    );
  };
