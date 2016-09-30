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
			openPop: false,
			openClear: false,
			populateMethod: ''
		})
	},
	
	handleTouchTap: function(menu, event){
		event.preventDefault();
		console.log('on open', arguments);
	    this.setState({
	      [menu]: true,
	      anchorEl: event.currentTarget,
	    });
	},
	handleRequestClose: function(menu){
		console.log('on close', arguments);
		this.setState({
	      [menu]: false
	    });
	},
	closeClear: function(){
		this.setState({
			openClear: false
		})
	},
	
	autoFill: function(type){
		this.props.autoPopulate(type);
	},
	previous: function(){
		this.props.nextSchedule(-7);
	},
	next: function(){
		this.props.nextSchedule(7);
	},
	render: function(){
		return (
			<div className="monthLabel">
				<div className={"shiftStatus " + this.props.shiftColor}>
					<div className="shiftTitle">{this.props.shiftColor}</div>
				</div>

				<div className="navigate">

					<div className="leftButton" onClick={this.previous}><i className="fa fa-angle-left" aria-hidden="true"></i></div>

					<div className="weekLabel"> {this.props.weeklyCalendar[0].monthString} {this.props.weeklyCalendar[0].day}, {this.props.weeklyCalendar[0].year}   

							<span> - </span> 

						{this.props.weeklyCalendar[6].monthString} {this.props.weeklyCalendar[6].day}, {this.props.weeklyCalendar[6].year}
					</div> 
					<div className="rightButton" onClick={this.next}><i className="fa fa-angle-right" aria-hidden="true"></i></div>
				</div>

				<div className="printClearContainer">

					<FlatButton
			          onTouchTap={this.handleTouchTap.bind(this, 'openPop')}
			          label="Auto-populate"
			          primary={true}
			          style={{color: 'white', textShadow: '1px 1px 0px #000'}}
			        />
			        <Popover
			          open={this.state.openPop}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			          targetOrigin={{horizontal: 'left', vertical: 'top'}}
			          onRequestClose={this.handleRequestClose.bind(this, 'openPop')}
			        >
				        <Menu>
				            <div className="autoPop"> <MenuItem primaryText="Previous Week" onTouchTap={this.autoFill.bind(this, 'duplicate')}/> </div>
				            <div className="autoPop"><MenuItem primaryText="Random Stations" onTouchTap={this.autoFill.bind(this, 'station')} /> </div>
			          	</Menu>
			        </Popover>
			        

					<FlatButton 
						onTouchTap={this.handleTouchTap.bind(this, 'openClear')} 
						label="Clear All" 
						primary={true} 
						style={{color: 'white', textShadow: '1px 1px 0px #000'}} />

						<Popover
				          open={this.state.openClear}
				          anchorEl={this.state.anchorEl}
				          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				          targetOrigin={{horizontal: 'left', vertical: 'top'}}
				          onRequestClose={this.closeClear}
				        >
					        <Menu>
					            <div className="autoPop"> <MenuItem primaryText="Confirm Clear" onTouchTap={this.props.clear}/> </div>
				          	</Menu>
				        </Popover>
					<FlatButton label="Print" primary={true} onClick={this.props.printSchedule} style={{color: 'white', textShadow: '1px 1px 0px #000'}} />
				</div>
			</div>

				

					
		)
	}
})