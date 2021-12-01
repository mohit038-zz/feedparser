import React, { useState } from "react";
import { CollapseCategoryListButton } from "../components/AppSidebar/CollapseCategoryButton";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { PublicationOption } from "./PublicationOption";

export const Publications: React.FC = () => {
  const { state } = useFeedStore();
  const { publishersUrl } = state;
  const [isCategoryListOpen, setCategoryListOpen] = useState(true);

  return (
    <>
      <div className="category-title">
        <CollapseCategoryListButton
          handler={() => setCategoryListOpen(!isCategoryListOpen)}
          label={`hello`}
          isCategoryListOpen={isCategoryListOpen}
          showIcon={publishersUrl.length > 0}
        />
      </div>
      {isCategoryListOpen && (
        <>
          <div className="category-list" aria-label="Category list">
            {publishersUrl.map((url, index) => (
              <PublicationOption
                key={index}
                active={url === state.activePublisher}
                publicationLink={url}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
