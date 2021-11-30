import React from "react";
import SplitPane from "react-split-pane";
import AppSidebar from "./AppSidebar";
import FeedList from "./FeedList";
import { InputModal } from "./InputModal";

interface RSSFeedAppProps {}

const RSSFeedApp: React.FC<RSSFeedAppProps> = () => {
  return (
    <div className="app">
      <SplitPane split="vertical" minSize={200} maxSize={500} defaultSize={240}>
        <AppSidebar />
        <SplitPane split="vertical" defaultSize={"100%"}>
          <FeedList />
        </SplitPane>
      </SplitPane>
      <InputModal />
    </div>
  );
};

export default RSSFeedApp;
