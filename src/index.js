import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './configureStore'
import { Provider } from "react-redux";

import { TestApp } from './TestApp';

import "bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <TestApp />
//     </PersistGate>
//   </Provider>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <TestApp />,
  document.getElementById("root")
);
