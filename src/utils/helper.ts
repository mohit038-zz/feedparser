import { feedItem } from "../types";

export interface SortStrategy {
  sort: (a: feedItem, b: feedItem) => number;
}

export const lastUpdated: SortStrategy = {
  sort: (a: feedItem, b: feedItem): number => {
    const dateA = new Date(a.published);
    const dateB = new Date(b.published);

    // the first note in the list should consistently sort after if it is created at the same time
    return dateA < dateB ? 1 : -1;
  },
};
