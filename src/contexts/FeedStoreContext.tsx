import React, { createContext, Dispatch, useReducer } from "react";
import { feedItem } from "../types";
import { Category, Folder } from "../utils/emuns";

interface FeedProviderProps {
  children: React.ReactNode;
}

export type FeedStoreAction =
  | { type: "addFavourites"; payload: String }
  | { type: "setActivePublisher"; payload: String | null }
  | { type: "setActiveFolder"; payload: Folder }
  | { type: "setActiveCategory"; payload: Category | null }
  | { type: "addToRead"; payload: String }
  | { type: "addPublishersUrl"; payload: String }
  | { type: "addFeedItem"; payload: Array<feedItem> }
  | { type: "removePublisher"; payload: String };

interface FeedStoreState {
  read: String[];
  favourites: String[];
  feedItems: feedItem[];
  publishersUrl: String[];
  activePublisher: String | null;
  activeFolder: Folder;
  activeCategory: Category | null;
}

interface FeedStoreContextInterface {
  state: FeedStoreState;
  dispatch: Dispatch<FeedStoreAction>;
}

let initialState = {
  state: {
    read: [],
    favourites: [],
    feedItems: [],
    publishersUrl: [],
    activePublisher: "",
    activeCategory: null,
    activeFolder: Folder.ALL,
  },
  dispatch: (action: FeedStoreAction) => {},
};

const state = localStorage.getItem("feedStoreState");

if (state) {
  initialState.state = JSON.parse(state);
}

const FeedStoreContext = createContext<FeedStoreContextInterface>(initialState);

const feedStoreReducer = (
  state: FeedStoreState,
  action: FeedStoreAction
): FeedStoreState => {
  switch (action.type) {
    case "addFeedItem":
      return {
        ...state,
        feedItems: [...action.payload],
      };
    case "addFavourites":
      if (state.favourites.includes(action.payload)) {
        return {
          ...state,
          favourites: state.favourites.filter((id) => id !== action.payload),
        }; // remove from favourites
      }
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case "setActivePublisher":
      return {
        ...state,
        activePublisher: action.payload,
      };

    case "removePublisher":
      if (state.publishersUrl.includes(action.payload)) {
        return {
          ...state,
          publishersUrl: state.publishersUrl.filter(
            (i) => i !== action.payload
          ),
          feedItems: state.feedItems.filter((i) => i.rssUrl !== action.payload),
        };
      }
      return state;
    case "addPublishersUrl":
      if (!state.publishersUrl.includes(action.payload)) {
        return {
          ...state,
          publishersUrl: [...state.publishersUrl, action.payload],
        };
      }
      return state;

    case "setActiveFolder":
      return {
        ...state,
        activeFolder: action.payload,
      };
    case "setActiveCategory":
      return {
        ...state,
        activeCategory: action.payload,
      };
    case "addToRead":
      if (state.read.includes(action.payload)) {
        return {
          ...state,
          read: state.read.filter((id) => id !== action.payload),
        };
      }
      return {
        ...state,
        read: [...state.read, action.payload],
      };
    default:
      return state;
  }
};

export const useFeedStore = () => {
  const context = React.useContext(FeedStoreContext);
  if (context === undefined) {
    throw new Error("useFeedStore must be used within a FeedStoreProvider");
  }
  return context;
};

export const FeedStoreProvider: React.FC<FeedProviderProps> = ({
  children,
}: FeedProviderProps) => {
  const [state, dispatch] = useReducer(feedStoreReducer, initialState.state);
  const value = {
    state,
    dispatch,
  };
  return (
    <FeedStoreContext.Provider value={value}>
      {children}
    </FeedStoreContext.Provider>
  );
};
