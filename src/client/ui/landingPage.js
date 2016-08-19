import React from 'react';
import LogoText from 'ui/logoText';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import Drawer from 'ui/drawer';


require('assets/styles/landingPage.scss');
var image = require('assets/images/iphoneWBorder.png');
var image2 = require('assets/images/scheduleSS.png');
var image3 = require('assets/images/callinShot.png');
var image4 = require('assets/images/check.png');


export default React.createClass({
	login: function(e){
		e.preventDefault();
		browserHistory.push('/home');
	},
	render: function(){
		return (
			<div className="landingPageContainer">

			<div className='landingPageHeader'>
				<Drawer 
					title={'Welcome'} />
				
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
				<div className='sec1'>
					<div className='par1'>
						Head to the Barn  
					</div>
					<div className='par2'>
						Scheduling Made Easy. Customize your workplace in minutes.  
					</div>
					<div className='iphoneBox'>
						<div className='adminPic'><img src={image2}/></div>
					</div>
					
					<div className='iphoneBox'>
						<div className='iphoneContainer'><img src={image}/></div>
						<div className='iphoneContainer'><img src={image3}/></div>
						<div className='sec3'>
							<div className='par3'>
								<img src={image4}/> Never miss a shift or worry about tracking down your schedule again. It goes wherever you go.   
							</div>
							<div className='par3'>
								<img src={image4}/> Mobile notifications make call-ins and requests easy, fast and efficient.    
							</div>
							<div className='par3'>
								<img src={image4}/> Simply designed and simple to use. No learning curve or tutorials necessary. Just as easy as you want it to be.      
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})