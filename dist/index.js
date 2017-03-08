'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactBootstrapTypeahead = require('react-bootstrap-typeahead');

var _reactBootstrapTypeahead2 = _interopRequireDefault(_reactBootstrapTypeahead);

var _reactHighlighter = require('react-highlighter');

var _reactHighlighter2 = _interopRequireDefault(_reactHighlighter);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BomSelect = function (_React$Component) {
  _inherits(BomSelect, _React$Component);

  function BomSelect() {
    var _ref;

    var _this, _ret;

    _classCallCheck(this, BomSelect);

    var _temp;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BomSelect.__proto__ || Object.getPrototypeOf(BomSelect)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _react2.default.createElement(_reactBootstrap.InputGroup, { className: 'bomselect' }, _react2.default.createElement(_reactBootstrapTypeahead2.default, { ref: 'typeahead',
        options: _this.props.options,
        selected: _this.props.selected,
        renderMenuItemChildren: _this.renderChildren,
        onChange: _this.props.onChange,
        onInputChange: _this.props.onInputChange,
        onFocus: _this.onFocus,
        maxResults: 200,
        paginate: true,
        placeholder: _this.props.placeholder }), _react2.default.createElement(_reactBootstrap.InputGroup.Addon, { onClick: _this.props.onAddonClick }, _this.props.addon ? _this.props.addon : _react2.default.createElement('i', { className: 'fa fa-search', 'aria-hidden': 'true' })));
    }, _this.renderChildren = function (props, option, idx) {
      var searchString = props.text;
      var labeltext = option.label;
      return [_react2.default.createElement('div', { className: 'row', key: idx }, _react2.default.createElement(_reactHighlighter2.default, { style: { marginLeft: 3 }, search: searchString }, labeltext))];
    }, _this.onFocus = function (e) {
      e.target.setSelectionRange(0, e.target.value.length);
    }, _this.handleKeydown = function (options, e) {
      var keycodes = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      var typeahead = _this.refs.typeahead.getInstance();
      var activeIndex = typeahead.state.activeIndex;
      switch (e.keyCode) {
        case keycodes.UP:
        case keycodes.DOWN:
          // Don't cycle through the options if the menu is hidden.
          if (!typeahead.state.showMenu) {
            return;
          }
          // Prevents input cursor from going to the beginning when pressing up.
          e.preventDefault();
          // Increment or decrement index based on user keystroke.
          activeIndex += e.keyCode === keycodes.UP ? -1 : 1;
          // If we've reached the end, go back to the beginning or vice-versa.
          if (activeIndex === options.length) {
            activeIndex = -1;
          } else if (activeIndex === -2) {
            activeIndex = options.length - 1;
          }
          typeahead.setState({ activeIndex: activeIndex });
          break;
        case keycodes.ESC:
        case keycodes.TAB:
          typeahead._hideDropdown();
          break;
        case keycodes.RETURN:
          // Prevent submitting forms.
          e.preventDefault();
          if (typeahead.state.showMenu) {
            typeahead._handleAddOption(options[activeIndex] || options[0]);
          }
          break;
        default:
          break;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BomSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.typeahead.getInstance()._handleKeydown = this.handleKeydown;
    }
  }]);

  return BomSelect;
}(_react2.default.Component);

exports.default = BomSelect;