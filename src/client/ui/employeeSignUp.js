import React from 'react';
import store from 'store';
import { login, checkAdmin, addNewEmployeeUser } from 'api/data';
import { Link, browserHistory, Router, Route } from 'react-router';
import { cyan500, cyan700, darkBlack, fullBlack, indigo500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import LogoText from 'ui/logoText'


require("assets/styles/home.scss");
require("assets/styles/employeeSignUp.scss");

var image = require("assets/images/ariawhite.png");



export default React.createClass({
	getInitialState: function(){
		// console.log(this.props.params.splat);
		return {
			username: "",
			password: "",
			passwordMatch: "",
			error: false,
			message: ""
		}
	},	
	handleChange: function(e){
		this.setState({
			username: this.refs.username.getValue(),
			password: this.refs.password.getValue(),
			passwordMatch: this.refs.passwordMatch.getValue()
		})
		
	},
	handleSubmit: function(e){
		e.preventDefault();
		//browserHistory.push('/calendar');
		var that = this;

		if(this.state.password === this.state.passwordMatch) {
			addNewEmployeeUser(this.state.username, this.state.password, that.props.params.splat, function(){
				browserHistory.push('/calendar');
			}.bind(this)).catch(function(err){
				this.setState({
					username: "",
					password: "", 
					passwordMatch: "",
					error: true,
					message: "This signup url is no longer valid"
				})
				console.log('catch error');

		}.bind(this));
		} else {
			this.setState({
				username: this.state.username,
				password: "", 
				passwordMatch: "",
				error: true,
				message: "Passwords do not match"
			});
		}
		setTimeout(function(){
			this.setState({
				message: '',
				error: false
			})}.bind(this), 5000);
	},
	render: function(){		
		return (
			<div className="homePageWrapper">
				{(this.state.error) ? <div className='inputError'>{this.state.message}</div> : ''}
				<div className='homePageContainer'> 
					<div className='logoContainer'><LogoText /></div>
					<TextField 
						id='username'  
						ref="username" 
						type='text'
						multiLine={true}
						textareaStyle={{background: 'white'}}
						style={{marginLeft: '20px', background: 'white'}}
						floatingLabelText="Username"
						onChange={this.handleChange} 
						value={this.state.username}/>

					<TextField 
						id='password'  
						ref="password" 
						type='password'
						floatingLabelText="Password"
						style={{marginLeft: '20px', background: 'white'}}
						textareaStyle={{background: 'white'}}
						onChange={this.handleChange} 
						value={this.state.password}/>

					<TextField 
						id='passwordMatch'  
						ref="passwordMatch" 
						type='passwordMatch'
						floatingLabelText="Verify Password"
						style={{marginLeft: '20px', background: 'white'}}
						textareaStyle={{background: 'white'}}
						onChange={this.handleChange} 
						value={this.state.password}/>

					<RaisedButton 
						label='Submit' 
						fullWidth={true} 
						style={{marginTop: '40px'}}
						backgroundColor={indigo500}
						labelColor={'white'}
						labelStyle={{textShadow: '1px 1px 0px #000', letterSpacing: '1px'}}
						onClick={this.handleSubmit} />

				</div>

			</div>
		)
	}
})