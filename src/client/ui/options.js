import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class Options extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
        <FlatButton label="Options" style={{color: '#e7e7e7', fontFamily: 'Copperplate'}} onTouchTap={this.handleOpen} />
        <Dialog
          title="Options"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <RadioButtonGroup name="shipSpeed" label="Time Input Options">
            <RadioButton
              value="pick"
              label="Time Picker"
            />
            <RadioButton
              value="enter"
              label="Standard Time Entry"
            />
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}