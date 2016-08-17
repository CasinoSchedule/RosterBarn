import React from 'react';
import store from 'store';
import { v4 } from 'uuid';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { sendSingleEmployeeShiftObj } from 'api/data'


require('assets/styles/workshift.scss');

export default React.createClass({
	getInitialState: function(){
		return {
			area: this.props.area || '',
			shifts: this.props.shiftStrings,
			starting_time: this.props.shift,
		}
	},
	componentDidMount: function(){
		// console.log(this.props.starting_time)
	}, 
	handleTimeChange: function(component, index, value){

		if(value === 1001){
			store.dispatch({
				type: 'SHOW_SETTINGS',
				showSettings: true
			})
		} else if(value === 1002){
			sendSingleEmployeeShiftObj([{
				day: this.props.eachday.calendar_date,
				employee: this.props.employee.id,
				starting_time: '',
				area: ''
				
			}])

			this.setState({
				starting_time: '',
				area: ''
			})
		} else {
			this.setState({
				starting_time: value	
			}) 

			sendSingleEmployeeShiftObj([{
				day: this.props.eachday.calendar_date,
				employee: this.props.employee.id,
				starting_time: value,
				area: this.state.area || ''
			
			}])
			
		}
	},
	
	handleAreaChange: function(e, index, value){
		if(value !== 1001) {
			this.setState({
				area: value
			})
		} else {
			store.dispatch({
				type: 'SHOW_SETTINGS',
				showSettings: true
			})
		}
	
		if(value !== 1001 && (this.state.starting_time)){
			
			sendSingleEmployeeShiftObj([{
				day: this.props.eachday.calendar_date,
				employee: this.props.employee.id,
				starting_time: this.state.starting_time,
				area: value
				
			}])
		}
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
						style={{height: '42px', top: '-3px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px', width: '120px'}}
						labelStyle={{lineHeight: '25px', top: '10px'}}
						menuStyle={{width: '180px'}}>
						

						{this.props.shiftStrings.map(function(item, i){
							return (
								<MenuItem key={v4()} value={item.starting_time} primaryText={item.string_rep} />
							)
						}.bind(this))}

						<MenuItem key={v4()} value={1000} primaryText="Day Off" />
						<MenuItem key={v4()} value={1001} primaryText="Add Shift" />
						<MenuItem key={v4()} value={1002} primaryText="Clear Shift" />

					</SelectField>  
				</div>

				<div style={{height: '45px'}}>
					<SelectField 
						key={v4()}
					 	fullWidth={true}
						value={this.state.area} 
						onChange={this.handleAreaChange} 
						style={{height: '42px', top: '-15px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', paddingLeft: '10px', width: '120px'}}
						labelStyle={{lineHeight: '25px', top: '10px'}}
						menuStyle={{width: '180px'}}>


						{this.props.areas.map(function(item, i){
							return (
								<MenuItem key={v4()} value={item.id} primaryText={item.title} />
							)
						}.bind(this))}

						<MenuItem key={v4()} value={1001} primaryText="Add/Delete Location" />

		        	</SelectField> 
	        	</div>
			</div>
		)
	}
})
