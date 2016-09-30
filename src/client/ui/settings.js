// import React from 'react';
// import store from 'store';
// import {v4} from 'uuid';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import AutoComplete from 'material-ui/AutoComplete';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import Divider from 'material-ui/Divider';
// import { getAreas, deleteArea, addArea, twelveToTwentyFour, addShiftString, deleteShiftString } from 'api/data';
// import FontIcon from 'material-ui/FontIcon';
// import ActionDelete from 'material-ui/svg-icons/action/delete';
// import IconButton from 'material-ui/IconButton';

// require("assets/styles/settings.scss");

// const hourRange = populateDropDown(1, 12);
// const minuteRange = populateDropDown(0, 59);

// function populateDropDown(start, end){
// 	const value = [];
// 	for(let i = start; i <= end; i++){
// 		const x = ((i.toString().length === 1) ? '0' + i.toString() : i.toString() )
// 		value.push(<MenuItem value={i} key={v4()} primaryText={x} />);
// 	}
// 	return value
// }

// const styles = {
//   general: {
//     top: '-5px', fontSize: '12px', fontWeight: '600', paddingLeft: '15px', marginTop: '15px'
//   },
//   label: {
   	
//   },
// };

// export default React.createClass({
// 	getInitialState: function(){
// 		return {
// 			startHour: '',
// 			startMinute: '',
// 			endHour: '',
// 			endMinute: '',
// 			ampm: '',
// 			pmam: '',
// 			areas: [],
// 			newArea: '',
// 			shift: this.props.shiftNum || 0
// 		}
// 	},
	
// 	handleStartHourChange: function(event, key, value){
// 		this.setState({
// 			startHour: value
// 		})
// 	},
// 	handleStartMinuteChange: function(event, key, value){
// 		this.setState({
// 			startMinute: value
// 		})
// 	},
// 	handleEndHourChange: function(event, key, value){
// 		this.setState({
// 			endHour: value
// 		})
// 	},
// 	handleEndMinuteChange: function(event, key, value){
// 		this.setState({
// 			endMinute: value
// 		})
// 	},
// 	handleAmPmChange: function(event, key, value){
// 		this.setState({
// 			ampm: value
// 		})
// 	},
// 	handlePmAmChange: function(event, key, value){
// 		this.setState({
// 			pmam: value
// 		})
// 	},
// 	handleShiftChange: function(event, key, value){
// 		this.setState({
// 			shift: value
// 		})
// 	},
// 	onEnterPress: function(e){
// 		if(e.keyCode === 13) {
// 			this.addNewArea();
// 		}
		
// 	},
// 	handleAreaChange: function(e){
// 		this.setState({
// 			newArea: e.target.id.value
// 		})
// 	},
// 	addNewShift: function(){
// 		const starthour = this.state.startHour.toString();
// 		const startminute = this.state.startMinute.toString();
// 		const ampm = this.state.ampm;
// 		const endhour = this.state.endHour.toString();
// 		const endminute = this.state.endMinute.toString();
// 		const pmam = this.state.pmam;
// 		const fullStartTime = twelveToTwentyFour(starthour, startminute, ampm);
// 		const fullEndTime = twelveToTwentyFour(endhour, endminute, pmam)
// 		const shift = this.state.shift;
// 		// function here to error check length

// 		addShiftString(
// 			{starting_time: fullStartTime, 
// 			 shift_category: ((this.state.shift) ? this.state.shift : 1)}
// 			 );	
// 		this.setState({
// 			startHour: '',
// 			startMinute: '',
// 			endHour: '',
// 			endMinute: '',
// 			ampm: '',
// 			pmam: '',
// 			shift: 0
// 		})
// 	},
// 	addNewArea: function(){
// 		var newAreaTitle = this.refs.newAreaToAdd.getValue();

// 		// component updates in function
// 		addArea({title: newAreaTitle, department: localStorage.getItem("departmentId")}); 

// 		this.setState({
// 			newArea: ''
// 		})
		

// 	},
// 	deleteAreaEntry: function(item){
// 		// component updates in function
// 		deleteArea(item.id);
		
// 	},
// 	deleteShiftEntry: function(item){
// 		// component updates in function
// 		deleteShiftString(item.id);
		
// 	},
// 	closeSettings: function(){
// 		store.dispatch({
// 			type: 'SHOW_SETTINGS',
// 			showSettings: false
// 		})
// 	},
// 	render: function(){
// 		console.log('shiftStrings', this.props.shiftStrings);
// 		return (
// 			<div>
// 				<div className='shade'></div>
// 			<div className='settingsBox'>

// 				<div className='settingsHeader'> Settings</div>
// 				<div className='settingsContainer'>
// 					<div className='shiftAdds'>
// 						<div>SHIFT TIMES</div>
// 					</div>
					
