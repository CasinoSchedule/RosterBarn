import React from 'react';
import store from 'store';
import { setNewSchedule, sendEmployeeShiftObj, addEmployee, updateEmployee } from 'api/data';

require('assets/styles/employeeToSchedule.scss');

export default React.createClass({
	getInitialState: function() {
		return {
			starting_time: this.props.thing.starting_time,
			nameString: this.props.thing.nameString,
			first_name: this.props.thing.first_name,
			last_name: this.props.thing.last_name,
			id: this.props.thing.id
		}
	},
	handleBlur: function(e){
		var uniqueId = this.props.thing.uniqueId;

		this.setState({
			starting_time: this.refs.starting_time.value
		});

		// setNewSchedule(uniqueId, this.props.sched, {
		// 	id: this.props.thing.id,
		// 	name: this.props.thing.name,
		// 	calendar_date: this.props.thing.calendar_date,
		// 	employee_id: this.props.thing.employee_id,
		// 	uniqueId: this.props.thing.uniqueId,
		// 	starting_time: this.refs.starting_time.value
		// });
		
		sendEmployeeShiftObj([{
			starting_time: this.refs.starting_time.value,
			day: this.props.thing.calendar_date,
			employee: this.props.thing.id

		}])
		
	},
	handleChange: function(e) {
		var value = e.target.value;
		console.log('Hit handleChange');
		this.setState({
			starting_time: this.refs.starting_time.value,
			nameString: this.state.nameString
		})
		store.dispatch({
			type: 'CHANGE_PUBLISHBUTTON',
			publishButton: "publish"
		})
	},
	handleNameBlur: function(e){
		var val = this.refs.nameString.value.split(" ");
		// console.log(this.state.id, {
		// 	first_name: val[0], 
		// 	last_name: val[1],
		// 	regular_days_off: [1],
		// 	availability: [1]
		// });
		// updateEmployee(this.state.id, {
		// 	first_name: val[0], 
		// 	last_name: val[1],
		// 	regular_days_off: [1],
		// 	availability: [1]
		// });

	},
	render: function(){
		return (
				
					<div className="eachDay">
						
							<div className={this.props.thing.classInfoName} id="test">
							{(this.props.thing.nameString) 
								? <input type="text" ref="nameString" value={this.props.thing.nameString}  onChange={this.handleChange} onBlur={this.handleNameBlur} className={this.props.thing.classInfoName} /> 
								: ""}
							{!(this.props.thing.nameString) ? <input onChange={this.handleChange} onBlur={this.handleBlur} type="text" ref="starting_time" value={this.state.starting_time} /> : ""}
							</div>
						
					</div>
				
		)
	}
})