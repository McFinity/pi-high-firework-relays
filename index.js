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

const detonateButtonStyle = {
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
        this.state = { primed: false, detonated: false };
    }

    render() {
        if (this.state.detonated) {
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
                        key: 'detonateButton',
                        style: detonateButtonStyle,
                        onClick: () => {
                            fetch('/detonate', { method: 'POST' }).then(res => res.json()).then(json => {
                                if (json.detonated) {
                                    this.setState({ detonated: true })
                                }
                            })
                        }
                    },
                    '~~~~~~ !!!  detonate !!! ~~~~~~'
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

const domContainer = document.querySelector('#detonate_button_container');
ReactDOM.render(e(FireButton), domContainer);