import React from 'react';
import store from 'store';
import { deleteArea, addArea, addShiftString, deleteShiftString } from 'api/data';
import Close from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import ShiftTimes from 'ui/settings_shiftTimes';
import Area from 'ui/settings_areas';
import SidePanel from 'ui/settings_sidePanel';

require("assets/styles/settings_new.scss");


export default React.createClass({
	getInitialState: function(){
		return {
			areas: [],
			newArea: '',
			shift: this.props.shiftNum || 0,
			showSettings: false,
			selected: '',
			showShiftTimes: true,
			showArea: false,
			selectedOption: 'Shift Times'
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
		this.props.show('showSettings');
	},
	colorClick: function(e){
		console.log(e.hex); 
	},
	select: function(){
		this.setState({
			showSettings: !this.state.showSettings
		})

	},
	highlightOption: function(str){
		console.log('highlightOption', str);
		this.setState({
			selectedOption: str,
			showShiftTimes: (str === 'Shift Times' ? true : false),
			showArea: (str === 'Area' ? true : false)
		})
	},
	render: function(){
		return (
			<div>
			<div className="settings" onClick={this.select} ><i className="fa fa-cogs" aria-hidden="true" ></i>Settings</div>
				{this.state.showSettings 
					? <div>
						<div className='shade'></div>
						<div className='settingsBox'>
							<div className='settingsHeader'> 
								<div>Settings</div>
								<div> 
									<IconButton
								      iconClassName="material-icons"
								      style={{background: 'white'}}
								      onClick={this.select}
								     >
								      close
								    </IconButton> 
								</div>
							</div>

							<div className='settingsContainer'>

								<SidePanel 
									highlightOption={this.highlightOption}
									selectedOption={this.state.selectedOption} />

									{this.state.showShiftTimes ? <ShiftTimes 
										shiftStrings={this.props.shiftStrings} />: null}

									{this.state.showArea ? <Area 
										areas={this.props.areas} />: null}
							</div>
						
						</div>
					</div>

					: null}
				
			</div>
		)
	}
})