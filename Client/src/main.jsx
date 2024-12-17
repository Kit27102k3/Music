import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxConfig from "./redux.jsx";
import { SearchProvider } from "./User/components/SearchContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const { store, persistor } = reduxConfig();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Theme>
        <GoogleOAuthProvider clientId={clientId}>
          <SearchProvider>
            <App />
          </SearchProvider>
        </GoogleOAuthProvider>
      </Theme>
    </PersistGate>
  </Provider>
);
