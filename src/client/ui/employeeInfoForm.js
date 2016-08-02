import React from 'react';
import store from 'store';
import { updateEmployee, registerNewEmail, deleteEmployee } from 'api/data';
import FlatButton from 'material-ui/FlatButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Confirm from 'ui/confirm';
import {v4} from 'uuid';

require('assets/styles/employeeInfoForm.scss');

export default React.createClass({
	getIntitalState: function(){
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
		
	},
	close: function(){
		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: false
		})

	},
	handleSubmit: function(e){
		e.preventDefault();
		if(this.props.info.email !== this.refs.email.value) {
			registerNewEmail({email: this.refs.email.value, profile_id: this.props.info.id})
		}
		
		updateEmployee(this.props.info.id, {
			position_title: this.refs.position_title.value || "",
			first_name: this.refs.first_name.value || "",
			last_name: this.refs.last_name.value || "",
			employee_id: this.refs.employee_id.value || "",
			email: this.refs.email.value || "",
			phone_number: this.refs.phone_number_1.value + this.refs.phone_number_2.value + this.refs.phone_number_3.value  || ""
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
					<label htmlFor="position_title">Position Title</label>
					<input ref="position_title" placeholder="Position Title" defaultValue={this.props.info.position_title}/>
					<label htmlFor="first_name">First Name</label>
					<input ref="first_name" placeholder="First Name" defaultValue={this.props.info.first_name}/>
					<label htmlFor="last_name">Last Name</label>
					<input ref="last_name" placeholder="Last Name" defaultValue={this.props.info.last_name}/>
					<label htmlFor="employee_id">Employee Id</label>
					<input ref="employee_id" placeholder="Employee Id" defaultValue={this.props.info.employee_id}/>
					<label htmlFor="email">Email</label>
					<input ref="email" placeholder="Email" defaultValue={this.props.info.email}/>
					<label htmlFor="phone_number">Phone Number</label>
					<div className="phoneNumber">
						<input ref="phone_number_1" defaultValue={this.state.phone_number_first} maxLength="3"/>&nbsp;
						<input ref="phone_number_2" defaultValue={this.state.phone_number_second} maxLength="3"/>&nbsp;
						<input ref="phone_number_3" defaultValue={this.state.phone_number_third} maxLength="4"/>
					</div>
					<label htmlFor="regular_days_off">Days Off</label>
					<input ref="regular_days_off" placeholder="Days Off" defaultValue={this.props.info.regular_days_off}/>
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