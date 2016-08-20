import React from 'react';
import store from 'store';
import LogoText from 'ui/logoText'
import { login, checkAdmin } from 'api/data';
import { Link, browserHistory } from 'react-router';
import Cookie from 'js-cookie';
import { cyan500, cyan700, darkBlack, fullBlack, indigo500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

require('assets/styles/home.scss');

export default React.createClass({
	getInitialState: function(){
		return {
			username: "",
			password: "",
			error: false,
			remember: localStorage.getItem('username') || '',
			message: ''
		}
	},
	handleChange: function(e, index, value){
		this.setState({
			username: this.refs.username.getValue(),
			password: this.refs.password.getValue()
		})
	},
	handleCheck: function(){
		localStorage.setItem('username', this.state.username);
	},
	onEnterPress: function(e){
		if(e.keyCode === 13) {
			this.handleSubmit(e);
		}
		
	},
	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.state.username, this.state.password);
		localStorage.clear();
		login(this.state.username, this.state.password).then(function(resp){
			console.log('handle then');
			localStorage.clear();
			checkAdmin();
		}.bind(this)).catch(function(err){
			console.log('handle catch');
			
			this.setState({
				error: true,
				username: "",
				password: "",
				message: 'Password and/or Username Do Not Match'
			});
			
		}.bind(this));

		setTimeout(function(){
			this.setState({
				message: '',
				error: false
			})
			}.bind(this), 5000);
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
						onKeyDown={this.onEnterPress} 
						value={this.state.password}/>

					<RaisedButton 
						label='Submit' 
						fullWidth={true} 
						style={{marginTop: '40px'}}
						backgroundColor={indigo500}
						labelColor={'white'}
						labelStyle={{textShadow: '1px 1px 0px #000', letterSpacing: '1px'}}
						onClick={this.handleSubmit} />

					<Checkbox 
						id='remember' 
						onCheck={this.handleCheck}
						label={'Remember me'} 
						labelStyle={{color: '#b2b2b2'}}
						style={{marginTop: '20px', marginLeft: '10px'}} 
						defaultChecked={((this.state.remember) ? true : false)}/>

					<div className='forgot'>Forgot Password?</div>
					
				</div>

			</div>
		)
	}
})