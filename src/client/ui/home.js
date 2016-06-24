import React from 'react';
import { Link, browserHistory } from 'react-router';

require("assets/styles/home.scss");
var image = require("assets/images/ariawhite.png");

export default React.createClass({
	handleClick: function(){
		browserHistory.push('/calender');
	},
	render: function(){
		return (
			<div id="homepage">
				<div id="imageContainer">
					<img src={image}/>
				</div>

				<div id="divLine"></div>
				<div id="login"></div>
				<div id="form">
					<form action="">
						<div id="schedule"></div>
						<input type="text" placeholder="email" />
						<input type="text" placeholder="password" />
						<button type="submit" onClick={this.handleClick}>Log In</button>
						<input type="checkbox" id="rememberMe"/> <span>Remember me</span>
					</form>
				</div>
			</div>
		)
	}
})