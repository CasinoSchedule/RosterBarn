import React from 'react';
import store from 'store';
import { setNewSchedule, sendSingleEmployeeShiftObj} from 'api/data';
import TimePicker from 'material-ui/TimePicker';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


require('assets/styles/eachEmployeeOnSchedule.scss');


const dataSource2 = ['Poker', 'Bacc', 'Main'];

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
				areas: this.props.areas
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
	handleSelectChange: function(e, index, value){
		this.setState({
			value
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
											{/* <div><input onChange={this.handleChange} onBlur={this.handleBlur} ref="starting_time" defaultValue={this.props.thing.starting_time} /></div> */}

											<TimePicker
												id="time"
												format="ampm" 
												style={{height: '30px', lineHeight: '30px', width: '100px'}}
												textFieldStyle={{height: '40px', lineHeight: '40px', width: '100px', fontSize: '13px', top: '-8px', fontWeight: '500', paddingLeft: '10px'}}
												value={this.state.timevalue}
												defaultTime={this.state.default}
          										onChange={this.handleChangeTimePicker}  
          										onShow={this.handleFocus} />

          									<SelectField 
          										value={this.state.value} 
          										hintText={this.state.station}
          										onChange={this.handleSelectChange} 
          										style={{height: '45px', top: '-18px', width: '100px', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', whiteSpace: 'nowrap', paddingLeft: '10px'}}
          										labelStyle={{lineHeight: '35px', top: '10px'}}
          										menuStyle={{width: '130px'}}>

          										{this.props.areas.map(function(item, i){
          											return (
          												<MenuItem key={i} value={item.id} primaryText={item.title} />
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