import axios from "axios";
import React, { useEffect } from "react";
import { RefreshCcw } from "react-feather";
import { ArticleCard } from "../components/FeedList/ArticleCard";
import { SearchBar } from "../components/FeedList/SearchBar";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { data } from "../data";
import { feedItem } from "../types";
import { iconColor } from "../utils/constants";
import { Folder } from "../utils/emuns";
import { getParsedFeed, useInterval } from "../utils/hooks";

interface RssFeedProps {}

function containsSearchTerm(keyword: string) {
  return (item: feedItem) => {
    return [item.title, item.author, item.summary, item.publication].some(
      (str: string | number) =>
        str
          ? str.toString().toLowerCase().includes(keyword.toLowerCase().trim())
          : false
    );
  };
}

const RssFeed: React.FC<RssFeedProps> = ({}) => {
  const { state, dispatch } = useFeedStore();
  const [feed, setFeed] = React.useState(state.feedItems);

  const refreshFeed = async () => {
    const data = await getParsedFeed(state.publishersUrl[0]);
    if (data?.error !== "Invalid URL") {
      const publication = data?.feed?.title;
      const feedItems = data?.entries.map((i: feedItem) => ({
        ...i,
        publication,
      }));
      setFeed(feedItems);
    }
    console.log("refreshed");
  };

  useInterval(refreshFeed, 10000);

  useEffect(() => {
    if (state.activeFolder === Folder.UNREAD) {
      setFeed(state.feedItems.filter((item) => !state.read.includes(item.id)));
    } else if (state.activeFolder === Folder.FAVORITES) {
      setFeed(
        state.feedItems.filter((item) => state.favourites.includes(item.id))
      );
    } else {
      setFeed(state.feedItems);
    }
    console.log(data);
  }, [state.activeFolder, state.favourites, state.feedItems, state.read]);

  const onFilterChange = (keyword: string): void => {
    setFeed(state.feedItems.filter(containsSearchTerm(keyword)));
  };

  return (
    <div className="feedList">
      <div className="feedList-header">
        <SearchBar searchNotes={onFilterChange} />
        <button className="refresh">
          <RefreshCcw size={18} onClick={refreshFeed} color={iconColor} />
        </button>
      </div>
      <div className="feedList-list">
        {feed.length > 0 ? (
          feed.map((feedItem) => (
            <ArticleCard key={feedItem.id} feedItem={feedItem} />
          ))
        ) : (
          <div className="empty-feed">No article found</div>
        )}
      </div>
    </div>
  );
};

export default RssFeed;
