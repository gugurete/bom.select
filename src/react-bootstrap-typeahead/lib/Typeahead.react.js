'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TokenizerInput = require('./TokenizerInput.react');

var _TokenizerInput2 = _interopRequireDefault(_TokenizerInput);

var _TypeaheadInput = require('./TypeaheadInput.react');

var _TypeaheadInput2 = _interopRequireDefault(_TypeaheadInput);

var _TypeaheadMenu = require('./TypeaheadMenu.react');

var _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);

var _addCustomOption = require('./utils/addCustomOption');

var _addCustomOption2 = _interopRequireDefault(_addCustomOption);

var _defaultFilterBy = require('./utils/defaultFilterBy');

var _defaultFilterBy2 = _interopRequireDefault(_defaultFilterBy);

var _getOptionLabel = require('./utils/getOptionLabel');

var _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);

var _getTruncatedOptions = require('./utils/getTruncatedOptions');

var _getTruncatedOptions2 = _interopRequireDefault(_getTruncatedOptions);

var _keyCode = require('./utils/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Remove once `paginateResults` is completely deprecated.
function getMaxResults(props) {
  var maxResults = props.maxResults;
  var paginateResults = props.paginateResults;

  // Use `maxResults` unless `paginateResults` is set.

  return paginateResults == null ? maxResults : paginateResults;
}

/**
 * Typeahead
 */
var Typeahead = _react2.default.createClass({
  displayName: 'Typeahead',

  propTypes: {
    /**
     * Allows the creation of new selections on the fly. Note that any new items
     * will be added to the list of selections, but not the list of original
     * options unless handled as such by `Typeahead`'s parent.
     */
    allowNew: _react.PropTypes.bool,
    /**
     * Specify any pre-selected options. Use only if you want the component to
     * be uncontrolled.
     */
    defaultSelected: _react.PropTypes.array,
    /**
     * Optional callback to use when filtering the options. The function will
     * receive each option as the first parameter.
     */
    filterBy: _react.PropTypes.func,
    /**
     * Specify which option key to use for display. By default, the selector
     * will use the `label` key.
     */
    labelKey: _react.PropTypes.string,
    /**
     * Maximum number of results to display by default. Mostly done for
     * performance reasons so as not to render too many DOM nodes in the case of
     * large data sets.
     */
    maxResults: _react.PropTypes.number,
    /**
     * Number of input characters that must be entered before showing results.
     */
    minLength: _react.PropTypes.number,
    /**
     * Whether or not multiple selections are allowed.
     */
    multiple: _react.PropTypes.bool,
    /**
     * Callback fired when the input is blurred. Receives an event.
     */
    onBlur: _react.PropTypes.func,
    /**
     * Callback fired whenever items are added or removed. Receives an array of
     * the selected options.
     */
    onChange: _react.PropTypes.func,
    /**
     * Callback fired when the input is focused. Receives an event.
     */
    onFocus: _react.PropTypes.func,
    /**
     * Callback for handling changes to the user-input text.
     */
    onInputChange: _react.PropTypes.func,
    /**
     * Full set of options, including pre-selected options.
     */
    options: _react.PropTypes.array.isRequired,
    /**
     * Give user the ability to display additional results if the number of
     * results exceeds `maxResults`.
     */
    paginate: _react.PropTypes.bool,
    /**
     * DEPRECATED. Use `maxResults` and `paginate` instead.
     */
    paginateResults: _react.PropTypes.number,
    /**
     * The selected option(s) displayed in the input. Use this prop if you want
     * to control the component via its parent.
     */
    selected: _react.PropTypes.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      allowNew: false,
      defaultSelected: [],
      labelKey: 'label',
      maxResults: 100,
      onBlur: _noop3.default,
      onChange: _noop3.default,
      onFocus: _noop3.default,
      onInputChange: _noop3.default,
      minLength: 0,
      multiple: false,
      paginate: true,
      selected: []
    };
  },
  getInitialState: function getInitialState() {
    var defaultSelected = this.props.defaultSelected;


    var selected = this.props.selected.slice();
    if (defaultSelected && defaultSelected.length) {
      selected = defaultSelected;
    }

    return {
      activeIndex: -1,
      selected: selected,
      showMenu: false,
      shownResults: getMaxResults(this.props),
      text: ''
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.paginateResults != null) {
      /* eslint-disable no-console */
      console.warn('Warning: The `paginateResults` prop is deprecated and will be ' + 'removed in an upcoming release. Use `maxResults` and `paginate` ' + 'instead.');
      /* eslint-enable no-console */
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var multiple = nextProps.multiple;
    var selected = nextProps.selected;


    if (!(0, _isEqual3.default)(selected, this.props.selected)) {
      // If new selections are passed in via props, treat the component as a
      // controlled input.
      this.setState({ selected: selected });
    }

    if (multiple !== this.props.multiple) {
      this.setState({ text: '' });
    }
  },
  render: function render() {
    var _props = this.props;
    var allowNew = _props.allowNew;
    var className = _props.className;
    var labelKey = _props.labelKey;
    var paginate = _props.paginate;
    var _state = this.state;
    var shownResults = _state.shownResults;
    var text = _state.text;

    // First filter the results by the input string.

    var results = this._getFilteredResults();

    // This must come before we truncate.
    var shouldPaginate = paginate && results.length > shownResults;

    // Truncate if necessary.
    results = (0, _getTruncatedOptions2.default)(results, shownResults);

    // Add the custom option.
    if (allowNew) {
      results = (0, _addCustomOption2.default)(results, text, labelKey);
    }

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('bootstrap-typeahead', 'open', className),
        style: { position: 'relative' } },
      this._renderInput(results),
      this._renderMenu(results, shouldPaginate)
    );
  },
  _getFilteredResults: function _getFilteredResults() {
    var _props2 = this.props;
    var labelKey = _props2.labelKey;
    var minLength = _props2.minLength;
    var multiple = _props2.multiple;
    var options = _props2.options;
    var _state2 = this.state;
    var selected = _state2.selected;
    var text = _state2.text;


    if (text.length < minLength) {
      return [];
    }

    // Filtering algorithm.
    var filterBy = this.props.filterBy;

    if (!filterBy) {
      filterBy = function filterBy(option) {
        return (0, _defaultFilterBy2.default)(option, labelKey, multiple, selected, text);
      };
    }

    return options.filter(filterBy);
  },
  blur: function blur() {
    this.refs.input.blur();
  },


  /**
   * Public method to allow external clearing of the input. Clears both text
   * and selection(s).
   */
  clear: function clear() {
    var _getInitialState = this.getInitialState();

    var activeIndex = _getInitialState.activeIndex;
    var showMenu = _getInitialState.showMenu;

    var selected = [];
    var text = '';

    this.setState({
      activeIndex: activeIndex,
      selected: selected,
      showMenu: showMenu,
      text: text
    });

    this.props.onChange(selected);
    this.props.onInputChange(text);
  },
  focus: function focus() {
    this.refs.input.focus();
  },
  _renderInput: function _renderInput(optionsToDisplay) {
    var _this = this;

    var _props3 = this.props;
    var disabled = _props3.disabled;
    var labelKey = _props3.labelKey;
    var multiple = _props3.multiple;
    var name = _props3.name;
    var placeholder = _props3.placeholder;
    var renderToken = _props3.renderToken;
    var _state3 = this.state;
    var activeIndex = _state3.activeIndex;
    var selected = _state3.selected;
    var text = _state3.text;

    var Input = multiple ? _TokenizerInput2.default : _TypeaheadInput2.default;
    var inputProps = { disabled: disabled, name: name, placeholder: placeholder, renderToken: renderToken };

    return _react2.default.createElement(Input, _extends({}, inputProps, {
      activeIndex: activeIndex,
      labelKey: labelKey,
      onAdd: this._handleAddOption,
      onBlur: this._handleBlur,
      onChange: this._handleTextChange,
      onFocus: this._handleFocus,
      onKeyDown: function onKeyDown(e) {
        return _this._handleKeydown(optionsToDisplay, e);
      },
      onRemove: this._handleRemoveOption,
      options: optionsToDisplay,
      ref: 'input',
      selected: selected.slice(),
      text: text
    }));
  },
  _renderMenu: function _renderMenu(optionsToDisplay, shouldPaginate) {
    var _props4 = this.props;
    var align = _props4.align;
    var emptyLabel = _props4.emptyLabel;
    var labelKey = _props4.labelKey;
    var maxHeight = _props4.maxHeight;
    var minLength = _props4.minLength;
    var newSelectionPrefix = _props4.newSelectionPrefix;
    var paginationText = _props4.paginationText;
    var renderMenuItemChildren = _props4.renderMenuItemChildren;
    var _state4 = this.state;
    var activeIndex = _state4.activeIndex;
    var showMenu = _state4.showMenu;
    var text = _state4.text;


    if (!(showMenu && text.length >= minLength)) {
      return null;
    }

    var menuProps = {
      align: align,
      emptyLabel: emptyLabel,
      maxHeight: maxHeight,
      newSelectionPrefix: newSelectionPrefix,
      paginationText: paginationText,
      renderMenuItemChildren: renderMenuItemChildren
    };

    return _react2.default.createElement(_TypeaheadMenu2.default, _extends({}, menuProps, {
      activeIndex: activeIndex,
      labelKey: labelKey,
      onClick: this._handleAddOption,
      onPaginate: this._handlePagination,
      options: optionsToDisplay,
      paginate: shouldPaginate,
      text: text
    }));
  },
  _handleBlur: function _handleBlur(e) {
    // Note: Don't hide the menu here, since that interferes with other actions
    // like making a selection by clicking on a menu item.
    this.props.onBlur(e);
  },
  _handleFocus: function _handleFocus(e) {
    this.props.onFocus(e);
    this.setState({ showMenu: true });
  },
  _handleTextChange: function _handleTextChange(text) {
    var _getInitialState2 = this.getInitialState();

    var activeIndex = _getInitialState2.activeIndex;

    this.setState({
      activeIndex: activeIndex,
      showMenu: true,
      text: text
    });

    this.props.onInputChange(text);
  },
  _handleKeydown: function _handleKeydown(options, e) {
    var activeIndex = this.state.activeIndex;


    switch (e.keyCode) {
      case _keyCode.UP:
      case _keyCode.DOWN:
        // Don't cycle through the options if the menu is hidden.
        if (!this.state.showMenu) {
          return;
        }

        // Prevents input cursor from going to the beginning when pressing up.
        e.preventDefault();

        // Increment or decrement index based on user keystroke.
        activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;

        // If we've reached the end, go back to the beginning or vice-versa.
        if (activeIndex === options.length) {
          activeIndex = -1;
        } else if (activeIndex === -2) {
          activeIndex = options.length - 1;
        }

        this.setState({ activeIndex: activeIndex });
        break;
      case _keyCode.ESC:
      case _keyCode.TAB:
        // Prevent closing dialogs.
        e.keyCode === _keyCode.ESC && e.preventDefault();

        this._hideDropdown();
        break;
      case _keyCode.RETURN:
        // Prevent submitting forms.
        e.preventDefault();

        if (this.state.showMenu) {
          var selected = options[activeIndex];
          selected && this._handleAddOption(selected);
        }
        break;
    }
  },
  _handleAddOption: function _handleAddOption(selectedOption) {
    var _props5 = this.props;
    var multiple = _props5.multiple;
    var labelKey = _props5.labelKey;
    var onChange = _props5.onChange;
    var onInputChange = _props5.onInputChange;


    var selected = void 0;
    var text = void 0;

    if (multiple) {
      // If multiple selections are allowed, add the new selection to the
      // existing selections.
      selected = this.state.selected.concat(selectedOption);
      text = '';
    } else {
      // If only a single selection is allowed, replace the existing selection
      // with the new one.
      selected = [selectedOption];
      text = (0, _getOptionLabel2.default)(selectedOption, labelKey);
    }

    this.setState({ selected: selected, text: text });
    this._hideDropdown();

    onChange(selected);
    onInputChange(text);
  },
  _handlePagination: function _handlePagination(e) {
    var shownResults = this.state.shownResults + getMaxResults(this.props);

    // Keep the input focused when paginating.
    this.focus();

    this.setState({ shownResults: shownResults });
  },
  _handleRemoveOption: function _handleRemoveOption(removedOption) {
    var selected = this.state.selected.slice();
    selected = selected.filter(function (option) {
      return !(0, _isEqual3.default)(option, removedOption);
    });

    // Make sure the input stays focused after the item is removed.
    this.focus();

    this.setState({ selected: selected });
    this._hideDropdown();

    this.props.onChange(selected);
  },


  /**
   * From `listensToClickOutside` HOC.
   */
  handleClickOutside: function handleClickOutside(e) {
    this._hideDropdown();
  },
  _hideDropdown: function _hideDropdown() {
    var _getInitialState3 = this.getInitialState();

    var activeIndex = _getInitialState3.activeIndex;
    var showMenu = _getInitialState3.showMenu;
    var shownResults = _getInitialState3.shownResults;

    this.setState({
      activeIndex: activeIndex,
      showMenu: showMenu,
      shownResults: shownResults
    });
  }
});

exports.default = (0, _reactOnclickoutside2.default)(Typeahead);