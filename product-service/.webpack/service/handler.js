(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./db/gameDB.js":
/*!**********************!*\
  !*** ./db/gameDB.js ***!
  \**********************/
/*! exports provided: gameDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameDB\", function() { return gameDB; });\nconst gameDB = [{\n  id: 1,\n  title: 'Dark Souls',\n  genre: 'Action/RPG',\n  releaseDate: 2011,\n  price: '29.99'\n}, {\n  id: 2,\n  title: 'Disco Elysium',\n  genre: 'RPG',\n  releaseDate: 2019,\n  price: '29.99'\n}, {\n  id: 3,\n  title: 'The Binding of Isaac',\n  genre: 'Rogue-lite',\n  releaseDate: 2012,\n  price: '9.99'\n}, {\n  id: 4,\n  title: 'Hollow Knight',\n  genre: 'Metroidvania',\n  releaseDate: 2017,\n  price: '9.99'\n}, {\n  id: 5,\n  title: 'Hotline Miami',\n  genre: 'Top-down action',\n  releaseDate: 2012,\n  price: '9.99'\n}];\n\n//# sourceURL=webpack:///./db/gameDB.js?");

/***/ }),

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! exports provided: getProductsList, getProductsById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handlers_getProductsById__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers/getProductsById */ \"./handlers/getProductsById.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getProductsById\", function() { return _handlers_getProductsById__WEBPACK_IMPORTED_MODULE_0__[\"getProductsById\"]; });\n\n/* harmony import */ var _handlers_getProductsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/getProductsList */ \"./handlers/getProductsList.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getProductsList\", function() { return _handlers_getProductsList__WEBPACK_IMPORTED_MODULE_1__[\"getProductsList\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./handler.js?");

/***/ }),

/***/ "./handlers/getProductsById.js":
/*!*************************************!*\
  !*** ./handlers/getProductsById.js ***!
  \*************************************/
/*! exports provided: getProductsById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getProductsById\", function() { return getProductsById; });\n/* harmony import */ var _db_gameDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/gameDB */ \"./db/gameDB.js\");\n\nconst getProductsById = async event => {\n  const {\n    id\n  } = event.pathParameters;\n  const gameToFind = _db_gameDB__WEBPACK_IMPORTED_MODULE_0__[\"gameDB\"].find(game => game.id === parseInt(id, 10));\n  if (gameToFind === undefined) return {\n    statusCode: 404,\n    body: JSON.stringify({\n      message: \"Game is not found\"\n    })\n  };\n  return {\n    statusCode: 200,\n    body: JSON.stringify(gameToFind)\n  };\n};\n\n//# sourceURL=webpack:///./handlers/getProductsById.js?");

/***/ }),

/***/ "./handlers/getProductsList.js":
/*!*************************************!*\
  !*** ./handlers/getProductsList.js ***!
  \*************************************/
/*! exports provided: getProductsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getProductsList\", function() { return getProductsList; });\n/* harmony import */ var _db_gameDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/gameDB */ \"./db/gameDB.js\");\n\nconst getProductsList = async () => {\n  if (!_db_gameDB__WEBPACK_IMPORTED_MODULE_0__[\"gameDB\"]) return {\n    statusCode: 404,\n    body: JSON.stringify({\n      message: \"Games not found\"\n    })\n  };\n  return {\n    statusCode: 200,\n    body: JSON.stringify(_db_gameDB__WEBPACK_IMPORTED_MODULE_0__[\"gameDB\"])\n  };\n};\n\n//# sourceURL=webpack:///./handlers/getProductsList.js?");

/***/ })

/******/ })));