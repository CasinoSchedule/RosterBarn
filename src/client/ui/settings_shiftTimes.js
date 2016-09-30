import React from 'react';
import store from 'store';
import {v4} from 'uuid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { getAreas, deleteArea, addArea, twelveToTwentyFour, addShiftString, deleteShiftString } from 'api/data';
import FontIcon from 'material-ui/FontIcon';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { SwatchesPicker } from 'react-color';
import ColorPicker from 'ui/settings_color';

const hourRange = populateDropDown(1, 12);
const minuteRange = populateDropDown(0, 59);

function populateDropDown(start, end){
	const value = [];
	for(let i = start; i <= end; i++){
		const x = ((i.toString().length === 1) ? '0' + i.toString() : i.toString() )
		value.push(<MenuItem value={i} key={v4()} primaryText={x} />);
	}
	return value
}

const styles = {
  general: {
    top: '-5px', fontSize: '12px', fontWeight: '600', paddingLeft: '15px', marginTop: '15px'
  },
};

require("assets/styles/settings_new.scss");

export default React.createClass({
	getInitialState: function(){
		return {
			startHour: '',
			startMinute: '',
			ampmStart: '',
			endHour: '',
			endMinute: '',
			ampmEnd: '',
			color_description: '',
			shift: this.props.shiftNum || 0
		}
	},
	
	handleChange: function(key, event, index, value){
		console.log(arguments);
		this.setState({
			[key]: value
		})
	},
	
	addNewShift: function(){
		var starthour = this.state.startHour.toString();
		var startminute = this.state.startMinute.toString();
		var ampmStart = this.state.ampmStart;
		var endhour = this.state.endHour.toString();
		var endminute = this.state.endMinute.toString();
		var ampmEnd = this.state.ampmEnd;
		var fullStartTime = twelveToTwentyFour(starthour, startminute, ampmStart);
		var fullEndTime = twelveToTwentyFour(endhour, endminute, ampmEnd)
		var shift = this.state.shift;

		// function here to error check length

		addShiftString(
			{starting_time: fullStartTime, 
			 shift_category: ((this.state.shift) ? this.state.shift : 1),
			 color_description: this.state.color_description || ''}
			 );	
		this.setState({
			startHour: '',
			startMinute: '',
			endHour: '',
			endMinute: '',
			ampmStart: '',
			ampmEnd: '',
			shift: 0
		})
	},

	colorClick: function(hex){
		console.log('From shiftTimes', hex.hex); 
		this.setState({
			color_description: hex.hex
		})

	},
	
	deleteShiftEntry: function(item){
		// component updates in function
		deleteShiftString(item.id);	
	},
	
	render: function(){
		return (
			<div className='settingsBody'>
				<div className='shiftSelection'>
					<div className='shiftColorContainer'>			
						<SelectField 
							id='shift'
						 	// fullWidth={true}
							value={this.state.shift} 
							floatingLabelText='Shift'
							hintText='shift'
							onChange={this.handleChange.bind(this, 'shift')} 
							>
							<MenuItem key={v4()} value={1} primaryText='GRAVE' />
							<MenuItem key={v4()} value={2} primaryText='DAY' />
							<MenuItem key={v4()} value={3} primaryText='SWING' />
			        	</SelectField> 

			        	<div className='selectColor'>
							<div className='matchLabel'>Color Code</div>
							<ColorPicker 
								colorClick={this.colorClick}/>
						</div>
					</div>
				</div>
				<div className='matchLabel centerLabel'>Shift Times</div>
				<div className='shiftSelection'>
					
					<div className='shiftString'>
						<div className='inputBoxes'>
							<SelectField 
								id='startHour'
							 	fullWidth={true}
								value={this.state.startHour} 
								hintText='hour'
								onChange={this.handleChange.bind(this, 'startHour')}
								maxHeight={300} 
								style={styles.general}
								labelStyle={styles.label}>


								{hourRange}
				        	</SelectField> 
			        	</div>

	        			<div className='bridgeText'>:</div>

	        			<div className='inputBoxes'>
							<SelectField 
								id='startMinute'
							 	fullWidth={true}
								value={this.state.startMinute} 
								hintText='min'
								onChange={this.handleChange.bind(this, 'startMinute')}
								maxHeight={300}
								style={styles.general}
								labelStyle={styles.label}>


								{minuteRange}
				        	</SelectField> 
			        	</div>

			        	<div className='inputBoxes'>
							<SelectField 
								id='ampm'
							 	fullWidth={true}
								value={this.state.ampmStart} 
								hintText='am'
								onChange={this.handleChange.bind(this, 'ampmStart')}
								style={styles.general}
								labelStyle={styles.label}>


								<MenuItem key={v4()} value={'am'} primaryText='am' />
								<MenuItem key={v4()} value={'pm'} primaryText='pm' />

				        	</SelectField> 
			        	</div>

	        			<div className='bridgeText'>&nbsp; to &nbsp;</div>

			        	<div className='inputBoxes'>
							<SelectField 
								id='endHour'
							 	fullWidth={true}
								value={this.state.endHour} 
								hintText='hour'
								onChange={this.handleChange.bind(this, 'endHour')}
								maxHeight={300} 
								style={styles.general}
								labelStyle={styles.label}>


								{hourRange}
				        	</SelectField> 
			        	</div>

			        	<div className='bridgeText'>:</div>

			        	<div className='inputBoxes'>
							<SelectField 
								id='endMinute'
							 	fullWidth={true}
								value={this.state.endMinute} 
								hintText='min'
								maxHeight={300}
								onChange={this.handleChange.bind(this, 'endMinute')} 
								style={styles.general}
								labelStyle={styles.label}>


								{minuteRange}
				        	</SelectField> 
			        	</div>

			        	<div className='inputBoxes'>
							<SelectField 
								id='pmam'
							 	fullWidth={true}
								value={this.state.ampmEnd} 
								hintText='am'
								onChange={this.handleChange.bind(this, 'ampmEnd')} 
								style={styles.general}
								labelStyle={styles.label}>


								<MenuItem key={v4()} value={'am'} primaryText='am' />
								<MenuItem key={v4()} value={'pm'} primaryText='pm' />

				        	</SelectField> 
			        	</div>
			        	
			        	{/* <div>
			        		<IconButton
						      iconClassName="material-icons"
						      tooltip="Add Shift Time"
						      onClick={this.addNewShift}
						      style={{paddingLeft: '65px', marginTop: '15px'}}
						     >
						      add
						    </IconButton>
						 </div> */}
	      
	    			</div>
	        
				</div>

				<div className='shiftChoices'>				
					{this.props.shiftStrings.map(function(item, i){
						return(
							<div key={v4()} className='eachLocation' style={{background: 'linear-gradient(to left, white, ' + item.color_description + ')'}}>
								<div>{item.string_rep}</div>
								<div>
									<IconButton
								      iconClassName="material-icons"
								      tooltip="Delete Area"
								      onClick={this.deleteShiftEntry.bind(this, item)}
								     >
								      delete
								    </IconButton>

								</div>
							</div>
						)
					}.bind(this))}
				</div>
				<div className='settingsFooter'>
					<RaisedButton 
						label='Clear'/>
					<RaisedButton 
						label='Add' onClick={this.addNewShift}/>
				</div>
			</div>
		)
	}
})