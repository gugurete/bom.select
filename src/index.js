import React from 'react';
import { InputGroup } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import Highlight from 'react-highlighter';
import './style.css';

export default class BomSelect extends React.Component {
  componentDidMount() {
    this.refs.typeahead.getInstance()._handleKeydown = this.handleKeydown;
  }
  render = () => (
    <InputGroup className='bomselect'>
      <Typeahead ref='typeahead'
                 options={this.props.options}
                 selected={this.props.selected}
                 renderMenuItemChildren={this.renderChildren}
                 onChange={this.props.onChange}
                 onInputChange={this.props.onInputChange}
                 onFocus={this.onFocus}
                 maxResults={200}
                 paginate={true}
                 placeholder={this.props.placeholder}/>
      <InputGroup.Addon onClick={this.props.onAddonClick}>
        {this.props.addon ? this.props.addon : <i className="fa fa-search" aria-hidden="true"></i>}
      </InputGroup.Addon>
    </InputGroup>
  )

  renderChildren = (props, option, idx) => {
    const searchString = props.text;
    const labeltext = option.label;
    return [
      <div className="row" key={idx}>
        <Highlight style={{marginLeft:3}} search={searchString}>{labeltext}</Highlight>
      </div>
    ];
  }

  onFocus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
  }

  handleKeydown = (options, e) => {
    const keycodes = {
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
    const typeahead = this.refs.typeahead.getInstance();
    let activeIndex = typeahead.state.activeIndex;
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
        typeahead.setState({ activeIndex });
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
  }
}
