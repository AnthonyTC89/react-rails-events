import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import App from './containers/App';
import './index.css';

WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
