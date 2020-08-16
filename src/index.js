import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './config/normalize.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App className="body" />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
