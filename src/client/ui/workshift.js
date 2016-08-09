import React from 'react';
import store from 'store';
import { v4 } from 'uuid';
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
	getInitialState: function(){
		return {
			station: '',
			shifts: shiftTimes,
			starting_time: ''
		}
	},
	handleStationChange: function(e, index, value){
		if(value !== 1001) {
			this.setState({
				station: value
			})
		} else {
			store.dispatch({
				type: 'SHOW_SETTINGS',
				showSettings: true
			})
		}

		
	},
	handleTimeChange: function(component, index, value){
		if(value !== 1001) {
			this.setState({
				starting_time: value	
			}) 
		} else {
			store.dispatch({
				type: 'SHOW_SETTINGS',
				showSettings: true
			})
		}

		
		console.log('value', arguments, this.props.day.calendar_date)

		// sendSingleEmployeeShiftObj([{
		// 	day: shift.calendar_date,
		// 	employee: shift.employee.id,
		// 	starting_time: value
		// 	// ,
		// 	// station: this.refs.station.value
			
		// }])
	},
	render: function(){
		return (
			<div>
				<div style={{height: '45px'}}>			
					<SelectField
						key={v4()}
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

						<MenuItem key={v4()} value={1000} primaryText="Day Off" />
						<MenuItem key={v4()} value={1001} primaryText="Add Shift" />

					</SelectField>  
				</div>

				<div style={{height: '45px'}}>
					<SelectField 
						key={v4()}
					 	fullWidth={true}
						value={this.state.station} 
						onChange={this.handleStationChange} 
						style={{height: '42px', top: '-15px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px'}}
						labelStyle={{lineHeight: '25px', top: '10px'}}>


						{this.props.areas.map(function(item, i){
							return (
								<MenuItem key={v4()} value={item.id} primaryText={item.title} />
							)
						}.bind(this))}

						<MenuItem key={v4()} value={1001} primaryText="Add Location" />

		        	</SelectField> 
	        	</div>
			</div>
		)
	}
})






// render: function(){
// 		return (
// 			<div className='eachDay' id={'date_' + this.props.day.calendar_date + '_id_' + this.props.employee.id}>
// 				<div style={{height: '45px'}}>
// 					{this.props.weekShifts.map(function(shift, num){
// 						if(this.props.day.calendar_date === shift.calendar_date && this.props.employee.id === shift.employee.id){
// 							return(
// 								<div>
// 									<SelectField
// 										key={v4()}
// 										fullWidth={true} 
// 										value={this.state.starting_time} 
// 										hintText={shift.string_rep}
// 										hintStyle={{color: 'black', textTransform: 'lowercase'}}
// 										onChange={this.handleTimeChange.bind(this, shift)} 
// 										style={{height: '42px', top: '-3px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px'}}
// 										labelStyle={{lineHeight: '25px', top: '10px'}}>
										

// 										{this.state.shifts.map(function(item, i){
// 											return (
// 												<MenuItem key={v4()} value={item.starting_time} primaryText={item.title} />
// 											)
// 										}.bind(this))}

// 										<MenuItem key={v4()} value={4} primaryText="New Shift" />

// 									</SelectField>  
// 								</div>
// 								)
// 						} 
// 					}.bind(this))}
// 				</div>
// 				<div style={{height: '45px'}}>
// 					<SelectField 
// 						key={v4()}
// 					 	fullWidth={true}
// 						value={this.state.station} 
// 						onChange={this.handleStationChange} 
// 						style={{height: '42px', top: '-15px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px'}}
// 						labelStyle={{lineHeight: '25px', top: '10px'}}>


// 						{this.props.areas.map(function(item, i){
// 							return (
// 								<MenuItem key={v4()} value={item.id} primaryText={item.title} />
// 							)
// 						}.bind(this))}

// 		        	</SelectField> 
// 	        	</div>
// 			</div>
// 		)
// 	}
// })