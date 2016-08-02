import React from 'react';

require("assets/styles/adminHeader.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="adminHeader">
				<div>
				 <span className="roster"><span className="letter">R</span>oster</span><span className="barn"><span className="">B</span>arn</span>
				</div>
				<div className="titleContainer">
					<div className="departmentTitleTag">{localStorage.getItem("departmentTitle")}</div>
					<div className="headerOptions">
						<div className="options"><i className="fa fa-bars" aria-hidden="true"></i>Options</div>
						<div className="settings"><i className="fa fa-cogs" aria-hidden="true"></i>Settings</div>
						<div className="logout" onClick={this.props.logout} ><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</div>
					</div>
				</div>
			</div> 
		)
	}
})