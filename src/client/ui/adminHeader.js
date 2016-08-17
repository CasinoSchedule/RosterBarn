import React from 'react';
import Options from 'ui/options';
import LogoText from 'ui/logoText';

require("assets/styles/adminHeader.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="adminHeader">

				<LogoText />
				
				<div className="adminHeaderContainer">
					<div className="departmentTitleTag">{localStorage.getItem("departmentTitle")}</div>
					<div className="headerOptions">
						<Options />
						<div className="settings" onClick={this.props.showSettingsPanel} ><i className="fa fa-cogs" aria-hidden="true" ></i>Settings</div>
						<div className="logout" onClick={this.props.logout} ><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</div>
					</div>
				</div>
			</div> 
		)
	}
})