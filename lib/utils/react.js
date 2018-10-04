'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isComponentOfType = isComponentOfType;

var _reactHotLoader = require('react-hot-loader');

function isComponentOfType(classType, reactElement) {
  return (0, _reactHotLoader.areComponentsEqual)(reactElement.type, classType);
}