import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext"
import { GetPostContextProvider } from "./PostContext/GetPostContext"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
//import store from "./redux/Store"
import { reducers } from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GetPostContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </GetPostContextProvider>,
    </AuthContextProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);
