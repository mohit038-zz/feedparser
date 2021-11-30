import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import { FeedStoreProvider } from "./contexts/FeedStoreContext";
import { ModalStateProvider } from "./contexts/ModalStateContext";

ReactDOM.render(
  <React.StrictMode>
    <FeedStoreProvider>
      <ModalStateProvider>
        <App />
      </ModalStateProvider>
    </FeedStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
