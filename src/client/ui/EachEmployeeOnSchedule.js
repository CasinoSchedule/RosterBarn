import React from 'react';
import store from 'store';
import { setNewSchedule, sendEmployeeShiftObj } from 'api/data';

require('assets/styles/employeeToSchedule.scss');

export default React.createClass({
	getInitialState: function() {
		return {
			starting_time: this.props.thing.starting_time
		}
	},
	handleChange: function(e){
		var uniqueId = this.props.thing.uniqueId;

		this.setState({
			starting_time: this.refs.starting_time.value
		});

		setNewSchedule(uniqueId, this.props.sched, {
			id: this.props.thing.id,
			name: this.props.thing.name,
			calendar_date: this.props.thing.calendar_date,
			employee_id: this.props.thing.employee_id,
			uniqueId: this.props.thing.uniqueId,
			starting_time: this.refs.starting_time.value
		});

		// sendEmployeeShiftObj([{
		// 	starting_time: this.refs.starting_time.value,
		// 	day: this.props.thing.calendar_date,
		// 	employee: this.props.thing.id

		// }])
		
	},
	render: function(){
		return (
				
					<div key={this.props.index} className="eachDay">
						
							<div className={this.props.thing.classInfoName} id="test">
							{this.props.thing.nameString}
							{!(this.props.thing.nameString) ? <input onChange={this.handleChange} type="text" ref="starting_time" value={this.state.starting_time} /> : ""}
							</div>
						
					</div>
				
		)
	}
})