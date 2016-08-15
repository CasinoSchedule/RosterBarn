import React from 'react';
import store from 'store';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

require("assets/styles/adminWeekHeader.scss");

export default React.createClass({
	getInitialState: function(){
		return ({
			open: false,
			populateMethod: ''
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				open: false,
				populateMethod: ''
			})
		}.bind(this));
	},
	handleTouchTap: function(event){
		event.preventDefault();

	    this.setState({
	      open: true,
	      anchorEl: event.currentTarget,
	    });
	},
	handleRequestClose: function(){
		this.setState({
	      open: false,
	    });
	},
	duplicate: function(){
		this.props.autoPopulate('duplicate');
	},
	stationPopulate: function(){
		this.props.autoPopulate('station');
	},
	render: function(){
		return (
			<div className="monthLabel">
				<div className={"shiftStatus " + this.props.shiftColor}>
					<div className="shiftTitle">{this.props.shiftColor}</div>
				</div>

				<div className="navigate">
					<div className="leftButton" onClick={this.props.previousSchedule}><i className="fa fa-angle-left" aria-hidden="true"></i></div>

					<div className="weekLabel"> {this.props.weeklyCalendar[0].monthString} {this.props.weeklyCalendar[0].day}, {this.props.weeklyCalendar[0].year}   

							<span> - </span> 

						{this.props.weeklyCalendar[6].monthString} {this.props.weeklyCalendar[6].day}, {this.props.weeklyCalendar[6].year}
					</div> 
					<div className="rightButton" onClick={this.props.nextSchedule}><i className="fa fa-angle-right" aria-hidden="true"></i></div>
				</div>


				<div className="printClearContainer">

					<FlatButton
			          onTouchTap={this.handleTouchTap}
			          label="Auto-populate"
			          primary={true}
			          style={{color: 'white', textShadow: '1px 1px 0px #000'}}
			        />
			        <Popover
			          open={this.state.open}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			          targetOrigin={{horizontal: 'left', vertical: 'top'}}
			          onRequestClose={this.handleRequestClose}
			        >
			        <Menu>
			            <div className="autoPop"> <MenuItem primaryText="Previous Week" onTouchTap={this.duplicate}/> </div>
			            <div className="autoPop"><MenuItem primaryText="Random Stations" onTouchTap={this.stationPopulate} /> </div>
			          </Menu>
			        </Popover>
			        

					<FlatButton label="Clear" primary={true} onClick={this.props.confirmClear} style={{color: 'white', textShadow: '1px 1px 0px #000'}} />
					<FlatButton label="Print" primary={true} onClick={this.props.printSchedule} style={{color: 'white', textShadow: '1px 1px 0px #000'}} />
				</div>
			</div>

				

					
		)
	}
})