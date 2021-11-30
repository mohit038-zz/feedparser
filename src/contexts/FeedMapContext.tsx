// import React from "react";
// import { feedData } from "../types";

// interface FeedMapProviderProps {
//   children: React.ReactNode;
// }

// const initialState = {
//   feedMap: new Map<string, feedData>(),
//   setFeedMap: () => {},
// };

// interface feedMapInterface {
//   feedMap: {};
//   setFeedMap: React.Dispatch<React.SetStateAction<Map<string, feedData>>>;
// }
// const feedMapContext = React.createContext<feedMapInterface>(initialState);

// export const FeedMapProvider: React.FC<FeedMapProviderProps> = ({
//   children,
// }: FeedMapProviderProps) => {
//   const [feedMap, setFeedMap] = React.useState<Map<string, feedData>>(
//     initialState.feedMap
//   );
//   const value = {
//     feedMap,
//     setFeedMap,
//   };
//   return (
//     <feedMapContext.Provider value={value}>{children}</feedMapContext.Provider>
//   );
// };

// export const useFeedMap = () => {
//   const context = React.useContext(feedMapContext);
//   if (context === undefined) {
//     throw new Error("useFeedMap must be used within a FeedMapProvider");
//   }
//   return context;
// };
