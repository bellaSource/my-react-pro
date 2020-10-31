import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
//引入antd-mobile的公共样式
import "antd-mobile/dist/antd-mobile.css";
import "./assets/css/common.css"
// 引入iconfont的样式
import "./assets/css/iconfont.css";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
