import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const reactNodeToNativeNode = function(reactNode) {
  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(reactNode)),
      t    = document.createElement('template');
      t.innerHTML = html;

  return t.content.firstChild;
}

export const appendChildren = function(parent, nodes) {
  for (var node of nodes) {
    parent.appendChild(node);
  }
};

export const Store = function(base = {}) {
  this.store = base;

  this.updateStore = function(obj) {
    this.store = { ...this.store, ...obj };
  }
}
