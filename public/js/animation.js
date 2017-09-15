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

	module.exports = __webpack_require__(224);


/***/ }),

/***/ 224:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var fade = exports.fade = function fade(elem, delay, tdelay) {
	  elem.style.display = 'block';
	  fadeIn(elem, tdelay).then(function () {
	    setTimeout(function () {
	      fadeOut(elem, tdelay).then(function () {
	        elem.style.display = 'none';
	      });
	    }, delay);
	  });
	};

	var fadeIn = exports.fadeIn = function fadeIn(elem, tdelay) {
	  return new Promise(function (resolve, reject) {
	    elem.animate({ opacity: [0, 1] }, { duration: tdelay, fill: 'forwards' });
	    setTimeout(resolve, tdelay);
	  });
	};

	var fadeOut = exports.fadeOut = function fadeOut(elem, tdelay) {
	  return new Promise(function (resolve, reject) {
	    elem.animate({ opacity: [1, 0] }, { duration: tdelay, fill: 'forwards' });
	    setTimeout(resolve, tdelay);
	  });
	};

/***/ })

/******/ });