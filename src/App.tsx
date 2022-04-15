import "antd/dist/antd.css";
import "styles/global.scss";
import { Provider } from "react-redux";
import store from "app/redux/store";
import "./i18n";

import AppRoutes from "routes";

function App(): JSX.Element {
  // const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
