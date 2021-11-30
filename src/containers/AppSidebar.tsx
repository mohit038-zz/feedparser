import React from "react";
import { Plus } from "react-feather";
import { ActionButton } from "../components/AppSidebar/ActionButton";
import { FolderOption } from "../components/AppSidebar/FolderOption";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { useModalState } from "../contexts/ModalStateContext";
import { Folder } from "../utils/emuns";

interface AppSidebarProps {}

const AppSidebar: React.FC<AppSidebarProps> = () => {
  const { setIsModalOpen } = useModalState();
  const { state, dispatch } = useFeedStore();
  const { activeFolder } = state;
  const swapFolder = (folder: Folder) =>
    dispatch({ type: "setActiveFolder", payload: folder });

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
        {/* <CategoryList /> */}
      </section>
    </aside>
  );
};

export default AppSidebar;
