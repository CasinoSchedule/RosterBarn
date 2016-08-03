import React from 'react';
import store from 'store';
import { updateEmployee, registerNewEmail, deleteEmployee } from 'api/data';
import FlatButton from 'material-ui/FlatButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Confirm from 'ui/confirm';
import {v4} from 'uuid';
import TextField from 'material-ui/TextField';
import {orange500, blue500, brown500, indigo500, red500} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox';



require('assets/styles/employeeInfoForm.scss');

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: brown500,
    color: orange500,
  },
  floatingLabelStyle: {
    color: indigo500,
  },
  floatingLabelFocusStyle: {
    color: indigo500,
    borderColor: red500,
  },
  block: {
    maxWidth: 40,
   	fill: indigo500
  },
  checkbox: {
    marginBottom: 16,
  },
};


export default React.createClass({
	getInitialState: function(){
		return {
			phone_number_first: '',
			phone_number_second: '',
			phone_number_third: '',
			showDeleteConfirm: false
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				phone_number_first: ((this.props.info.phone_number) ? this.props.info.phone_number.slice(0,3) : ''),
				phone_number_second: ((this.props.info.phone_number) ? this.props.info.phone_number.slice(3,6) : ''),
				phone_number_third: ((this.props.info.phone_number) ? this.props.info.phone_number.slice(6,10) : ''),
				showDeleteConfirm: currentStore.showReducer.showDeleteConfirm
			})
		}.bind(this));
		console.log('phone number', this.props.info.phone_number);
	},
	close: function(){
		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: false
		})

	},
	handleSubmit: function(e){
		e.preventDefault();
		if(this.props.info.email !== this.refs.email.getValue()) {
			registerNewEmail({email: this.refs.email.getValue(), profile_id: this.props.info.id})
		}
		
		updateEmployee(this.props.info.id, {
			position_title: this.refs.position_title.getValue() || "",
			first_name: this.refs.first_name.getValue() || "",
			last_name: this.refs.last_name.getValue() || "",
			employee_id: this.refs.employee_id.getValue() || "",
			email: this.refs.email.getValue() || "",
			phone_number: this.refs.phone_number_1.getValue() + this.refs.phone_number_2.getValue() + this.refs.phone_number_3.getValue()  || ""
		});

		this.props.refreshCurrentState(this.props.currentDate);

		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: false
		})

	},
	confirmDelete: function(){
		this.setState({
			showDeleteConfirm: true
		})
		
	},
	deleteEmployee: function(){
		deleteEmployee(this.props.info.id);
		this.props.refreshCurrentState(this.props.currentDate);

		this.setState({
			showDeleteConfirm: false
		})

		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: false
		})
		
	},
	render: function(){
		return (
			<div>
			<div className="shade"></div>
			<div className="bigFlex">

			<div className="bigFlexHeader">Employee Info</div>
			<div className="employeeInfoFormBox">
				<div className="fullPic"><img src={this.props.info.photo_url} /></div>
				<div className="formBox">
			
					<TextField 
						id='position_title' 
						style={{fontFamily: 'Arial'}} 
						underlineStyle={styles.underlineStyle} 
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
						ref="position_title" 
						floatingLabelText="Position Title" 
						defaultValue={this.props.info.position_title}/>

					<TextField 
						id='first_name' 
						style={{fontFamily: 'Arial'}} 
						underlineStyle={styles.underlineStyle} 
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
						ref="first_name" 
						floatingLabelText="First Name" 
						defaultValue={this.props.info.first_name}/>
		
					<TextField 
						id='last_name' 
						style={{fontFamily: 'Arial'}} 
						underlineStyle={styles.underlineStyle} 
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
						ref="last_name" 
						floatingLabelText="Last Name" 
						defaultValue={this.props.info.last_name}/>

					<TextField 
						id='employee_id' 
						style={{fontFamily: 'Arial'}} 
						underlineStyle={styles.underlineStyle} 
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
						ref="employee_id" 
						floatingLabelText="Employee ID" 
						defaultValue={this.props.info.employee_id}/>
					
					<TextField 
						id='email' 
						style={{fontFamily: 'Arial'}} 
						underlineStyle={styles.underlineStyle} 
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle} 
						ref="email" 
						floatingLabelText="Email" 
						defaultValue={this.props.info.email}/>

					
					<label htmlFor="phone_number">Phone Number</label>
					<div className="phoneNumber">
						<input ref="phone_number_1" defaultValue={this.state.phone_number_first} maxLength="3"/>&nbsp;
						<input ref="phone_number_2" defaultValue={this.state.phone_number_second} maxLength="3"/>&nbsp;
						<input ref="phone_number_3" defaultValue={this.state.phone_number_third} maxLength="4"/>
					</div>
					<label htmlFor="regular_days_off">Days Off</label>
					<input ref="regular_days_off" placeholder="Days Off" defaultValue={this.props.info.regular_days_off}/>
					<div className="weekFlex">
						<Checkbox label="Mon" style={styles.block}/>
						<Checkbox label="Tue" style={styles.block}/>
						<Checkbox label="Wed" style={styles.block}/>
					</div>

				</div>
			</div>
			<div className="formButtons">
				<div>
					<FlatButton label="Delete" onClick={this.confirmDelete} />
				</div>
				<div>
					<FlatButton label="Cancel" onClick={this.close} />
					<FlatButton label="Submit" onClick={this.handleSubmit} />
				</div>
			</div>

			</div>

			<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{(this.state.showDeleteConfirm) 
					? <Confirm
						key={v4()} 
						confirm={this.deleteEmployee} 
						message={"Please confirm to delete employee."} 
						header={"Delete Employee"} /> 
					: ""}	
			</ReactCSSTransitionGroup>

			</div>
		)
	}
})