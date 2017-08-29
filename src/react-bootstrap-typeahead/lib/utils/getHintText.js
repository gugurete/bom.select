'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _getOptionLabel = require('./getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHintText(props, isFocused) {
  var activeIndex = props.activeIndex;
  var labelKey = props.labelKey;
  var options = props.options;
  var selected = props.selected;
  var text = props.text;

  var firstOption = (0, _head3.default)(options);
  var firstOptionString = firstOption && (0, _getOptionLabel2.default)(firstOption, labelKey);

  // Only show the hint if:
  if (
  // The input is focused.
  isFocused &&
  // The input contains text.
  !!text &&
  // None of the menu options are focused.
  activeIndex === -1 &&
  // There are no current selections.
  !selected.length &&
  // The input text corresponds to the beginning of the first option.
  firstOptionString && firstOptionString.toLowerCase().indexOf(text.toLowerCase()) === 0) {
    // Text matching is case-insensitive, so to display the hint correctly,
    // splice the input text with the rest of the actual string.
    return text + firstOptionString.slice(text.length, firstOptionString.length);
  }

  return '';
}

exports.default = getHintText;