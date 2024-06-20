import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './fbconfig'; // Update the path to your Firebase config file

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

