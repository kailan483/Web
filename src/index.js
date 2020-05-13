import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Header from './Header';
import Footer from './Footer';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Header/>, document.body);
ReactDOM.render(<body><App/></body>, document.body);
// ReactDOM.render(<Footer/>, document.body);

// If you want your app to work offline and load faster, you can change
// unranaegister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();