// 					<div className='shiftString'>
// 						<div className='inputBoxes'>
// 							<SelectField 
// 								id='startHour'
// 							 	fullWidth={true}
// 								value={this.state.startHour} 
// 								hintText='hour'
// 								onChange={this.handleStartHourChange}
// 								maxHeight={300} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								{hourRange}
// 				        	</SelectField> 
// 			        	</div>

// 			        	<div className='bridgeText'>:</div>

// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='startMinute'
// 							 	fullWidth={true}
// 								value={this.state.startMinute} 
// 								hintText='min'
// 								onChange={this.handleStartMinuteChange} 
// 								maxHeight={300}
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								{minuteRange}
// 				        	</SelectField> 
// 			        	</div>

// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='ampm'
// 							 	fullWidth={true}
// 								value={this.state.ampm} 
// 								hintText='am'
// 								onChange={this.handleAmPmChange} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								<MenuItem key={v4()} value={'am'} primaryText='am' />
// 								<MenuItem key={v4()} value={'pm'} primaryText='pm' />

// 				        	</SelectField> 
// 			        	</div>

// 			        	<div className='bridgeText'>&nbsp; to &nbsp;</div>

// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='endHour'
// 							 	fullWidth={true}
// 								value={this.state.endHour} 
// 								hintText='hour'
// 								onChange={this.handleEndHourChange}
// 								maxHeight={300} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								{hourRange}
// 				        	</SelectField> 
// 			        	</div>

// 			        	<div className='bridgeText'>:</div>

// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='endMinute'
// 							 	fullWidth={true}
// 								value={this.state.endMinute} 
// 								hintText='min'
// 								maxHeight={300}
// 								onChange={this.handleEndMinuteChange} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								{minuteRange}
// 				        	</SelectField> 
// 			        	</div>

// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='pmam'
// 							 	fullWidth={true}
// 								value={this.state.pmam} 
// 								hintText='am'
// 								onChange={this.handlePmAmChange} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								<MenuItem key={v4()} value={'am'} primaryText='am' />
// 								<MenuItem key={v4()} value={'pm'} primaryText='pm' />

// 				        	</SelectField> 
// 			        	</div>
			        	
// 			        	<div className='inputBoxes'>
// 							<SelectField 
// 								id='shift'
// 							 	fullWidth={true}
// 								value={this.state.shift} 
// 								hintText='shift'
// 								onChange={this.handleShiftChange} 
// 								style={styles.general}
// 								labelStyle={styles.label}>


// 								<MenuItem key={v4()} value={1} primaryText='GRAVE' />
// 								<MenuItem key={v4()} value={2} primaryText='DAY' />
// 								<MenuItem key={v4()} value={3} primaryText='SWING' />

// 				        	</SelectField> 
// 			        	</div>

// 			        	<div>
// 			        		<IconButton
// 						      iconClassName="material-icons"
// 						      tooltip="Add Shift Time"
// 						      onClick={this.addNewShift}
// 						      style={{paddingLeft: '65px', marginTop: '15px'}}
// 						     >
// 						      add
// 						    </IconButton>
// 						 </div>

			        	
// 		        	</div>
// 		        	{this.props.shiftStrings.map(function(item, i){
// 						return(
// 							<div key={v4()} className='eachLocation'>
// 								<div>{item.string_rep}</div>
// 								<div>
// 									<IconButton
// 								      iconClassName="material-icons"
// 								      tooltip="Delete Area"
// 								      onClick={this.deleteShiftEntry.bind(this, item)}
// 								     >
// 								      delete
// 								    </IconButton>

// 								</div>
// 							</div>
// 						)
// 					}.bind(this))}
		        	
// 			        	<div className='shiftAdds areaAdds'>
// 							<div>AREAS</div>
// 							<div></div>
// 						</div>
						
// 						<div className='shiftString'>
// 							<div>
// 								<TextField
// 									id='newAreaToAdd'
// 									onKeyDown={this.onEnterPress} 
// 									ref='newAreaToAdd'
// 									style={{width: '543px', paddingLeft: '15px', marginTop: '15px'}}
// 									onChange={this.handleAreaChange} 
// 									value={this.state.newArea} />
// 							</div>
							
// 				        	<div><IconButton
// 							      iconClassName="material-icons"
// 							      tooltip="Add Area"
// 							      onClick={this.addNewArea}
// 							     >
// 							      add
// 							    </IconButton>
// 							 </div>
// 				    	</div>
// 				    	<div>
// 							{this.props.areas.map(function(item, i){
// 								return(
// 									<div key={v4()} className='eachLocation'>
// 										<div>{item.title}</div>
// 										<div>
// 											<IconButton
// 										      iconClassName="material-icons"
// 										      tooltip="Delete Area"
// 										      onClick={this.deleteAreaEntry.bind(this, item)}
// 										     >
// 										      delete
// 										    </IconButton>

// 										</div>
// 									</div>
// 								)
// 							}.bind(this))}
// 						</div>
// 				</div>
// 				<RaisedButton label='Close' onClick={this.closeSettings} />
// 			</div>
// 			</div>
// 		)
// 	}
// })