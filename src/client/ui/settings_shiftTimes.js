import React from 'react';

export default React.createClass({
	getInitialState: function(){
		return {
			startHour: '',
			startMinute: '',
			endHour: '',
			endMinute: '',
			ampm: '',
			pmam: '',
			areas: [],
			newArea: '',
			shift: this.props.shiftNum || 0
		}
	},
	
	handleStartHourChange: function(event, key, value){
		this.setState({
			startHour: value
		})
	},
	handleStartMinuteChange: function(event, key, value){
		this.setState({
			startMinute: value
		})
	},
	handleEndHourChange: function(event, key, value){
		this.setState({
			endHour: value
		})
	},
	handleEndMinuteChange: function(event, key, value){
		this.setState({
			endMinute: value
		})
	},
	handleAmPmChange: function(event, key, value){
		// console.log(value);
		this.setState({
			ampm: value || 'am'
		})
	},
	handlePmAmChange: function(event, key, value){
		this.setState({
			pmam: value || 'am'
		})
	},
	handleShiftChange: function(event, key, value){
		this.setState({
			shift: value
		})
	},
	onEnterPress: function(e){
		if(e.keyCode === 13) {
			this.addNewArea();
		}
		
	},
	
	addNewShift: function(){
		var starthour = this.state.startHour.toString();
		var startminute = this.state.startMinute.toString();
		var ampm = this.state.ampm;
		var endhour = this.state.endHour.toString();
		var endminute = this.state.endMinute.toString();
		var pmam = this.state.pmam;
		var fullStartTime = twelveToTwentyFour(starthour, startminute, ampm);
		var fullEndTime = twelveToTwentyFour(endhour, endminute, pmam)
		var shift = this.state.shift;
		// function here to error check length

		addShiftString(
			{starting_time: fullStartTime, 
			 shift_category: ((this.state.shift) ? this.state.shift : 1)}
			 );	
		this.setState({
			startHour: '',
			startMinute: '',
			endHour: '',
			endMinute: '',
			ampm: '',
			pmam: '',
			shift: 0
		})
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
		<div className='settingsBody'>
			<div className='shiftSelection'>			
				<SelectField 
					id='shift'
				 	// fullWidth={true}
					value={this.state.shift} 
					floatingLabelText='Shift'
					hintText='shift'
					onChange={this.handleShiftChange} 
					>
					<MenuItem key={v4()} value={1} primaryText='GRAVE' />
					<MenuItem key={v4()} value={2} primaryText='DAY' />
					<MenuItem key={v4()} value={3} primaryText='SWING' />
	        	</SelectField> 
			</div>
			
			<div className='shiftSelection'>
				<div className='matchLabel'>Shift Times</div>
				<div className='shiftString'>
					<div className='inputBoxes'>
						<SelectField 
							id='startHour'
						 	fullWidth={true}
							value={this.state.startHour} 
							hintText='hour'
							onChange={this.handleStartHourChange}
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
							onChange={this.handleStartMinuteChange} 
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
							value={this.state.ampm} 
							hintText='am'
							onChange={this.handleAmPmChange} 
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
							onChange={this.handleEndHourChange}
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
							onChange={this.handleEndMinuteChange} 
							style={styles.general}
							labelStyle={styles.label}>


							{minuteRange}
			        	</SelectField> 
		        	</div>

		        	<div className='inputBoxes'>
						<SelectField 
							id='pmam'
						 	fullWidth={true}
							value={this.state.pmam} 
							hintText='am'
							onChange={this.handlePmAmChange} 
							style={styles.general}
							labelStyle={styles.label}>


							<MenuItem key={v4()} value={'am'} primaryText='am' />
							<MenuItem key={v4()} value={'pm'} primaryText='pm' />

			        	</SelectField> 
		        	</div>
		        	
		        	<div>
		        		<IconButton
					      iconClassName="material-icons"
					      tooltip="Add Shift Time"
					      onClick={this.addNewShift}
					      style={{paddingLeft: '65px', marginTop: '15px'}}
					     >
					      add
					    </IconButton>
					 </div>
      
    			</div>
        
			</div>

			<div className='shiftChoices'>				
				{this.props.shiftStrings.map(function(item, i){
					return(
						<div key={v4()} className='eachLocation'>
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

		</div>
		)
	}
})