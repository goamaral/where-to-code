import LocationRoute from 'routes/LocationRoute';
import App from 'App';
import ReactDOM from 'react-dom';
import React from 'react';

var app = () => {
  return (
    <App>
      <LocationRoute />
    </App>
  );
}

window.onload = () => {
  ReactDOM.render(React.createElement(app), document.getElementById('root'));
}
