import React from 'react';

require("assets/styles/settings_new.scss");

export default React.createClass({
	select: function(str){
		this.props.highlightOption(str)
	},
	render: function(){
		return (
			<div className={'settingsOptions ' + this.props.selectedOption} onClick={this.select.bind(this, this.props.title)}>
				<div><i className={this.props.icon} aria-hidden="true"></i></div>
				<div>{this.props.title}</div>
			</div>
		)
	}
})