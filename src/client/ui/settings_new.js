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

require("assets/styles/settings_new.scss");

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
  label: {
   	
  },
};

export default React.createClass({
	getInitialState: function(){
		return {
			areas: [],
			newArea: '',
			shift: this.props.shiftNum || 0
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
	deleteShiftEntry: function(item){
		// component updates in function
		deleteShiftString(item.id);
		
	},
	closeSettings: function(){
		store.dispatch({
			type: 'SHOW_SETTINGS',
			showSettings: false
		})
	},
	render: function(){
		return (
			<div>
				<div className='shade'></div>
			<div className='settingsBox'>

				<div className='settingsHeader'> 
					<div>Settings</div>
					<div> X </div>
				</div>
				<div className='settingsContainer'>
					<div className='settingsSidePanel'>
						<div className='settingsOptions'>Shift Times</div>
						<div className='settingsOptions'>Areas</div>
						<div className='settingsOptions'>Positions</div>
					</div>
					<div className='settingsBody'>
						<div className='addNewArea'>			
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
							
				        	<div>
				        		<IconButton
							      iconClassName="material-icons"
							      tooltip="Add Area"
							      onClick={this.addNewArea}
							     >
							      add
							    </IconButton>
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
					</div>


				</div>

			{/*	
			        	<div className='shiftAdds areaAdds'>
							<div>AREAS</div>
							<div></div>
						</div>
						
						<div className='shiftString'>
							<div>
								<TextField
									id='newAreaToAdd'
									onKeyDown={this.onEnterPress} 
									ref='newAreaToAdd'
									style={{width: '543px', paddingLeft: '15px', marginTop: '15px'}}
									onChange={this.handleAreaChange} 
									value={this.state.newArea} />
							</div>
							
				        	<div><IconButton
							      iconClassName="material-icons"
							      tooltip="Add Area"
							      onClick={this.addNewArea}
							     >
							      add
							    </IconButton>
							 </div>
				    	</div>
				    	<div>
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
				</div>
				<RaisedButton label='Close' onClick={this.closeSettings} /> */}
			</div>
			</div>
		)
	}
})