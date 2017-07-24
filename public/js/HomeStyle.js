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

	module.exports = __webpack_require__(189);


/***/ }),

/***/ 189:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SearchBarStyle = exports.SearchBarStyle = {
	  input: {
	    padding: '10px',
	    textAlign: 'center',
	    fontSize: '1.3em',
	    border: '1px solid #BDBDBD',
	    backgroundColor: 'white',
	    width: '40vw',
	    height: '40px'
	  },
	  dropdown: {
	    list: {
	      width: '40vw',
	      backgroundColor: 'white',
	      borderRadius: '0 0 5px 5px'
	    },
	    listItemStyle: {
	      padding: '10px 15px',
	      marginBottom: '-1px',
	      width: '100%',
	      borderTop: '1px solid #BDBDBD',
	      listStyleType: 'none',
	      textAlign: 'center'
	    }
	  }
	};

/***/ })

/******/ });