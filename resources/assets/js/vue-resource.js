/**
 * vue-resource v0.1.17
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["VueResource"] = factory();
  else
    root["VueResource"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * Install plugin.
   */

  function install(Vue) {

      var _ = __webpack_require__(1)(Vue);

      Vue.url = __webpack_require__(2)(_);
      Vue.http = __webpack_require__(3)(_);
      Vue.resource = __webpack_require__(7)(_);

      Object.defineProperties(Vue.prototype, {

          $url: {
              get: function () {
                  return _.options(Vue.url, this, this.$options.url);
              }
          },

          $http: {
              get: function () {
                  return _.options(Vue.http, this, this.$options.http);
              }
          },

          $resource: {
              get: function () {
                  return Vue.resource.bind(this);
              }
          }

      });
  }

  if (window.Vue) {
      Vue.use(install);
  }

  module.exports = install;

/***/ },
/* 1 */
/***/ function(module, exports) {

  /**
   * Utility functions.
   */

  module.exports = function (Vue) {

      var _ = Vue.util.extend({}, Vue.util);

      _.isString = function (value) {
          return typeof value === 'string';
      };

      _.isFunction = function (value) {
          return typeof value === 'function';
      };

      _.options = function (fn, obj, options) {

          options = options || {};

          if (_.isFunction(options)) {
              options = options.call(obj);
          }

          return _.extend(fn.bind({vm: obj, options: options}), fn, {options: options});
      };

      _.each = function (obj, iterator) {

          var i, key;

          if (typeof obj.length == 'number') {
              for (i = 0; i < obj.length; i++) {
                  iterator.call(obj[i], obj[i], i);
              }
          } else if (_.isObject(obj)) {
              for (key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      iterator.call(obj[key], obj[key], key);
                  }
              }
          }

          return obj;
      };

      _.extend = function (target) {

          var array = [], args = array.slice.call(arguments, 1), deep;

          if (typeof target == 'boolean') {
              deep = target;
              target = args.shift();
          }

          args.forEach(function (arg) {
              extend(target, arg, deep);
          });

          return target;
      };

      function extend(target, source, deep) {
          for (var key in source) {
              if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
                  if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
                      target[key] = {};
                  }
                  if (_.isArray(source[key]) && !_.isArray(target[key])) {
                      target[key] = [];
                  }
                  extend(target[key], source[key], deep);
              } else if (source[key] !== undefined) {
                  target[key] = source[key];
              }
          }
      }

      return _;
  };


/***/ },
/* 2 */
/***/ function(module, exports) {

  /**
   * Service for URL templating.
   */

  var ie = document.documentMode;
  var el = document.createElement('a');

  module.exports = function (_) {

      function Url(url, params) {