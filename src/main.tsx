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
          <meta
            name="description"
            content="Buybusy is an e-commerce app for browsing, cart management, and purchases. Users can filter/search products and sign in with email or Google IDs."
          />
          <meta name="keywords" content="BuyBusy,E-Commerce,Search Filter,Personal Project,React,Firebase,Open Source,TailwindCSS,Vite,Authorization,Authentication,TypeScript,JavaScript,CSS3,HTML5,Toast"></meta>
          <link rel="preconnect" href="https://firestore.googleapis.com" />
        </Helmet>
        <App />
        <Toaster position="top-right" />
      </HelmetProvider>
    </React.StrictMode>
  </Provider>
);
