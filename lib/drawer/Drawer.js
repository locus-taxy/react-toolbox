'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = exports.drawerFactory = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _identifiers = require('../identifiers.js');

var _ActivableRenderer = require('../hoc/ActivableRenderer.js');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _Overlay = require('../overlay/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Overlay) {
  var Drawer = function Drawer(_ref) {
    var active = _ref.active,
        children = _ref.children,
        className = _ref.className,
        onOverlayClick = _ref.onOverlayClick,
        theme = _ref.theme,
        type = _ref.type;

    var _className = (0, _classnames3.default)([theme.drawer, theme[type]], _defineProperty({}, theme.active, active), className);

    return _react2.default.createElement(
      Overlay,
      { active: active, onClick: onOverlayClick },
      _react2.default.createElement(
        'div',
        { 'data-react-toolbox': 'drawer', className: _className },
        _react2.default.createElement(
          'aside',
          { className: theme.content },
          children
        )
      )
    );
  };

  Drawer.propTypes = {
    active: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    onOverlayClick: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      active: _propTypes2.default.string,
      content: _propTypes2.default.string,
      drawer: _propTypes2.default.string,
      left: _propTypes2.default.string,
      right: _propTypes2.default.string
    }),
    type: _propTypes2.default.oneOf(['left', 'right'])
  };

  Drawer.defaultProps = {
    active: false,
    className: '',
    type: 'left'
  };

  return (0, _ActivableRenderer2.default)()(Drawer);
};

var Drawer = factory(_Overlay2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DRAWER)(Drawer);
exports.drawerFactory = factory;
exports.Drawer = Drawer;