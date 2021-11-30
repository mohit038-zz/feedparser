export interface feedItem {
  title: string;
  id: string;
  link: string;
  summary: string;
  author: string;
  published: string;
  publication: string;
  tags: Array<{ label: string }>;
  media_thumbnail: Array<{
    url: string;
  }>;
}
