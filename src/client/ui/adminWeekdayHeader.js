import React from 'react';
import {v4} from 'uuid';

require('assets/styles/adminWeekdayHeader.scss');

export default React.createClass({
	render: function(){
		return (
			<div className="weekOf">
				<div className="roster employee">
					<div><span className="letter">R</span>oster</div>
					<div><i className="fa fa-user-plus" aria-hidden="true" onClick={this.addEmployee}></i></div>
				</div>
				
				{this.props.weeklyCalendar.map(function(item, i){
					return (
							<div key ={v4()} className="weekOfDay">
								<p>{item.dayString}<span>&#160;</span> {item.day}</p>
							</div>
					)
				}.bind(this))}  
				
			</div>
		)
	}
})