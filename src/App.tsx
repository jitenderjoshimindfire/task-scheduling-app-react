import React from "react";
import AppRouter from "./routes/Router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
