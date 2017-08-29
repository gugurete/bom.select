'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _getOptionLabel = require('./getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default algorithm for filtering results.
 */
function defaultFilterBy(option, labelKey, multiple, selected, text) {
  var labelString = (0, _getOptionLabel2.default)(option, labelKey);
  return !(labelString.toLowerCase().indexOf(text.toLowerCase()) === -1 || multiple && (0, _find3.default)(selected, function (o) {
    return (0, _isEqual3.default)(o, option);
  }));
}

exports.default = defaultFilterBy;