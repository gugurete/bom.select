'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the display string from an option. Options can be the string
 * themselves, or an object with a defined display string. Anything else throws
 * an error.
 */
function getOptionLabel(option, labelKey) {
  var optionLabel = void 0;

  if (typeof option === 'string') {
    optionLabel = option;
  }

  if ((0, _isPlainObject3.default)(option)) {
    optionLabel = option[labelKey];
  }

  if (typeof optionLabel !== 'string') {
    throw new Error('One or more options does not have a valid label string. Please ' + 'check the `labelKey` prop to ensure that it matches the correct ' + 'option key and provides a string for filtering and display.');
  }

  return optionLabel;
}

exports.default = getOptionLabel;