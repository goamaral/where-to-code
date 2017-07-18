import HomeRoute from 'routes/HomeRoute';
import App from 'App';
import ReactDOM from 'react-dom';
import React from 'react';

var app = () => {
  return (
    <App>
      <HomeRoute />
    </App>
  );
}

window.onload = () => {
  ReactDOM.render(React.createElement(app), document.getElementById('root'));
}
