import React from 'react';
import { connect } from 'react-redux'
import actions from './../../actions/moneyChange';

class MoneyAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            denom: ''
        }
    }
    changeState = (type, value) => {
        this.setState({
            [type]: value
        });
    }
    handleChange = (type, event) => {
        let value = event.target.value;
        let newValue = '';
        if (type === 'denom') {
            newValue = value.replace(/[^0-9]/g, '');
            if (newValue !== '') {
                newValue = Number(newValue);
            }
        }
        this.changeState(type, newValue);
    }
    onlyNumber = (e) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    triggerAddToDrawer = () => {
        const {
            denom
        } = this.state;
        const {
            setToDrawer,
            stateDrawer
        } = this.props;
        let obj = {
            denom: denom
        };
        let shouldAdd = true;
        for (let a = 0; a < stateDrawer.length; a++){
            let current = stateDrawer[a].denom;
            if (current === denom) {
                shouldAdd = false;
            }
        }
        if (shouldAdd) {
            let newArray = [];
            newArray.push(obj);
            setToDrawer(newArray)
            this.setState({denom: ''})
        }
    }
    render() {
        const {
            denom
        } = this.state;
        return (
            <div className="money-adder-container">
                <div className="money-adder-input--denom-wrapper">
                    <input type="text" value={denom} onKeyPress={(e) => this.onlyNumber(e)} onChange={(e) => { this.handleChange('denom', e) }} className="input" placeholder="Denom" />
                </div>
                <div className="money-adder-button--add-to-drawer-wrapper">
                    <button onClick={this.triggerAddToDrawer} className="trigger-button" disabled={(denom === '') ? true : false}>
                        Add Money to Drawer
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { moneyChange } = state
    return { ...moneyChange }
}

export default connect(mapStateToProps, actions)(MoneyAdder)
