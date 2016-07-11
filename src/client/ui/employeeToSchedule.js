import React from 'react';
import store from 'store';
import EachEmployeeOnSchedule from 'ui/eachEmployeeOnSchedule';

require('assets/styles/employeeToSchedule.scss');

export default React.createClass({
	render: function(){
		return (
					<div className="namesAcross">
						{this.props.item.map(function(thing, index){
							return (
								<EachEmployeeOnSchedule sched={this.props.sched} key={thing.uniqueId} thing={thing} />
							)
						}.bind(this))}
					</div>		
		)
	}
})