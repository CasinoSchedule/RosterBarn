import React from 'react';
import store from 'store';
import { v4 } from 'uuid';
import Workshift from 'ui/workshift';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


const shiftTimes = [
		{title: '8am to 4pm', starting_time: '08:00:00'}, 
		{title: '9am to 5pm', starting_time: '09:00:00'}, 
		{title: '10am to 6pm', starting_time: '10:00:00'},
		{title: '11am to 7pm',  starting_time: '11:00:00'}, 
		{title: '12pm to 8pm', starting_time: '12:00:00'}
		];



export default React.createClass({
	
	componentDidMount: function(){
		this.props.weekShifts.map(function(shift, i){
			var idToMatch = 'date_' + shift.calendar_date + '_id_' + shift.employee.id;
			var shiftString = shift.string_rep;

			// console.log('Id to Match', idToMatch, shiftString)
			return (
				document.getElementById(idToMatch).innerHTML = '<div>' + shiftString + '<div>'
				)
		}.bind(this));
			
	},

	render: function(){
		return (
			<div style={{display: 'flex', width: '100%'}}>
				
				{this.props.weeklyCalendar.map(function(day, i){
					return(
						<div key={i} id={'date_' + day.calendar_date + '_id_' + this.props.employee.id} className='eachDay'>
							
						<Workshift 
							key={i}
							areas={this.props.areas}
							employee={this.props.employee}
							day={day}
							weekShifts={this.props.weekShifts} 
							shiftStrings={this.props.shiftStrings} />


						</div>
						)
				}.bind(this))}

			</div>
		)
	}
})





















{/*	<Workshift 
								key={i}
								areas={this.props.areas}
								employee={this.props.employee}
								day={day}
								weekShifts={this.props.weekShifts} 
								shiftStrings={this.props.shiftStrings} />   */}





