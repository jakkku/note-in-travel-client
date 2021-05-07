import React from "react";
import { Provider } from "react-redux";

import store from "./src/store";
import AppNavigation from "./src/components/navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
