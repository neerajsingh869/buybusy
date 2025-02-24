import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { store } from "./redux/store.js";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <HelmetProvider>
        <Helmet>
          <link rel="preconnect" href="https://firestore.googleapis.com" />
        </Helmet>
        <App />
        <Toaster position="top-right" />
      </HelmetProvider>
    </React.StrictMode>
  </Provider>
);
