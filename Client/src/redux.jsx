import rootReducer from "./User/Store/Reducers/rootReducers";
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
// import logger from "redux-logger";
import thunk from 'redux-thunk'
// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
// });

const reduxConfig = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default reduxConfig;
