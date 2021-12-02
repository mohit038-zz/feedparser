import React from "react";
import {
  Briefcase,
  CloudRain,
  Coffee,
  EyeOff,
  Facebook,
  MapPin,
  Phone,
  ShoppingCart,
  Smile,
  Tool,
} from "react-feather";
import { iconColor } from "../../utils/constants";
import { Category, Folder } from "../../utils/emuns";

export interface CategoryOptionProps {
  text: string;
  active: boolean;
  category: Category;
  swapFolder: (folder: Folder) => void;
  swapCategory: (category: Category) => void;
}

export const CategoryOption: React.FC<CategoryOptionProps> = ({
  text,
  active,
  category,
  swapCategory,
  swapFolder,
}) => {
  const determineClass = () => {
    if (active) {
      return "app-sidebar-link active";
    }
    return "app-sidebar-link";
  };

  const renderIcon = () => {
    if (category === "Gears") {
      return <Tool size={15} className="app-sidebar-icon" color={iconColor} />;
    } else if (category === "Shopping") {
      return (
        <ShoppingCart
          size={15}
          className="app-sidebar-icon"
          color={iconColor}
        />
      );
    } else if (category === "Technology") {
      return <Phone size={15} className="app-sidebar-icon" color={iconColor} />;
    } else if (category === "Food") {
      return (
        <Coffee size={15} className="app-sidebar-icon" color={iconColor} />
      );
    } else if (category === "Travel") {
      return (
        <MapPin size={15} className="app-sidebar-icon" color={iconColor} />
      );
    } else if (category === "LifeStyle") {
      return (
        <Facebook size={15} className="app-sidebar-icon" color={iconColor} />
      );
    } else if (category === "Business") {
      return (
        <Briefcase size={15} className="app-sidebar-icon" color={iconColor} />
      );
    } else if (category === "Festivals") {
      return <Smile size={15} className="app-sidebar-icon" color={iconColor} />;
    } else if (category === "Weather") {
      return (
        <CloudRain size={15} className="app-sidebar-icon" color={iconColor} />
      );
    } else {
      return (
        <EyeOff size={15} className="app-sidebar-icon" color={iconColor} />
      );
    }
  };

  return (
    <button
      onClick={() => {
        swapCategory(category);
        swapFolder(Folder.CATEGORY);
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
