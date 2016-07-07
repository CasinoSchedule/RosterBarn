import React from 'react';
import store from 'store';
import EachEmployeeOnSchedule from 'ui/eachEmployeeOnSchedule';

require('assets/styles/employeeToSchedule.scss');

export default React.createClass({
	getInitialProps: function(){

	},
	render: function(){
		return (
					<div key={this.props.i} className="namesAcross">
						{this.props.item.map(function(thing, index){
							return (
								<EachEmployeeOnSchedule sched={this.props.sched} thing={thing} index={index} />
						)
						}.bind(this))}
					</div>		
		)
	}
})