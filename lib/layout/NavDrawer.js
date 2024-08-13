'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavDrawer = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavDrawer = function NavDrawer(_ref) {
  var _classnames;

  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      onOverlayClick = _ref.onOverlayClick,
      permanentAt = _ref.permanentAt,
      pinned = _ref.pinned,
      scrollY = _ref.scrollY,
      theme = _ref.theme,
      width = _ref.width;

  var rootClasses = (0, _classnames4.default)([theme.navDrawer], (_classnames = {}, _defineProperty(_classnames, theme[permanentAt + 'Permanent'], permanentAt), _defineProperty(_classnames, theme.wide, width === 'wide'), _defineProperty(_classnames, theme.active, active), _defineProperty(_classnames, theme.pinned, pinned), _classnames), className);

  var drawerClasses = (0, _classnames4.default)(theme.drawerContent, _defineProperty({}, theme.scrollY, scrollY));

  return _react2.default.createElement(
    'div',
    { 'data-react-toolbox': 'nav-drawer', className: rootClasses },
    _react2.default.createElement('div', { 'data-react-toolbox': 'nav-drawer-scrim', className: theme.scrim, onClick: onOverlayClick }),
    _react2.default.createElement(
      'aside',
      { 'data-react-toolbox': 'nav-drawer-content', className: drawerClasses },
      children
    )
  );
};

NavDrawer.propTypes = {
  active: _propTypes2.default.bool,
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  onOverlayClick: _propTypes2.default.func,
  permanentAt: _propTypes2.default.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  pinned: _propTypes2.default.bool,
  scrollY: _propTypes2.default.bool,
  theme: _propTypes2.default.shape({
    active: _propTypes2.default.string,
    drawerContent: _propTypes2.default.string,
    lgPermanent: _propTypes2.default.string,
    lgTabletPermanent: _propTypes2.default.string,
    mdPermanent: _propTypes2.default.string,
    navDrawer: _propTypes2.default.string,
    pinned: _propTypes2.default.string,
    scrim: _propTypes2.default.string,
    scrollY: _propTypes2.default.string,
    smPermanent: _propTypes2.default.string,
    smTabletPermanent: _propTypes2.default.string,
    wide: _propTypes2.default.string,
    xlPermanent: _propTypes2.default.string,
    xxlPermanent: _propTypes2.default.string,
    xxxlPermanent: _propTypes2.default.string
  }),
  width: _propTypes2.default.oneOf(['normal', 'wide'])
};

NavDrawer.defaultProps = {
  active: false,
  className: '',
  scrollY: false,
  width: 'normal'
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.LAYOUT)(NavDrawer);
exports.NavDrawer = NavDrawer;