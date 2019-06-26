'use strict';

const e = React.createElement;

const primeButtonStyle = {
    fontWeight: '800',
    backgroundColor: 'yellow',
    borderColor: 'brown',
    color: 'brown',
    width: '100%',
    padding: '60px'
}

const fireButtonStyle = {
    fontWeight: '800',
    backgroundColor: 'red',
    borderColor: 'magenta',
    color: 'white',
    width: '100%',
    padding: '60px'
}

const cancelButtonStyle = {
    fontWeight: '800',
    backgroundColor: 'gray',
    borderColor: 'magenta',
    color: 'white',
    width: '100%',
    padding: '60px',
    marginBottom: '20px'
}


class FireButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { primed: false, fired: false };
    }

    render() {
        if (this.state.fired) {
            return e(
                'h3',
                null,
                'Enjoy! :-D'
            )
        }

        if (this.state.primed) {
            return [
                e(
                    'button',
                    { key: 'cancelButton', style: cancelButtonStyle, onClick: () => this.setState({ primed: false }) },
                    'CANCEL'
                ),
                e(
                    'button',
                    {
                        key: 'fireButton',
                        style: fireButtonStyle,
                        onClick: () => {
                            fetch('/fire', { method: 'POST' }).then(res => res.json()).then(json => {
                                if(json.fired) {
                                    this.setState({ fired: true })
                                }
                            })
                        }
                    },
                    '~~~~~~ !!!  FIRE !!! ~~~~~~'
                )
            ]
        }

        return e(
            'button',
            { style: primeButtonStyle, onClick: () => this.setState({ primed: true }) },
            'PRIME'
        );
    }
}

const domContainer = document.querySelector('#fire_button_container');
ReactDOM.render(e(FireButton), domContainer);