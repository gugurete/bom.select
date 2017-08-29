'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactInputAutosize = require('react-input-autosize');

var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

var _Token = require('./Token.react');

var _Token2 = _interopRequireDefault(_Token);

var _getOptionLabel = require('./utils/getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

var _keyCode = require('./utils/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TokenizerInput
 *
 * Accepts multiple selections from a Typeahead component and renders them as
 * tokens within an input.
 */
var TokenizerInput = _react2.default.createClass({
  displayName: 'TokenizerInput',

  /**
   * In addition to the propTypes below, the following props are automatically
   * passed down by `Typeahead.react`:
   *
   *  - activeIndex
   *  - labelKey
   *  - onAdd
   *  - onBlur
   *  - onChange
   *  - onClick
   *  - onFocus
   *  - onKeydown
   *  - onRemove
   *  - options
   *  - selected
   *  - text
   */
  propTypes: {
    /**
     * Whether to disable the input and all selections.
     */
    disabled: _react.PropTypes.bool,
    /**
     * Placeholder text for the input.
     */
    placeholder: _react.PropTypes.string,
    /**
     * Provides a hook for customized rendering of tokens when multiple
     * selections are enabled.
     */
    renderToken: _react.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      isFocused: false
    };
  },
  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var placeholder = _props.placeholder;
    var selected = _props.selected;
    var text = _props.text;


    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('bootstrap-tokenizer', 'clearfix', 'form-control', { 'focus': this.state.isFocused }),
        disabled: disabled,
        onClick: this._handleInputFocus,
        onFocus: this._handleInputFocus,
        style: {
          cursor: 'text',
          height: 'auto'
        },
        tabIndex: -1 },
      selected.map(this._renderToken),
      _react2.default.createElement(_reactInputAutosize2.default, {
        className: 'bootstrap-tokenizer-input',
        disabled: disabled,
        inputStyle: {
          backgroundColor: 'inherit',
          border: 0,
          boxShadow: 'none',
          cursor: 'inherit',
          outline: 'none',
          padding: 0
        },
        onBlur: this._handleBlur,
        onChange: this._handleChange,
        onFocus: this.props.onFocus,
        onKeyDown: this._handleKeydown,
        placeholder: selected.length ? null : placeholder,
        ref: 'input',
        type: 'text',
        value: text
      })
    );
  },
  blur: function blur() {
    this.refs.input.blur();
  },
  focus: function focus() {
    this._handleInputFocus();
  },
  _renderToken: function _renderToken(option, idx) {
    var _props2 = this.props;
    var disabled = _props2.disabled;
    var labelKey = _props2.labelKey;
    var onRemove = _props2.onRemove;
    var renderToken = _props2.renderToken;

    var onRemoveWrapped = function onRemoveWrapped() {
      return onRemove(option);
    };

    if (renderToken) {
      return renderToken(option, onRemoveWrapped, idx);
    }

    return _react2.default.createElement(
      _Token2.default,
      {
        disabled: disabled,
        key: idx,
        onRemove: onRemoveWrapped },
      (0, _getOptionLabel2.default)(option, labelKey)
    );
  },
  _handleBlur: function _handleBlur(e) {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  },
  _handleChange: function _handleChange(e) {
    this.props.onChange(e.target.value);
  },
  _handleKeydown: function _handleKeydown(e) {
    switch (e.keyCode) {
      case _keyCode.BACKSPACE:
        var inputNode = (0, _reactDom.findDOMNode)(this.refs.input);
        if (inputNode && inputNode.contains(document.activeElement) && !this.props.text) {
          // If the input is selected and there is no text, select the last
          // token when the user hits backspace.
          var sibling = inputNode.previousSibling;
          sibling && sibling.focus();
        }
        break;
    }

    this.props.onKeyDown(e);
  },
  _handleInputFocus: function _handleInputFocus(e) {
    if (this.props.disabled) {
      e.target.blur();
      return;
    }

    // If the user clicks anywhere inside the tokenizer besides a token,
    // focus the input.
    this.refs.input.focus();
    this.setState({ isFocused: true });
  }
});

exports.default = TokenizerInput;