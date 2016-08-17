import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


// const customContentStyle = {
//   width: '100%',
//   maxWidth: 'none',
// };

export default class DialogExampleModal extends React.Component {
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
        onTouchTap={this.props.callin}
      />,
    ];

    return (
      <div>
        <FlatButton label={this.props.callinLabel} onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          // contentStyle={customContentStyle}
          open={this.state.open}
        >
          {this.props.dialog}
        </Dialog>
      </div>
    );
  }
}