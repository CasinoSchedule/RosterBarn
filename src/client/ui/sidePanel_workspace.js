import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';
import { createMonthlyCalendar } from 'api/data';
import CalendarTitleBar from 'ui/calendarTitleBar';
import DaysOfWeekHeader from 'ui/daysOfWeekHeader';
import PublishButton from 'ui/publishButton'

require("assets/styles/sidePanel.scss");
require('font-awesome-webpack');

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: new Date(),
			monthlyCalendar: [],
			colorArea: false
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				monthlyCalendar: currentStore.calendarReducer.monthlyCalendar
			})
		}.bind(this));
		
		createMonthlyCalendar(new Date());
	},
	shiftFilter: function(num, str){
		console.log('filter', num, str);
		this.props.filterByShift(num, str);
	},
	scheduleJump: function(date){
		console.log('arguments', date);
		this.props.dateChangefromCalendar(new Date(date.year, date.month, date.day));
	},
	nextMonth: function(days){
		var newDate = this.state.currentDate.addDays(days);
		this.setState({
			currentDate: newDate
		})
		createMonthlyCalendar(newDate);
		// console.log(this.state.currentDate.addDays(days))
	},
	changeColor: function(key, bool){
		// console.log(arguments);
		this.props.setColor(key, bool);
		this.setState({
			colorArea: bool
		})
	},
	render: function(){
		return (
			<div className="sidePortal">

				
				<div className="sidePortalFlex">
				
				
				<div className="portalOptions">

			
					<details>
						<summary className="locations"><i className="fa fa-calendar" aria-hidden="true"></i>Calendar</summary>
						<div className="adminCal">

							<CalendarTitleBar 
								previousMonth={this.nextMonth}
								nextMonth={this.nextMonth} 
								currentDate={this.state.currentDate}
								calendarHeader={'adminCalendarHeader'} />

							<DaysOfWeekHeader 
								weekdays={'adminWeekdays'}/>


							<div className="adminCalDate">
								{this.state.monthlyCalendar.map(function(item, i){
									return (
										<div key ={i} className={"adminCalBox " + item.currentClass} id={"box" + i} onClick={this.scheduleJump.bind(this, item)}>
											<p>{item.day}</p>
										</div>
									)
								}.bind(this))} 	
									
							</div>
							
						</div>
					</details>

					

					<details>
						<summary className="locations"><i className="fa fa-tint" aria-hidden="true"></i>Color Code</summary>
							<div className="colorBox">
								<div className="colors" id="colorArea" onClick={this.changeColor.bind(this, 'colorArea', !this.state.colorArea)}>By Area</div>
								<div className="colors" id="positionClass" onClick={this.changeColor}>By Position</div>
								<div className="colors" id="starting_time" onClick={this.changeColor}>By Start-Time</div>
							</div>
					</details>

					<details>
						<summary className="locations"><i className="fa fa-clock-o" aria-hidden="true"></i>Shifts</summary>
							<div className="shiftBox">
								<div className="shifts" onClick={this.shiftFilter.bind(this, 1, 'grave')}>grave</div>
								<div className="shifts" onClick={this.shiftFilter.bind(this, 2, 'day')}>day</div>
								<div className="shifts" onClick={this.shiftFilter.bind(this, 3, 'swing')}>swing</div>
								<div className="shifts" onClick={this.shiftFilter.bind(this, 0, '')}>all</div>
							</div>
					</details>
				</div>
				
				
				</div>
				
				
				<PublishButton 
					publishButton={this.props.publishButton}
					publish={this.props.publish} />
			</div>
		)
	}
})