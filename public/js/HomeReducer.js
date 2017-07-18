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

	module.exports = __webpack_require__(78);


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _types = __webpack_require__(79);

	var INITIAL_STATE = {
		location: '',
		locations: []
	};

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
		var action = arguments[1];

		switch (action.type) {
			case _types.UPDATE_LOCATION:
				return _extends({}, state, { location: action.payload });
			case _types.UPDATE_LOCATIONS:
				return _extends({}, state, { locations: action.payload });
			case _types.RESET_LOCATION:
				return _extends({}, state, { location: action.payload });
			default:
				return state;
		}
	};

/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UPDATE_LOCATION = exports.UPDATE_LOCATION = 'update_location';
	var UPDATE_LOCATIONS = exports.UPDATE_LOCATIONS = 'update_locations';
	var RESET_LOCATION = exports.RESET_LOCATION = 'rest_location';

/***/ })

/******/ });