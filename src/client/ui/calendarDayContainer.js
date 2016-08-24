import React from 'react';
import store from 'store';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'ui/dialog';

require('assets/styles/calendarDayContainer.scss');

export default React.createClass({
	render: function(){
		return (
			<div className='daySelectedContainer'>
				<div className='headerDay'>
					{((this.props.selected === this.props.today) ? 'Today' : 'Selected Day')}
				</div>	
				
					<div className='selectedDayInfo'>
						<div className='selectedDay'>{this.props.day}</div>
						<div className='selectedDayString'>{this.props.dayString}</div>
						<div className='selectedFullDateString'>{this.props.fullDateString}</div>
						<div className='divider'></div>
					</div>

					<div className='messageAndShift'>
						<div className='messageContainer'>
							<div>{this.props.message}</div>
						</div>
						<div className='shiftInfo'>
							<div className='timeInfo'>{this.props.time}</div>
							<div className='areaInfo'>{this.props.area}</div>
						</div>
						
					</div>

					<div className='divider'></div>
					<div className='shiftOptions'>
					{(this.props.time && this.props.eligible) 
						?	<div>
								<Dialog 
									fullDateString={this.props.fullDateString}
									updateMessage={this.props.updateMessage}
									callinLabel={'EARLY OUT'}
									title={'CONFIRM EARLY OUT REQUEST'} 
									dialog={'You are requesting an Early Out for your shift on ' + this.props.fullDateString + '.  Please confirm.'}/>
									
								<Dialog 
									fullDateString={this.props.fullDateString}
									updateMessage={this.props.updateMessage}
									callinLabel={'CALL IN'}
									title={'CONFIRM CALL IN'} 
									dialog={(this.props.moduleMessage) ? this.props.moduleMessage : 'You are calling out for your shift on ' + this.props.fullDateString + '.  Please confirm.'}
									callin={this.props.callin} />
								
								<Dialog 
									fullDateString={this.props.fullDateString}
									callinLabel={'GIVEAWAY SHIFT'}
									title={'CONFIRM SHIFT GIVEAWAY'} 
									dialog={'You are requesting to give away your shift on ' + this.props.fullDateString + '.  Please confirm.'}/>
								
								<Dialog 
									fullDateString={this.props.fullDateString}
									callinLabel={'SWITCH SHIFT'}
									title={'CONFIRM SHIFT SWITCH'} 
									dialog={'You are requesting to switch your shift on ' + this.props.fullDateString + '.  Please confirm.'}/>
							</div>
						: ''}
					</div> 
						
			</div>
		)
	}
})