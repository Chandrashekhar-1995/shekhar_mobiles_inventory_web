import { Provider } from "react-redux";
import appStore from "./store/appStore";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Provider store={appStore}>
      <AppRoutes />
    </Provider>
  );
};

export default App;
