import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Reorder from 'material-ui/svg-icons/action/reorder';
import IconButton from 'material-ui/IconButton';
import { browserHistory } from 'react-router';

export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  register = () => browserHistory.push('/');

  login = () => browserHistory.push('/');

  render() {
    return (
      <div>
        <div><IconButton
              iconClassName="material-icons"
              tooltip="Options"
              onClick={this.handleToggle}
              iconStyle={{color: 'white'}}
             >
              reorder
            </IconButton>
               </div>
        <Drawer width={200} openSecondary={true} open={this.state.open} containerStyle={{background: '#e7e7e7'}}>
          <AppBar title={this.props.title} onClick={this.handleToggle} style={{background: '#0E4583'}}/>
            <RaisedButton fullWidth={true} label={'Register'} style={{marginTop: '5px', marginBottom: '5px'}} onClick={this.register}/>
            <RaisedButton fullWidth={true} label={'Login'} onClick={this.login}/>
        </Drawer>
      </div>
    );
  }
}
