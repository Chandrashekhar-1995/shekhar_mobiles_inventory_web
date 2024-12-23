import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from "./store/appStore";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
