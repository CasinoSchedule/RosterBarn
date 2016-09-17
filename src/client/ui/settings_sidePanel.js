import React from 'react';
import Option from 'ui/settings_sidePanelOptions';

require("assets/styles/settings_new.scss");

export default React.createClass({
	render: function(){
		return (
			<div className='settingsSidePanel'>

				<Option 
					icon='fa fa-clock-o fa-2x'
					title='Shift Times'
					highlightOption={this.props.highlightOption} 
					selectedOption={(this.props.selectedOption === 'Shift Times') ? 'selectedOption' : 'none'} />

				<Option 
					icon='fa fa-map-marker fa-2x'
					title='Area'
					highlightOption={this.props.highlightOption}
					selectedOption={(this.props.selectedOption === 'Area') ? 'selectedOption' : 'none'} />

				{/* <Option 
					icon='fa fa-users fa-2x'
					title='Positions'
					highlightOption={this.props.highlightOption} 
					selectedOption={(this.props.selectedOption === 'Positions') ? 'selectedOption' : 'none'} />    */}

			</div>
		)
	}
})