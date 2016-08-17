import React from 'react';
import LogoText from 'ui/logoText';
import { browserHistory } from 'react-router';

require('assets/styles/landingPage.scss');
var image = require('assets/images/iphoneWBorder.png');


export default React.createClass({
	login: function(e){
		e.preventDefault();
		browserHistory.push('/home');
	},
	render: function(){
		return (
			<div className="landingPageContainer">
			<div className='landingPageHeader'>
				
			</div>
				<div className='homeImageContainer'>
					{/* <div className='logoPosition'>
						<LogoText />
					</div>
					
					<div className='pitchText'>
						<div>When what you have</div>
						<div className='indentText'>Needs more than a little Polish</div>
					</div> */}
				</div>
				<div className='iphoneBox'>
				<div className='iphoneContainer'><img src={image}/></div>
				</div>
			</div>
		)
	}
})