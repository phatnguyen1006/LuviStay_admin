import "antd/dist/antd.css";
import "styles/global.scss";
import { Provider } from "react-redux";
import store from "app/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import "./i18n";

import AppRoutes from "routes";

function App(): JSX.Element {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AppRoutes />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
