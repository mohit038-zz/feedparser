import React, { useRef } from "react";
import { X } from "react-feather";
// import { useFeedMap } from "../contexts/FeedMapContext";
import { useFeedStore } from "../contexts/FeedStoreContext";
import { useModalState } from "../contexts/ModalStateContext";
import { feedItem } from "../types";
import { getParsedFeed } from "../utils/hooks";

interface InputModalProps {}

export const InputModal: React.FC<InputModalProps> = () => {
  const { isModalOpen, setIsModalOpen } = useModalState();
  const [inputValue, setInputValue] = React.useState("");

  const [error, setError] = React.useState<String | null>("");
  const { dispatch } = useFeedStore();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await getParsedFeed(inputValue);
    console.log("data", data);
    if (data?.error === "Invalid URL") {
      setError(data?.error);
      return;
    } else {
      setError(null);
      dispatch({ type: "addPublishersUrl", payload: inputValue });
      const publication = data?.feed?.title;
      const rssUrl = inputValue;
      const feedItems = data?.entries.map((i: feedItem) => ({
        ...i,
        publication,
        rssUrl,
      }));
      dispatch({ type: "addFeedItem", payload: feedItems });
      setInputValue("");
      setIsModalOpen(false);
    }
  };

  const node = useRef<HTMLDivElement>(null);

  return isModalOpen ? (
    <div className="dimmer">
      <aside ref={node} className="input-modal">
        <header className="input-modal-header">
          <h2>Add Feed</h2>
          <div
            className="close-button"
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={20} />
          </div>
        </header>
        <section className="modal-content">
          <input
            className={
              error ? "modal-content-input error" : "modal-content-input"
            }
            type="text"
            placeholder="Feed URL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
        </section>
        <footer className="modal-footer">
          <button
            className="button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Subscribe
          </button>
          <button
            className="button"
            onClick={() => {
              setInputValue("");
              setError(null);
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
        </footer>
      </aside>
    </div>
  ) : null;
};
