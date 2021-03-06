var Time = React.createClass({
	timeFormat: function(t) {
		return t < 10 ? "0"+t : t;
	},
	render: function() {
		return (
			<div id="now" className="animated infinite">
				{this.timeFormat(this.props.min)}  :  {this.timeFormat(this.props.sec)}
			</div>
		);
	}
});

var countTimer;
var options = [];
for( var i = 0; i < 60; i++ ) {
	options.push( <option value={i}>{i}</option> );
}

var Minutes = React.createClass({
	render: function() {
		return (
			<select id="min" className="form-control" onChange={this.props.onChange}>
				{options}
			</select>
		);
	}
});

var Seconds = React.createClass({
	render: function() {
		return (
			<select id="sec" className="form-control" onChange={this.props.onChange}>
				{options}
			</select>
		);
	}
});

var Card = React.createClass({
	render: function() {
		return (
			<div id="card" className="animated">
				<div className="title">SET TIMER</div>
				<h5>MINUTES:</h5>
				<Minutes onChange={this.props.onMinutesChange} />
				<h5>SECONDS:</h5>
				<Seconds onChange={this.props.onSecondsChange} />
				<div className="btn" onClick={this.props.timerStart}>GO</div>
			</div>
		);
	}
});

var Timer = React.createClass({
	getInitialState: function() {
		return { minutes: 0, seconds: 0, total: 0 };
	},
	handleMinutesChange: function(e) {
		this.setState({ minutes: e.target.value });
	},
	handleSecondsChange: function(e) {
		this.setState({ seconds: e.target.value });
	},
	startTimer: function() {
		if( this.state.minutes == 0 && this.state.seconds == 0 )
			alert('請設定時間');
		else {
			this.setState({ total: parseInt(this.state.minutes*60)+parseInt(this.state.seconds) });
			countTimer = setInterval( function(){
				var newTotal = this.state.total-1

				this.setState({
					minutes: Math.floor(newTotal/60),
					seconds: newTotal%60,
					total: this.state.total-1
				});

				if( newTotal == 0 ) {
					clearInterval( countTimer );
					document.getElementById('now').className += ' shake';
					setInterval( function() {
						document.body.style.backgroundColor = '#F44336';
						document.title = "Time\'s up !!";
						setTimeout( function() {
							document.body.style.backgroundColor = 'white';
							document.title = "React Timer";
						}, 500);
					}, 1000);
				}
			}.bind(this), 1000);

			document.getElementById('card').className += ' fadeOutUp';
		}
	},
	render: function() {
		return (
			<div>
				<Time min={this.state.minutes} sec={this.state.seconds} />
				<Card onMinutesChange={this.handleMinutesChange} onSecondsChange={this.handleSecondsChange} timerStart={this.startTimer} />
			</div>
		);
	}
});

ReactDOM.render(
	<Timer />, document.getElementById('container')
);