import React from 'react';
import Options from 'ui/options';
import LogoText from 'ui/logoText';
import Settings from 'ui/settings_new';

require("assets/styles/adminHeader.scss");
require("assets/styles/settings_new.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="adminHeader">

				<LogoText />
				
				<div className="adminHeaderContainer">
					<div className="departmentTitleTag">{localStorage.getItem("departmentTitle")}</div>
					<div className="headerOptions">
						<Options />
						<Settings 
							areas={this.props.areas} 
							shiftStrings={this.props.shiftStrings}
							shiftNum={this.props.shiftNum} />
					
						<div className="logout" onClick={this.props.logout} ><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</div>
					</div>
				</div>
			</div> 
		)
	}
})