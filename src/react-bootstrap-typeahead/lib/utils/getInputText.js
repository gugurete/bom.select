'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _getOptionLabel = require('./getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getInputText(props) {
  var activeIndex = props.activeIndex;
  var labelKey = props.labelKey;
  var options = props.options;
  var selected = props.selected;
  var text = props.text;


  var selectedItem = !!selected.length && (0, _head3.default)(selected);
  if (selectedItem) {
    return (0, _getOptionLabel2.default)(selectedItem, labelKey);
  }

  if (activeIndex >= 0) {
    return (0, _getOptionLabel2.default)(options[activeIndex], labelKey);
  }

  return text;
}

exports.default = getInputText;