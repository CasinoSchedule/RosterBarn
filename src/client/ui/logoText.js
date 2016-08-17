import React from 'react';


require("assets/styles/logoText.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="logoContainerDiv">
			 	<span className="roster"><span className="letter">R</span>oster</span><span className="barn"><span className="">B</span>arn</span>
			</div>
		)
	}
})