import React from 'react';
import store from 'store';


export default React.createClass({
	
	
	handleClick: function(){
		var day = this.props;
		this.props.updateDayContainer(day.each, day.shiftTime, day.shiftArea);
		console.log('day', this.props.each.fullDateString)
		

		store.dispatch({
			type: 'SELECTED',
			selected: this.props.each.calendar_date
		})

		// if(this.state.highlight){
		// 	this.setState({
		// 		highlight: ''
		// 	})
		// } else {
		// 	this.setState({
		// 		highlight: 'highlight'
		// 	})
		// }



		// var today = new Date();
		// var dayToCompare = new Date();
		// dayToCompare.setFullYear(day.year, day.month, day.day);
		// if(dayToCompare < today){
		// 	store.dispatch({
		// 		type: 'CHANGE_MESSAGE',
		// 		message: 'Before Today'
		// 	})

		// 	console.log('before today')
		// } else {
		// 	store.dispatch({
		// 		type: 'CHANGE_MESSAGE',
		// 		message: 'After Today'
		// 	})
			
		// 	console.log('not before')
		// }
		// 	setTimeout(function(){
		// 		store.dispatch({
		// 			type: 'CHANGE_MESSAGE',
		// 			message: ''
		// 		})
		// 	}, 3000)

	},
	render: function(){
		return (
			<div className={'calendarDay ' + this.props.highlight} onClick={this.handleClick}>
				<div>{this.props.each.day}</div>
				<div>{this.props.shiftTime}</div>	
				<div>{this.props.shiftArea}</div>							
			</div>		
		)
	}
})