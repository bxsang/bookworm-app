import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Routes from './Routes';
import NavBar from './components/NavBar';
import store from "./store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
