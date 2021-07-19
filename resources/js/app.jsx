import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Routes from './Routes'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import store from './store'

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <NavBar />
      <div className="site-content">
        <Routes />
      </div>
      <Footer />
    </HashRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
