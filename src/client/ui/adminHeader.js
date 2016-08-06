import React from 'react';
import Options from 'ui/options';

require("assets/styles/adminHeader.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="adminHeader">
				<div className="logoContainerDiv">
				 <span className="roster"><span className="letter">R</span>oster</span><span className="barn"><span className="">B</span>arn</span>
				</div>
				<div className="adminHeaderContainer">
					<div className="departmentTitleTag">{localStorage.getItem("departmentTitle")}</div>
					<div className="headerOptions">
						<Options />
						<div className="settings"><i className="fa fa-cogs" aria-hidden="true" onClick={this.props.settings}></i>Settings</div>
						<div className="logout" onClick={this.props.logout} ><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</div>
					</div>
				</div>
			</div> 
		)
	}
})