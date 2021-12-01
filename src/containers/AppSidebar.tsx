import React from "react";
import { Plus } from "react-feather";
import { ActionButton } from "../components/AppSidebar/ActionButton";
import { CategoryOption } from "../components/AppSidebar/CategoryOption";
import { FolderOption } from "../components/AppSidebar/FolderOption";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { useModalState } from "../contexts/ModalStateContext";
import { Category, Folder } from "../utils/emuns";
import { Publications } from "./Publications";

interface AppSidebarProps {}

const AppSidebar: React.FC<AppSidebarProps> = () => {
  const { setIsModalOpen } = useModalState();
  const { state, dispatch } = useFeedStore();
  const { activeFolder, activeCategory } = state;
  const swapFolder = (folder: Folder) => {
    dispatch({ type: "setActiveFolder", payload: folder });
    if (folder !== Folder.CATEGORY) {
      dispatch({ type: "setActiveCategory", payload: null });
    }
    if (folder !== Folder.PUBLISHER) {
      dispatch({ type: "setActivePublisher", payload: null });
    }
  };
  const swapCategory = (category: Category) =>
    dispatch({ type: "setActiveCategory", payload: category });

  return (
    <aside className="app-sidebar">
      <ActionButton
        handler={setIsModalOpen}
        icon={Plus}
        label="Add a new feed"
        text="Add a new feed"
      />
      <section className="app-sidebar-main">
        <FolderOption
          active={activeFolder === Folder.ALL}
          text="ALL"
          swapFolder={swapFolder}
          folder={Folder.ALL}
        />
        <FolderOption
          active={activeFolder === Folder.UNREAD}
          text="UNREAD"
          swapFolder={swapFolder}
          folder={Folder.UNREAD}
        />
        <FolderOption
          active={activeFolder === Folder.FAVORITES}
          text="FAVORITES"
          swapFolder={swapFolder}
          folder={Folder.FAVORITES}
        />
        <Publications />
        <div className="seperator"></div>
        <CategoryOption
          active={activeCategory === Category.GEAR}
          text="Gears"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.GEAR}
        />
        <CategoryOption
          active={activeCategory === Category.FOOD}
          text="Food"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.FOOD}
        />
        <CategoryOption
          active={activeCategory === Category.TRAVEL}
          text="Travel"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.TRAVEL}
        />
        <CategoryOption
          active={activeCategory === Category.WEATHER}
          text="Weather"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.WEATHER}
        />
        <CategoryOption
          active={activeCategory === Category.TECHNOLOGY}
          text="Tech"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.TECHNOLOGY}
        />
        <CategoryOption
          active={activeCategory === Category.SHOPPING}
          text="Shopping"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.SHOPPING}
        />
        <CategoryOption
          active={activeCategory === Category.BUSINESS}
          text="Bussiness"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.BUSINESS}
        />
        <CategoryOption
          active={activeCategory === Category.LIFESTYLE}
          text="LifeStyle"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.LIFESTYLE}
        />
        <CategoryOption
          active={activeCategory === Category.FESTIVAL}
          text="Festivals"
          swapFolder={swapFolder}
          swapCategory={swapCategory}
          category={Category.FESTIVAL}
        />
      </section>
    </aside>
  );
};

export default AppSidebar;
