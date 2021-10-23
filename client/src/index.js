import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import 'antd/dist/antd.css'
import {applyMiddleware, createStore} from "redux";
import promiseMiddleware from 'redux-promise'
import reduxThunk from 'redux-thunk'
import reducer from "./_reducers";
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore)

ReactDOM.render(
    <BrowserRouter>
      <Provider store={createStoreWithMiddleware(reducer,
          composeWithDevTools()
          )} >
            <App />
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
