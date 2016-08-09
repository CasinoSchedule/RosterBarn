import React from 'react';
import store from 'store';
import { setNewSchedule, sendSingleEmployeeShiftObj} from 'api/data';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import {v4} from 'uuid';


require('assets/styles/eachEmployeeOnSchedule.scss');


const shiftTimes = [
						{title: '3am to 11am', starting_time: '03:00:00'},
						{title: '4am to 12pm', starting_time: '04:00:00'},
						{title: '5am to 1pm', starting_time: '05:00:00'},
						{title: '6am to 2pm', starting_time: '06:00:00'},
						{title: '7am to 3pm', starting_time: '07:00:00'},
						{title: '8am to 4pm', starting_time: '08:00:00'}, 
						{title: '9am to 5pm', starting_time: '09:00:00'}, 
						{title: '10am to 6pm', starting_time: '10:00:00'},
						{title: '11am to 7pm',  starting_time: '11:00:00'}, 
						{title: '12pm to 8pm', starting_time: '12:00:00'},
						{title: '11pm to 7am', starting_time: '23:00:00'},
						{title: '12:30am to 8:30am', starting_time: '00:30:00'}
					];

export default React.createClass({
	getInitialState: function() {
			return {
				employee: this.props.employee,
				areas: this.props.areas,
				weekShifts: this.props.weekShifts,
				day: this.props.day,
				shifts: shiftTimes,
				starting_time: ''
			}
	},
	handleBlur: function(e){
	
		this.setState({
			starting_time: this.refs.starting_time.value,
			station: this.refs.station.value
		});

		sendSingleEmployeeShiftObj([{
			day: this.props.day.calendar_date,
			employee: this.props.employee.id,
			starting_time: this.refs.starting_time.value	
		}])
		
	},
	handleChange: function(e) {
		// var value = e.target.value;
		// console.log('Hit handleChange');
		this.setState({
			starting_time: this.refs.starting_time.value,
			nameString: this.state.nameString,
			station: this.refs.station.value
		})
		store.dispatch({
			type: 'CHANGE_PUBLISHBUTTON',
			publishButton: "publish"
		})
	},
	handleStationChange: function(e, index, value){
		this.setState({
			station: value
		})
	},
	handleTimeChange: function(e, index, value){
		this.setState({
			starting_time: value
		})
	},
	handleClick: function(e){
		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: true
		})

		store.dispatch({
			type: 'THROW_EMPLOYEEINFO',
			employeeInfo: this.props.employee
		})
	},
	
	render: function(){	
		return (
				<div className="eachDay">
							
					<div className="timeLocationBox timefield">

						<SelectField
							fullWidth={true} 
							value={this.state.starting_time} 
							onChange={this.handleTimeChange} 
							style={{height: '42px', top: '-3px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px'}}
							labelStyle={{lineHeight: '25px', top: '10px'}}>
							

							{this.state.shifts.map(function(item, i){
								return (
									<MenuItem key={v4()} value={item.starting_time} primaryText={item.title} />
								)
							}.bind(this))}
						
							<MenuItem key={v4()} value={4} primaryText="New Shift" />

			        	</SelectField> 

						 <SelectField 
						 	fullWidth={true}
							value={this.state.station} 
							hintText={this.state.station}
							onChange={this.handleStationChange} 
							style={{height: '42px', top: '-15px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px'}}
							labelStyle={{lineHeight: '25px', top: '10px'}}>


							{this.props.areas.map(function(item, i){
								return (
									<MenuItem key={v4()} value={item.id} primaryText={item.title} />
								)
							}.bind(this))}

					        </SelectField> 

						</div>

						{this.props.weekShifts.map(function(shift, index) {
							if(this.props.day.calendar_date === shift.calendar_date && this.props.employee.id === shift.employee.id){
								return (
								<div key={v4( )}>{shift.starting_time}</div>
								)
							}
						}.bind(this))}
				</div>
		)
	}
})
