import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import { connect } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
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
