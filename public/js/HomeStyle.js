/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(117);


/***/ }),

/***/ 117:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var HeaderStyle = exports.HeaderStyle = _defineProperty({
	  margin: '0 0 8vh 0',
	  textAlign: 'center',
	  color: 'white',
	  fontSize: '4em'
	}, 'margin', '20px');

	var CoreStyle = exports.CoreStyle = {
	  height: '80vh'
	};

	var SearchBarStyle = exports.SearchBarStyle = {
	  input: {
	    padding: '10px',
	    textAlign: 'center',
	    fontSize: '1.3em',
	    border: '1px solid rgb(221, 221, 221)',
	    backgroundColor: 'white',
	    width: '40vw',
	    height: '40px'
	  },
	  dropdown: {
	    width: '40vw',
	    backgroundColor: 'white',
	    borderRadius: '0 0 5px 5px'
	  }
	};

/***/ })

/******/ });