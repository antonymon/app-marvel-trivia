import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";

import Router from "./router";
import i18n from "./translation";

import "antd/dist/antd.min.css";

i18n.init({
  lng: "es",
});


const App = () => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
