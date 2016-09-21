'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = exports.autocompleteFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames7 = require('classnames');

var _classnames8 = _interopRequireDefault(_classnames7);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Chip = require('../chip/Chip.js');

var _Chip2 = _interopRequireDefault(_Chip);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
};

var factory = function factory(Chip, Input) {
  var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Autocomplete);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        direction: _this.props.direction,
        focus: false,
        showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet,
        query: _this.query(_this.props.value)
      }, _this.handleChange = function (keys, event) {
        var key = _this.props.multiple ? keys : keys[0];
        var query = _this.query(key);
        if (_this.props.onChange) _this.props.onChange(key, event);
        _this.setState({ focus: false, query: query, showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet }, function () {
          _reactDom2.default.findDOMNode(_this).querySelector('input').blur();
        });
      }, _this.handleQueryBlur = function () {
        if (_this.state.focus) _this.setState({ focus: false });
      }, _this.handleQueryChange = function (value) {
        _this.setState({ query: value, showAllSuggestions: false });
      }, _this.handleQueryFocus = function () {
        _this.refs.suggestions.scrollTop = 0;
        _this.setState({ active: '', focus: true });
      }, _this.handleQueryKeyDown = function (event) {
        // Clear query when pressing backspace and showing all suggestions.
        var shouldClearQuery = event.which === 8 && _this.props.showSuggestionsWhenValueIsSet && _this.state.showAllSuggestions;
        if (shouldClearQuery) {
          _this.setState({ query: '' });
        }
      }, _this.handleQueryKeyUp = function (event) {
        if (event.which === 13) {
          var target = _this.props.allowCreate ? _this.state.query : _this.state.active;
          if (!target) {
            target = _this.props.allowCreate ? _this.state.query : [].concat(_toConsumableArray(_this.suggestions().keys()))[0];
            _this.setState({ active: target });
          }
          _this.select(event, target);
        }

        if (event.which === 27) _reactDom2.default.findDOMNode(_this).querySelector('input').blur();

        if ([40, 38].indexOf(event.which) !== -1) {
          var suggestionsKeys = [].concat(_toConsumableArray(_this.suggestions().keys()));
          var index = suggestionsKeys.indexOf(_this.state.active) + (event.which === 40 ? +1 : -1);
          if (index < 0) index = suggestionsKeys.length - 1;
          if (index >= suggestionsKeys.length) index = 0;
          _this.setState({ active: suggestionsKeys[index] });
        }
      }, _this.handleSuggestionMouseEnter = function (event) {
        _this.setState({ active: event.target.id });
      }, _this.handleSuggestionMouseLeave = function (event) {
        _this.setState({ active: '' });
      }, _this.select = function (event, target) {
        _events2.default.pauseEvent(event);
        var values = _this.values(_this.props.value);
        var newValue = target === void 0 ? event.currentTarget.id : target;
        _this.handleChange([newValue].concat(_toConsumableArray(values.keys())), event);
      }, _this.handleClick = function (event) {
        event.preventDefault();
        _reactDom2.default.findDOMNode(_this).querySelector('input').focus();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Autocomplete, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.multiple) {
          this.setState({
            query: this.query(nextProps.value)
          });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
          var direction = this.calculateDirection();
          if (this.state.direction !== direction) {
            this.setState({ direction: direction });
          }
        }
        return true;
      }
    }, {
      key: 'calculateDirection',
      value: function calculateDirection() {
        if (this.props.direction === 'auto') {
          var client = _reactDom2.default.findDOMNode(this.refs.input).getBoundingClientRect();
          var screen_height = window.innerHeight || document.documentElement.offsetHeight;
          var up = client.top > screen_height / 2 + client.height;
          return up ? 'up' : 'down';
        } else {
          return this.props.direction;
        }
      }
    }, {
      key: 'query',
      value: function query(key) {
        var query_value = '';
        if (!this.props.multiple && key) {
          var source_value = this.source().get(key);
          query_value = source_value ? source_value : key;
          if ((typeof query_value === 'undefined' ? 'undefined' : _typeof(query_value)) === 'object' && this.props.valueDisplayField) {
            query_value = query_value[this.props.valueDisplayField];
          }
        }
        return query_value;
      }
    }, {
      key: 'suggestions',
      value: function suggestions() {
        var suggest = new Map();
        var rawQuery = this.state.query || (this.props.multiple ? '' : this.props.value);
        var query = (rawQuery || '').toLowerCase().trim();
        var values = this.values();
        var source = this.source();

        // Suggest any non-set value which matches the query
        if (this.props.multiple) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = _slicedToArray(_step.value, 2);

              var key = _step$value[0];
              var value = _step$value[1];

              if (!values.has(key) && this.matches(value.toLowerCase().trim(), query)) {
                suggest.set(key, value);
              }
            }

            // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (query && !this.state.showAllSuggestions) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = source[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = _slicedToArray(_step2.value, 2);

              var key = _step2$value[0];
              var value = _step2$value[1];

              if (this.props.customMatcher) {
                if (this.props.customMatcher(key, value, query)) {
                  suggest.set(key, value);
                }
              } else {
                if (this.matches(value.toLowerCase().trim(), query)) {
                  suggest.set(key, value);
                }
              }
            }

            // When multiple is false, suggest all values when showAllSuggestions is true
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          suggest = source;
        }
        return suggest;
      }
    }, {
      key: 'matches',
      value: function matches(value, query) {
        var suggestionMatch = this.props.suggestionMatch;


        if (suggestionMatch === 'start') {
          return value.startsWith(query);
        } else if (suggestionMatch === 'anywhere') {
          return value.includes(query);
        } else if (suggestionMatch === 'word') {
          var re = new RegExp('\\b' + query, 'g');
          return re.test(value);
        }

        return false;
      }
    }, {
      key: 'source',
      value: function source() {
        var src = this.props.source;

        if (src.hasOwnProperty('length')) {
          return new Map(src.map(function (item) {
            return Array.isArray(item) ? [].concat(_toConsumableArray(item)) : [item, item];
          }));
        } else {
          return new Map(Object.keys(src).map(function (key) {
            return [key, src[key]];
          }));
        }
      }
    }, {
      key: 'values',
      value: function values() {
        var valueMap = new Map();
        var vals = this.props.multiple ? this.props.value : [this.props.value];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.source()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2);

            var k = _step3$value[0];
            var v = _step3$value[1];

            if (vals.indexOf(k) !== -1) valueMap.set(k, v);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return valueMap;
      }
    }, {
      key: 'unselect',
      value: function unselect(key, event) {
        if (!this.props.disabled) {
          var values = this.values(this.props.value);
          values.delete(key);
          this.handleChange([].concat(_toConsumableArray(values.keys())), event);
        }
      }
    }, {
      key: 'renderSelected',
      value: function renderSelected() {
        var _this2 = this;

        if (this.props.multiple) {
          var selectedItems = [].concat(_toConsumableArray(this.values())).map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2);

            var key = _ref3[0];
            var value = _ref3[1];

            return _react2.default.createElement(
              Chip,
              {
                key: key,
                className: _this2.props.theme.value,
                deletable: true,
                onDeleteClick: _this2.unselect.bind(_this2, key)
              },
              value
            );
          });

          return _react2.default.createElement(
            'ul',
            { className: this.props.theme.values },
            selectedItems
          );
        }
      }
    }, {
      key: 'renderSuggestions',
      value: function renderSuggestions() {
        var _this3 = this;

        var theme = this.props.theme;

        var hasPerfectMatch = false;
        var suggestions = [].concat(_toConsumableArray(this.suggestions())).map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2);

          var key = _ref5[0];
          var value = _ref5[1];

          var className = (0, _classnames8.default)(theme.suggestion, _defineProperty({}, theme.active, _this3.state.active === key));
          var target = _this3.props.allowCreate ? _this3.state.query : null;
          if (_this3.state.query && _this3.state.query.trim() == key) {
            hasPerfectMatch = true;
          }
          var onMouseDown = target ? _this3.select.bind(null, target) : _this3.select;
          return _react2.default.createElement(
            'li',
            {
              id: key,
              key: key,
              className: className,
              onMouseDown: onMouseDown,
              onMouseEnter: _this3.handleSuggestionMouseEnter,
              onMouseLeave: _this3.handleSuggestionMouseLeave
            },
            _this3.props.template ? _this3.props.template(value) : value
          );
        });
        var customClassName = (0, _classnames8.default)(theme.suggestion, _defineProperty({}, theme.active, this.state.active === this.state.query));
        var target = this.props.allowCreate ? this.state.query : null;
        var onMouseDown = target ? this.select.bind(null, target) : this.select;
        if (!hasPerfectMatch && this.state.query) {
          suggestions = [_react2.default.createElement(
            'li',
            {
              id: this.state.query,
              key: this.state.query,
              className: customClassName,
              onMouseDown: onMouseDown,
              onMouseEnter: this.handleSuggestionMouseEnter,
              onMouseLeave: this.handleSuggestionMouseLeave
            },
            this.props.template(this.state.query, true)
          )].concat(suggestions);
        }
        var className = (0, _classnames8.default)(theme.suggestions, _defineProperty({}, theme.up, this.state.direction === 'up'));
        return _react2.default.createElement(
          'ul',
          { ref: 'suggestions', className: className },
          suggestions
        );
      }
    }, {
      key: 'renderTemplateValue',
      value: function renderTemplateValue(value) {
        var _classnames4;

        var theme = this.props.theme;

        var className = (0, _classnames8.default)(theme.templateField, (_classnames4 = {}, _defineProperty(_classnames4, theme.errored, this.props.error), _defineProperty(_classnames4, theme.disabled, this.props.disabled), _classnames4));

        return _react2.default.createElement(
          'div',
          { className: className, onClick: this.handleClick },
          this.props.label ? _react2.default.createElement(
            'label',
            { className: theme.label },
            this.props.label
          ) : null,
          _react2.default.createElement(
            'div',
            { className: theme.templateValue + ' ' + theme.value },
            'this.props.template(value);'
          ),
          this.props.error ? _react2.default.createElement(
            'span',
            { className: theme.error },
            this.props.error
          ) : null
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props = this.props;
        var allowCreate = _props.allowCreate;
        var error = _props.error;
        var label = _props.label;
        var source = _props.source;
        var suggestionMatch = _props.suggestionMatch;
        var selectedPosition = _props.selectedPosition;
        var showSuggestionsWhenValueIsSet = _props.showSuggestionsWhenValueIsSet;
        var theme = _props.theme;
        var template = _props.template;

        var other = _objectWithoutProperties(_props, ['allowCreate', 'error', 'label', 'source', 'suggestionMatch', 'selectedPosition', 'showSuggestionsWhenValueIsSet', 'theme', 'template']);

        var className = (0, _classnames8.default)(theme.autocomplete, _defineProperty({}, theme.focus, this.state.focus), this.props.className);
        var currentSuggestion = [].concat(_toConsumableArray(this.suggestions())).filter(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2);

          var key = _ref7[0];
          var value = _ref7[1];

          return value === _this4.state.query;
        })[0];
        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'autocomplete', className: className },
          this.props.selectedPosition === 'above' ? this.renderSelected() : null,
          _react2.default.createElement(Input, _extends({}, other, {
            ref: 'input',
            className: (0, _classnames8.default)(theme.input, _defineProperty({}, theme.hidden, template && this.state.query && !this.state.focus)),
            error: error,
            label: label,
            onBlur: this.handleQueryBlur,
            onChange: this.handleQueryChange,
            onFocus: this.handleQueryFocus,
            onKeyDown: this.handleQueryKeyDown,
            onKeyUp: this.handleQueryKeyUp,
            value: this.state.query })),
          template && this.state.query && !this.state.focus ? this.renderTemplateValue(this.state.query) : null,
          this.renderSuggestions(),
          this.props.selectedPosition === 'below' ? this.renderSelected() : null
        );
      }
    }]);

    return Autocomplete;
  }(_react.Component);

  Autocomplete.propTypes = {
    allowCreate: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    direction: _react.PropTypes.oneOf(['auto', 'up', 'down']),
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    label: _react.PropTypes.string,
    multiple: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    selectedPosition: _react.PropTypes.oneOf(['above', 'below']),
    showSuggestionsWhenValueIsSet: _react.PropTypes.bool,
    source: _react.PropTypes.any,
    suggestionMatch: _react.PropTypes.oneOf(['start', 'anywhere', 'word']),
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      autocomplete: _react.PropTypes.string,
      focus: _react.PropTypes.string,
      input: _react.PropTypes.string,
      label: _react.PropTypes.string,
      suggestion: _react.PropTypes.string,
      suggestions: _react.PropTypes.string,
      up: _react.PropTypes.string,
      value: _react.PropTypes.string,
      values: _react.PropTypes.string,
      field: _react.PropTypes.string,
      errored: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      error: _react.PropTypes.string
    }),
    value: _react.PropTypes.any,
    template: _react.PropTypes.func,
    customMatcher: _react.PropTypes.func,
    valueDisplayField: _react.PropTypes.string
  };
  Autocomplete.defaultProps = {
    allowCreate: false,
    className: '',
    direction: 'auto',
    selectedPosition: 'above',
    multiple: true,
    showSuggestionsWhenValueIsSet: false,
    source: {},
    suggestionMatch: 'start'
  };


  return Autocomplete;
};

var Autocomplete = factory(_Chip2.default, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.AUTOCOMPLETE)(Autocomplete);
exports.autocompleteFactory = factory;
exports.Autocomplete = Autocomplete;