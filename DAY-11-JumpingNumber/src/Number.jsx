export default class Number extends React.Component {

	constructor() {
		super();
		this.state = { current: 2841, numClass: '' };
	}

	componentDidMount() {
		var timer = setInterval( () => {
			if( this.props.DataValue == this.state.current ) {
				clearInterval( timer );
			}
			else {
				this.setState({ current: this.state.current+1 });
			}
		}, 1);
		var classTimer = setInterval( () => {
			if( this.props.DataValue == this.state.current ) {
				clearInterval( classTimer );
			}
			else {
				var classNum = Math.floor( Math.random()*4 );
				switch( classNum ) {
					case 0:
						this.setState({ numClass: ' left' });
						break;
					case 1:
						this.setState({ numClass: ' top' });
						break;
					case 2:
						this.setState({ numClass: ' right' });
						break;
					default:
						this.setState({ numClass: ' bottom' });
						break;
				}
			}
		}, 100);
	}

	handleClass() {
		return `num${this.state.numClass}`;
	}

	render() {
		return (
			<div className="numBox">
				<div className={this.handleClass()}>{this.state.current}</div>
			</div>
		);
	}

}