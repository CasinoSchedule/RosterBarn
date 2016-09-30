import React from 'react';

require('assets/styles/footer.scss');

export default React.createClass({
	render: function(){
		return (
			<footer className='homePageFooter' style={{position: this.props.position}}>
				<p>&copy; 2016 RosterBarn Intellectual Property. All Rights Reserved. RosterBarn marks contained herein are trademarks of RosterBarn Intellectual </p>
				<p>Property and/or RosterBarn affiliated companies. All other marks are the property of their respective owners.</p>
			</footer>
		)
	}
})