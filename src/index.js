import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./layout";

const rootElement = document.getElementById("root");

if(rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Layout />, rootElement)
} else {
  ReactDOM.render(<Layout />, rootElement)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
