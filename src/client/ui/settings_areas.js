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

export default React.createClass({
	getInitialState: function(){
		return {
			areas: [],
			newArea: '',
			shift: this.props.shiftNum || 0,
			showSettings: false
		}
	},
	onEnterPress: function(e){
		if(e.keyCode === 13) {
			this.addNewArea();
		}
		
	},
	handleAreaChange: function(e){
		this.setState({
			newArea: e.target.id.value
		})
	},
	addNewArea: function(){
		var newAreaTitle = this.refs.newAreaToAdd.getValue();
		console.log('newAreaTitle', newAreaTitle);
		// component updates in function
		addArea({title: newAreaTitle, department: localStorage.getItem("departmentId")}); 

		this.setState({
			newArea: ''
		})

	},
	deleteAreaEntry: function(item){
		// component updates in function
		deleteArea(item.id);
		
	},
	closeSettings: function(){
		this.setState({
			showSettings: false
		})
	},
	colorClick: function(e){
		console.log(e.hex); 
	},
	render: function(){
		return (
			<div className='settingsBody'>
				<div className='addNewArea'>		
					<div className='shiftColorContainer'>
					<div>
						<TextField
							id='newAreaToAdd'
							onKeyDown={this.onEnterPress} 
							ref='newAreaToAdd'
							floatingLabelText='New Area'
							floatingLabelFixed={true}
							style={{width: '543px', paddingLeft: '15px', marginTop: '15px'}}
							onChange={this.handleAreaChange} 
							value={this.state.newArea} />
					</div>

					<div className='selectColor'>
						<div className='matchLabel'>Color Code</div>
						<ColorPicker 
							onChange={this.colorClick}/>
					</div>

					{/* <div>
		        		<IconButton
					      iconClassName="material-icons"
					      tooltip="Add Area"
					      onClick={this.addNewArea}
					     >
					      add
					    </IconButton>
					</div> */}
					</div>
				</div>
							
				<div className='shiftChoices'>
					{this.props.areas.map(function(item, i){
						return(
							<div key={v4()} className='eachLocation'>
								<div>{item.title}</div>
								<div>
									<IconButton
								      iconClassName="material-icons"
								      tooltip="Delete Area"
								      onClick={this.deleteAreaEntry.bind(this, item)}
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
						label='Add' onClick={this.addNewArea} />
				</div>

			</div>
		)
	}
})