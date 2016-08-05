import React from 'react';
import EmployeeToSchedule from 'ui/employeeToSchedule';

require("assets/styles/employeeRow.scss");

export default React.createClass({
	render: function(){
		return (
			<div className="eachRowContainer">
				{this.props.employeeWeeklySchedule.map(function(item, i){
					return (
							<EmployeeToSchedule key={i}  item={item} areas={this.props.areas} />
						)
				}.bind(this))}
			</div>
		)
	}
})