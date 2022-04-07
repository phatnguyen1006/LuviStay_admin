import "antd/dist/antd.css";
import "styles/global.scss";
import { Provider } from "react-redux";
import store from "redux/store";
import "./i18n";

import Home from "pages";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
