import moment from "moment";
import React, { useEffect } from "react";
import { Eye, EyeOff, Heart, Star } from "react-feather";
import { useFeedStore } from "../../contexts/FeedStoreContext";
import { feedItem } from "../../types";
import { iconColor } from "../../utils/constants";

interface ArticleCardProps {
  feedItem: feedItem;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  feedItem,
}: ArticleCardProps) => {
  const {
    title,
    link,
    id,
    media_thumbnail,
    publication,
    summary,
    author,
    published,
  } = feedItem;
  const { state, dispatch } = useFeedStore();
  const { favourites, read } = state;
  const ago = moment(published).fromNow();
  return (
    <div className="article-card">
      <div className="article-card-content">
        <img
          className="thumbnail"
          src={media_thumbnail[0]?.url}
          alt="article"
        />
        <div className="article">
          <div className="article-title">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!read.includes(id)) {
                  dispatch({ type: "addToRead", payload: id });
                }
              }}
            >
              {title}
            </a>
          </div>
          <div className="article-summary">
            <p>{summary}</p>
          </div>
          <div className="article-publisher">
            <div>{author}</div>
          </div>
        </div>
      </div>
      <div className="article-footer">
        <div className="article-publication">{publication}</div>
        <div className="article-date">{ago}</div>
        <Star
          className={
            !!favourites.find((i) => i === id)
              ? "article-icon favourite select"
              : "article-icon favourite"
          }
          size={20}
          onClick={() => dispatch({ type: "addFavourites", payload: id })}
        />
        <div>
          {read.includes(id) ? (
            <Eye
              className="article-icon"
              size={20}
              onClick={() => dispatch({ type: "addToRead", payload: id })}
            />
          ) : (
            <EyeOff
              className="article-icon"
              size={20}
              onClick={() => dispatch({ type: "addToRead", payload: id })}
            />
          )}
        </div>
      </div>
    </div>
  );
};
