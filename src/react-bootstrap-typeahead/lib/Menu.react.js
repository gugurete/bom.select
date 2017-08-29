'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuItem = require('./MenuItem.react');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseMenu = function BaseMenu(props) {
  return _react2.default.createElement(
    'ul',
    _extends({}, props, {
      className: (0, _classnames2.default)('dropdown-menu', props.className) }),
    props.children
  );
};

/**
 * Menu component that automatically handles pagination and empty state when
 * passed a set of filtered and truncated results.
 */
var Menu = _react2.default.createClass({
  displayName: 'Menu',

  propTypes: {
    /**
     * Specify menu alignment. The default value is `justify`, which makes the
     * menu as wide as the input and truncates long values. Specifying `left`
     * or `right` will align the menu to that side and the width will be
     * determined by the length of menu item values.
     */
    align: _react.PropTypes.oneOf(['justify', 'left', 'right']),
    /**
     * Message to display in the menu if there are no valid results.
     */
    emptyLabel: _react.PropTypes.string,
    /**
     * Maximum height of the dropdown menu, in px.
     */
    maxHeight: _react.PropTypes.number,
    /**
     * Prompt displayed when large data sets are paginated.
     */
    paginationText: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      align: 'justify',
      emptyLabel: 'No matches found.',
      maxHeight: 300,
      paginate: true,
      paginationText: 'Display additional results...'
    };
  },
  render: function render() {
    var _props = this.props;
    var align = _props.align;
    var children = _props.children;
    var className = _props.className;
    var emptyLabel = _props.emptyLabel;
    var maxHeight = _props.maxHeight;

    var contents = _react.Children.count(children) === 0 ? _react2.default.createElement(
      _MenuItem2.default,
      { disabled: true },
      emptyLabel
    ) : children;

    return _react2.default.createElement(
      BaseMenu,
      {
        className: (0, _classnames2.default)('bootstrap-typeahead-menu', {
          'dropdown-menu-justify': align === 'justify',
          'dropdown-menu-right': align === 'right'
        }, className),
        style: {
          maxHeight: maxHeight + 'px',
          overflow: 'auto'
        } },
      contents,
      this._renderPaginationMenuItem()
    );
  },


  /**
   * Allow user to see more results, if available.
   */
  _renderPaginationMenuItem: function _renderPaginationMenuItem() {
    var _props2 = this.props;
    var children = _props2.children;
    var onPaginate = _props2.onPaginate;
    var paginate = _props2.paginate;
    var paginationText = _props2.paginationText;


    if (paginate && _react.Children.count(children)) {
      return [_react2.default.createElement('li', {
        className: 'divider',
        key: 'pagination-item-divider',
        role: 'separator'
      }), _react2.default.createElement(
        _MenuItem2.default,
        {
          className: 'bootstrap-typeahead-menu-paginator',
          key: 'pagination-item',
          onClick: onPaginate },
        paginationText
      )];
    }
  }
});

exports.default = Menu;