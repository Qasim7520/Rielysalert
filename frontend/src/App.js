import React from "react";
import { Provider } from "react-redux";
// import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { Routing } from "./pages/routes";
import { NotificationProvider } from "./hooks/notificationProvider";
import { store } from './redux toolkit/store'


export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NotificationProvider>
          <Routing />
        </NotificationProvider>
      </Router>
    </Provider>
  );
};