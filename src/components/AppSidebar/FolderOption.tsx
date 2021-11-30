import React from "react";
import { Book, Eye, EyeOff, Star } from "react-feather";
import { iconColor } from "../../utils/constants";
import { Folder } from "../../utils/emuns";

export interface FolderOptionProps {
  text: string;
  active: boolean;
  folder: Folder;
  swapFolder: (folder: Folder) => void;
}

export const FolderOption: React.FC<FolderOptionProps> = ({
  text,
  active,
  folder,
  swapFolder,
}) => {
  const determineClass = () => {
    if (active) {
      return "app-sidebar-link active";
    }
    return "app-sidebar-link";
  };

  const renderIcon = () => {
    if (folder === "FAVORITES") {
      return <Star size={15} className="app-sidebar-icon" color={iconColor} />;
    } else if (folder === "ALL") {
      return <Book size={15} className="app-sidebar-icon" color={iconColor} />;
    } else {
      return (
        <EyeOff size={15} className="app-sidebar-icon" color={iconColor} />
      );
    }
  };

  return (
    <button
      onClick={() => {
        swapFolder(folder);
      }}
      className="app-sidebar-wrapper"
    >
      <div className={determineClass()}>
        {renderIcon()}
        {text}
      </div>
    </button>
  );
};
