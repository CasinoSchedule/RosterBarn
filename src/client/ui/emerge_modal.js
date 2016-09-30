import React from 'react';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';

require("assets/styles/settings_new.scss");

export default React.createClass({
	render: function(){
		return (
			<div>
				<div className='shade'></div>
				<div className='settingsBox'>
					<div className='settingsHeader'> 
						<div>{this.props.modalTitle}</div>
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

					<div className='settingsContainer' style={{border: '5px solid red'}}>
						{this.props.children}
					</div>
				
				</div>
			</div>
		)
	}
})