import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'whatwg-fetch';
import Promise from 'promise-polyfill'; 

if (!window.Promise) {
  window.Promise = Promise;
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
