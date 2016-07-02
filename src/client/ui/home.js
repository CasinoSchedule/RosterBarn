import React from 'react';
import store from 'store';
import { login } from 'api/data';
import { Link, browserHistory } from 'react-router';

require("assets/styles/home.scss");
var image = require("assets/images/ariawhite.png");

export default React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: "",
			error: false
		}
	},
	handleChange: function(e){
		if (e.target.type === 'text') {
			this.setState({
				username: e.target.value,
				password: this.state.password
			})
		} else {
			this.setState({
				username: this.state.username,
				password: e.target.value
			})
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.state.username, this.state.password);
		login(this.state.username, this.state.password).then(function(resp){
			console.log('handle then');
			
			browserHistory.push('/calendar');
		}.bind(this)).catch(function(err){
			console.log('handle catch');
			this.setState({
				error: true,
				username: "",
				password: ""
			});
		}.bind(this));

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
					<form action="" method="post" onSubmit={this.handleSubmit}>
						<div id="schedule"></div>
						<input type="text" placeholder="username" onChange={this.handleChange} value={this.state.username} name="username" />
						<input type="password" placeholder="password" onChange={this.handleChange} value={this.state.password} name="password" />
						<button type="submit">Log In</button>
						<input type="checkbox" id="rememberMe" /> <span>Remember me</span>
					</form>

					{this.state.error ? <div className='error'>Password and Username do not match</div> : ''}

				</div>
			</div>
		)
	}
})