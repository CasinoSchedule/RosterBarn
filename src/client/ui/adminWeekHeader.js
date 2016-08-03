import React from 'react';
import FlatButton from 'material-ui/FlatButton';

require("assets/styles/adminWeekHeader.scss");

export default React.createClass({
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
					<FlatButton label="Clear" primary={true} onClick={this.props.confirmClear} style={{color: 'white', textShadow: '1px 1px 0px #000'}} />
					<FlatButton label="Print" primary={true} onClick={this.props.printSchedule} style={{color: 'white', textShadow: '1px 1px 0px #000'}} />
				</div>

			</div>	

					
		)
	}
})