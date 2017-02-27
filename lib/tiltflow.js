(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tiltflow", [], factory);
	else if(typeof exports === 'object')
		exports["tiltflow"] = factory();
	else
		root["tiltflow"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TiltFlow = function () {
	function TiltFlow(el) {
		var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, TiltFlow);

		if (!(el instanceof Node)) {
			throw "Can't initialize TiltFlow because " + el + " is not a Node.";
		}

		this.windowWidth = null;
		this.windowHeight = null;
		this.updateBind = this.update.bind(this);
		this.el = el;
		this.settings = this.extendSettings(settings);
		this.addEventListeners();
	}

	_createClass(TiltFlow, [{
		key: "addEventListeners",
		value: function addEventListeners() {
			this.onMouseMoveBind = this.onMouseMove.bind(this);
			this.onResizeBind = this.onResize.bind(this);

			window.addEventListener("mousemove", this.onMouseMoveBind);
			window.addEventListener("resize", this.onResizeBind);
			window.addEventListener("load", this.onResizeBind);
		}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(event) {
			this.event = event;
			this.update();
		}
	}, {
		key: "onResize",
		value: function onResize(event) {
			this.updateClient();
		}
	}, {
		key: "updateClient",
		value: function updateClient() {
			this.windowWidth = window.innerWidth;
			this.windowHeight = window.innerHeight;
		}
	}, {
		key: "update",
		value: function update() {
			var moveAmount = this.settings.move,
			    duration = this.settings.duration,
			    cursorX = this.event.pageX,
			    cursorY = this.event.pageY,
			    moveX = (cursorX - this.windowWidth / 2) * -moveAmount,
			    moveY = (cursorY - this.windowHeight / 2) * -moveAmount,
			    rotationX = moveY * -this.settings["rotation-x"],
			    rotationY = moveX * -this.settings["rotation-y"];

			TweenMax.to(this.el, duration, {
				x: moveX,
				y: moveY,
				rotationX: rotationX,
				rotationY: rotationY
			});
		}
	}, {
		key: "extendSettings",
		value: function extendSettings(settings) {
			var defaultSettings = {
				duration: 1.175,
				move: 0.032,
				"rotation-x": 0.036,
				"rotation-y": 0.036
			};

			var newSettings = {};

			for (var property in defaultSettings) {
				if (property in settings) {
					newSettings[property] = settings[property];
				} else if (this.el.hasAttribute("data-tf-" + property)) {
					var attribute = this.el.getAttribute("data-tf-" + property);
					try {
						newSettings[property] = JSON.parse(attribute);
					} catch (e) {
						newSettings[property] = attribute;
					}
				} else {
					newSettings[property] = defaultSettings[property];
				}
			}

			return newSettings;
		}
	}], [{
		key: "init",
		value: function init(els, settings) {
			if (els instanceof Node) {
				els = [els];
			}

			if (els instanceof NodeList) {
				els = [].slice.call(els);
			}

			if (!(els instanceof Array)) {
				return;
			}

			els.forEach(function (el) {
				if (!("tiltFlow" in el)) {
					el.tiltFlow = new TiltFlow(el, settings);
				}
			});
		}
	}]);

	return TiltFlow;
}();

exports.default = TiltFlow;


window.TiltFlow = TiltFlow;
TiltFlow.init(document.querySelectorAll("[data-tf]"));
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=tiltflow.js.map