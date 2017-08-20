import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const reactNodeToNativeNode = function(reactNode) {
  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(reactNode)),
      t    = document.createElement('template');
      t.innerHTML = html;
      
  return t.content.firstChild;
}
