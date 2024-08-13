'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function Layout(_ref) {
  var className = _ref.className,
      children = _ref.children,
      theme = _ref.theme;
  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'layout', className: (0, _classnames2.default)(theme.layout, className) },
    _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, { theme: theme });
    })
  );
};

Layout.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.element), _propTypes2.default.element]),
  className: _propTypes2.default.string,
  theme: _propTypes2.default.shape({
    layout: _propTypes2.default.string
  })
};

Layout.defaultProps = {
  className: ''
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(Layout);
exports.Layout = Layout;