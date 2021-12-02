import React, { useEffect } from "react";
import { RefreshCcw } from "react-feather";
import { ArticleCard } from "../components/FeedList/ArticleCard";
import { SearchBar } from "../components/FeedList/SearchBar";
import { useFeedStore } from "../contexts/FeedStoreContext";
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

const RssFeed: React.FC<RssFeedProps> = () => {
  const { state, dispatch } = useFeedStore();

  const refreshFeed = async () => {
    let res: Array<feedItem> = [];
    for (const url of state.publishersUrl) {
      const data = await getParsedFeed(url);
      if (data?.error === "Invalid URL") break;
      const publication = data?.feed?.title;
      const rssUrl = url;
      const feedItems = data?.entries.map((i: feedItem) => ({
        ...i,
        publication,
        rssUrl,
      }));
      res.push(...feedItems);
    }
    dispatch({ type: "addFeedItem", payload: res });
  };

  useInterval(refreshFeed, 100000);

  useEffect(() => {
    if (state.activeFolder === Folder.UNREAD) {
      dispatch({
        type: "addFeedListItems",
        payload: state.feedItems.filter(
          (item) => !state.read.includes(item.id)
        ),
      });
    } else if (state.activeFolder === Folder.FAVORITES) {
      dispatch({
        type: "addFeedListItems",
        payload: state.feedItems.filter((item) =>
          state.favourites.includes(item.id)
        ),
      });
    } else if (state.activeFolder === Folder.PUBLISHER) {
      dispatch({
        type: "addFeedListItems",
        payload: state.feedItems.filter(
          (item) => item.rssUrl === state.activePublisher
        ),
      });
    } else if (state.activeFolder === Folder.CATEGORY) {
      dispatch({
        type: "addFeedListItems",
        payload: state.feedItems.filter((item) =>
          item.tags?.includes({
            term: state.activeCategory as string,
          })
        ),
      });
    } else {
      dispatch({ type: "addFeedListItems", payload: state.feedItems });
    }
  }, [
    dispatch,
    state.activeCategory,
    state.activeFolder,
    state.activePublisher,
    state.favourites,
    state.feedItems,
    state.read,
  ]);

  const onFilterChange = (keyword: string): void => {
    dispatch({
      type: "addFeedListItems",
      payload:
        keyword !== null
          ? state.feedItems.filter(containsSearchTerm(keyword))
          : state.feedListItems,
    });
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
        {state.feedListItems.length > 0 ? (
          state.feedListItems.map((feedItem) => (
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
