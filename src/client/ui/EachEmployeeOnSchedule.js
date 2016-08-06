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

const dataSource1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const dataSource2 = ['Poker', 'Bacc', 'Main'];
const ampm = ['am', 'pm'];
const shiftTimes = [
						{title: '12am to 8am', starting_time: '00:00'}, 
						{title: '12:45am to 8:45am', starting_time: '00:45'}, 
						{title: '1am to 9am', starting_time: '01:00'},
						{title: '1:15am to 9:15am',  starting_time: '01:15'}, 
						{title: '1:30am to 9:30am', starting_time: '01:30'}
						];

export default React.createClass({
	getInitialState: function() {
		const d = new Date();
		d.setTime(this.props.thing.epoch_milliseconds)
		const shiftTime = ((this.props.thing.epoch_milliseconds > 0) ? d : null)
			return {
				thing: this.props.thing,
				starting_time: this.props.thing.starting_time,
				nameString: this.props.thing.nameString,
				id: this.props.thing.id,
				photo_url: this.props.thing.photo_url,
				availability: this.props.thing.availability,
				station: this.props.thing.station,
				val: this.props.thing.val || "",
				value: this.props.thing.station,
				default: shiftTime,
				areas: this.props.areas,
				shifts: shiftTimes
			}
	},
	handleBlur: function(e){
		var uniqueId = this.props.thing.uniqueId;

		this.setState({
			starting_time: this.refs.starting_time.value,
			station: this.refs.station.value
		});

		sendSingleEmployeeShiftObj([{
			day: this.props.thing.calendar_date,
			employee: this.props.thing.id,
			starting_time: this.refs.starting_time.value
			// ,
			// station: this.refs.station.value
			
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
			timeValue: value
		})
	},
	handleClick: function(e){
		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: true
		})

		store.dispatch({
			type: 'THROW_EMPLOYEEINFO',
			employeeInfo: this.props.thing
		})
	},
	handleChangeTimePicker: function(e, date){
		const time = date.getHours() + ":" + date.getMinutes();
		sendSingleEmployeeShiftObj([{
			day: this.props.thing.calendar_date,
			employee: this.props.thing.id,
			starting_time: time
			// ,
			// station: this.refs.station.value
			
		}])
	},
	handleFocus: function(args){
		console.log('args', arguments)
	},	
	render: function(){
		return (
				
					<div className="eachDay">
						
							<div className={this.props.thing.classInfoName}>
								{(this.props.thing.nameString) 
									? 	<div className="nameImageBox">
											<div><img src={this.props.thing.photo_url} onClick={this.handleClick} /></div>
											<div className="nameIdBox">
												<div className={this.props.thing.nameFieldCss}>{this.props.thing.nameString}</div> 
												<div className="idNum">{this.props.thing.employee_id}</div>
											</div>
										</div>
									: ""}
								{!(this.props.thing.nameString) 
									? 	<div className={"timeLocationBox " + this.props.thing.val}>     {/* this.props.thing.val is 'timefield' in stylesheet */}

											{/* <div id='timeInputField' style={{display: 'flex', height: '35px'}}>
												<TextField 
													id='hour'
													hintText="hh"
													maxLength='2' 
													value={this.state.hour}
													style={{width: '22px', paddingLeft: '3px'}}
													inputStyle={{textAlign: 'right'}}
	          										onChange={this.handleTimeChange} />
													
												<span style={{paddingTop: '15px'}}>:</span>
												<TextField 
													id='minute'
													hintText="mm"
													maxLength='2' 
													style={{width: '22px', paddingLeft: '2px'}}
													value={this.state.minute}
	          										onChange={this.handleTimeChange} />
	          									<div style={{width: '45px', overflow: 'hidden', height: '30px', lineHeight: '30px'}}>
		          									<AutoComplete
		          										hintText="am"
												      floatingLabelText="ampm"
												      filter={AutoComplete.noFilter}
												      openOnFocus={true}
												      dataSource={ampm}
												      style={{paddingLeft: '2px'}}
												    />
											    </div>
											  </div>

											<div><input onChange={this.handleChange} onBlur={this.handleBlur} ref="starting_time" defaultValue={this.props.thing.starting_time} /></div> */}

											{/* <TimePicker
												id="time"
												format="ampm" 
												style={{height: '30px', lineHeight: '30px', width: '100px'}}
												textFieldStyle={{height: '40px', lineHeight: '40px', width: '100px', fontSize: '13px', top: '-8px', fontWeight: '500', paddingLeft: '10px'}}
												value={this.state.timevalue}
												defaultTime={this.state.default}
          										onChange={this.handleChangeTimePicker}  
          										onShow={this.handleFocus} /> */}


          									<SelectField
          										fullWidth={true} 
          										value={this.state.timeValue} 
          										onChange={this.handleTimeChange} 
          										style={{height: '42px', top: '-3px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', whiteSpace: 'nowrap', paddingLeft: '10px'}}
          										labelStyle={{lineHeight: '25px', top: '10px'}}>
          										

          										{this.state.shifts.map(function(item, i){
          											return (
          												<MenuItem key={v4()} value={item.starting_time} primaryText={item.title} />
          											)
          										}.bind(this))}
										

									        </SelectField> 

          									 <SelectField 
          									 	fullWidth={true}
          										value={this.state.station} 
          										hintText={this.state.station}
          										onChange={this.handleStationChange} 
          										style={{height: '42px', top: '-15px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', whiteSpace: 'nowrap', paddingLeft: '10px'}}
          										labelStyle={{lineHeight: '25px', top: '10px'}}>

          										{this.props.areas.map(function(item, i){
          											return (
          												<MenuItem key={v4()} value={item.title} primaryText={item.title} />
          											)
          										}.bind(this))}
										

									        </SelectField> 

											{/* <div><input onChange={this.handleChange} onBlur={this.handleBlur} ref="station" defaultValue={this.props.thing.station} className="locationStyle "/></div> */}
										</div>
									: ""}
							</div>

					</div>
				
		)
	}
})