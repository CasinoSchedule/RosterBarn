import React from 'react';
import store from 'store';

require('assets/styles/eachCalendarDay.scss');


export default React.createClass({
	handleClick: function(){
		var day = this.props;
		this.props.updateDayContainer(day.each, day.shiftTimeString, day.shiftArea, day.epoch, day.shift);
		console.log('passed', day.shift);
		store.dispatch({
			type: 'SELECTED',
			selected: this.props.each.calendar_date
		})
	},
	render: function(){
		return (
			<div id={this.props.highlight} className={'calendarDay ' + this.props.each.currentClass} onClick={this.handleClick}>
				<div className='dayNumeral'>{this.props.each.day}</div>
				<div className='detailDayInfo'>
					<div className='shiftTime'>{this.props.shiftTimeString}</div>	
					<div id={this.props.highlight} className='shiftArea'>{this.props.shiftArea}</div>
					{(this.props.callin) ? <div id={this.props.highlight} className='shiftArea'>Call In</div> : ''}	
				</div>						
			</div>			
		)
	}
})