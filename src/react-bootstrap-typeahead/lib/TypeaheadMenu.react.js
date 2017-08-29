'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _reactHighlighter = require('react-highlighter');

var _reactHighlighter2 = _interopRequireDefault(_reactHighlighter);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./Menu.react');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('./MenuItem.react');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _getOptionLabel = require('./utils/getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeaheadMenu = _react2.default.createClass({
  displayName: 'TypeaheadMenu',

  /**
   * In addition to the propTypes below, the following props are automatically
   * passed down by `Typeahead.react`:
   *
   *  - activeIndex
   *  - labelKey
   *  - onClick
   *  - onPaginate
   *  - options
   *  - paginate
   *  - text
   */
  propTypes: {
    /**
     * Provides the ability to specify a prefix before the user-entered text to
     * indicate that the selection will be new. No-op unless `allowNew={true}`.
     */
    newSelectionPrefix: _react.PropTypes.string,
    /**
     * Provides a hook for customized rendering of menu item contents.
     */
    renderMenuItemChildren: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      newSelectionPrefix: 'New selection: '
    };
  },
  render: function render() {
    var menuProps = (0, _pick3.default)(this.props, ['align', 'emptyLabel', 'maxHeight', 'onPaginate', 'paginate', 'paginationText']);

    return _react2.default.createElement(
      _Menu2.default,
      menuProps,
      this.props.options.map(this._renderMenuItem)
    );
  },
  _renderMenuItem: function _renderMenuItem(option, idx) {
    var _props = this.props;
    var activeIndex = _props.activeIndex;
    var labelKey = _props.labelKey;
    var newSelectionPrefix = _props.newSelectionPrefix;
    var _onClick = _props.onClick;
    var renderMenuItemChildren = _props.renderMenuItemChildren;
    var text = _props.text;


    var menuItemProps = {
      active: idx === activeIndex,
      key: idx,
      onClick: function onClick() {
        return _onClick(option);
      }
    };

    if (option.customOption) {
      return _react2.default.createElement(
        _MenuItem2.default,
        menuItemProps,
        newSelectionPrefix,
        _react2.default.createElement(
          _reactHighlighter2.default,
          { search: text },
          option[labelKey]
        )
      );
    }

    return renderMenuItemChildren ? _react2.default.createElement(
      _MenuItem2.default,
      menuItemProps,
      renderMenuItemChildren(this.props, option, idx)
    ) : _react2.default.createElement(
      _MenuItem2.default,
      menuItemProps,
      _react2.default.createElement(
        _reactHighlighter2.default,
        { search: text },
        (0, _getOptionLabel2.default)(option, labelKey)
      )
    );
  }
});

exports.default = TypeaheadMenu;