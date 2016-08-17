import React, {Component} from 'react';

export default class PiClock extends Component {

  componentDidMount() {
    this.timer = setInterval(this.forceUpdate.bind(this), 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      this.clearInterval();
    }
  }

	render () {

	  var now = new Date();

	  var hours = now.getHours();
	  var minutes = now.getMinutes();
	  var seconds = now.getSeconds();

	  var textColor = 'black';
	  var bgColor = 'white';

	  if (hours < 10) {
	    hours = '0' + hours;
	  }

	  if (minutes < 10) {
	    minutes = '0' + minutes;
	  }

	  if (seconds < 10) {
	    seconds = '0' + seconds;
	  }

    var image;

    if (hours >= 7 && hours <= 7 + 12) {
      image = "wake.png";
    }
    else {
      image = "sleep.png";
      textColor = 'lightgray';
      bgColor = 'black';
    }

    return (
      <div style = {{
        width : '100%',
        height : '100%',
        textAlign : 'center',
        fontSize : '70px',
        textAlign : 'center',
        fontWeight : 'bold',
        color : textColor,
        backgroundColor : bgColor

      }}>
        <div><img src={"img/" + image}></img></div>
        <div style = {{ height : '80px'}}>
          { hours }:{ minutes }
        </div>
      </div>
    )
	}

}

