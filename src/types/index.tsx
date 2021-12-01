export interface feedItem {
  title: string;
  id: string;
  rssUrl: string;
  link: string;
  summary: string;
  author: string;
  published: string;
  publication: string;
  tags?: Array<{ term: string }>;
  media_thumbnail?: Array<{
    url?: string;
  }>;
}
