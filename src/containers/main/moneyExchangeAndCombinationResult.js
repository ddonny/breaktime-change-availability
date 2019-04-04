import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions/moneyChange';
import _ from 'lodash';

class MoneyExchangeAndCombinationResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountOfRupiahs: '',
            combinations: [],
            clicked: false
        }
    }
    changeState = (type, value) => {
        this.setState({
            [type]: value
        });
    }

    onlyNumber = (e) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    async afterInputChanged(type, value) {
        const a = {
            result1: await this.wait(200,
                this.changeState(type, value)
            ),
            result2: await this.wait(200,
                this.triggerCalculateCombination()
            )
        };
        return a
    }

    wait(ms, data) {
        return new Promise(resolve => setTimeout(resolve.bind(this, data), ms));
    }

    handleChange = (type, event) => {
        let value = event.target.value;
        let newValue = '';
        if (type === 'amountOfRupiahs') {
            newValue = value.replace(/[^0-9]/g, '');
            if (newValue !== '') {
                newValue = Number(newValue);
            }
        }
        this.afterInputChanged(type, newValue);
    }
    sumTotal = (acc, currentValue) => acc + currentValue;
    findCombinations = (amountLeftWillChangedNumber = 0, availableDenomsDesc, currentCombinations = [0]) => {
        // console.log('availableDenomsDesc', availableDenomsDesc)
        // console.log('amountLeftWillChangedNumber', amountLeftWillChangedNumber)
        // console.log('currentCombinations', currentCombinations)
        while (amountLeftWillChangedNumber > 0 && availableDenomsDesc.length > 0) {
            if (availableDenomsDesc[0] <= amountLeftWillChangedNumber) {
                amountLeftWillChangedNumber -= availableDenomsDesc[0];
                currentCombinations = [...currentCombinations, availableDenomsDesc[0]]
                this.findCombinations(amountLeftWillChangedNumber, availableDenomsDesc, currentCombinations)
            } 
            else {
                availableDenomsDesc = availableDenomsDesc.slice(1, availableDenomsDesc.length)
                this.findCombinations(amountLeftWillChangedNumber, availableDenomsDesc, currentCombinations)
            }
        }
        let finalCurrentCombinations = currentCombinations.filter(item => item > 0)
        return {
            combinations : finalCurrentCombinations,
            amountLeft: amountLeftWillChangedNumber
        };
    }
    triggerCalculateCombination = () => {
        const {
            amountOfRupiahs
        } = this.state;
        const {
            stateDrawer
        } = this.props;
        this.setState({
            combinations: []
        }, () => {
            let availableDenoms = [];
            // transform to array of denom
            for (let a = 0; a < stateDrawer.length; a++) {
                availableDenoms = [...availableDenoms, stateDrawer[a].denom]
            }
            // sort by desc
            let availableDenomsDesc = availableDenoms.sort(function(a, b){return b - a});
            let calcCombinations = this.findCombinations(amountOfRupiahs, availableDenomsDesc);
            this.setState({
                combinations: calcCombinations,
                clicked: true
            });
        })
    };

    renderFinalCombination = (combinations) => {
        let resultString = '';
        if (combinations && combinations.length > 0) {
            let counter = null;
            counter = _.countBy(combinations);
            if (counter) {
                Object.keys(counter).map(function(key, index) {
                    return resultString += `${counter[key]} X Rp${key}${(index !== Object.keys(counter).length-1) ? ', ' : ''} `
                })
            } else {
                return ''
            }
        }
        return resultString;
    }
    
    render() {
        const {
            amountOfRupiahs,
            combinations,
            clicked
        } = this.state;
        return (
            <div className="money-exchange-result-container">
                <div className="intro">
                    <div className="intro-text">Number of Rupiahs: </div>
                    <input type="text" className="input" onKeyPress={(e) => this.onlyNumber(e)} defaultValue={amountOfRupiahs} onChange={(e) => { this.handleChange('amountOfRupiahs', e) }} placeholder="Amount of Rupiahs" />
                </div>
                <button onClick={this.triggerCalculateCombination} className="trigger-button" disabled={(amountOfRupiahs === '') ? true : false}>
                    Find Short Combination
                </button>
                <div className="result-wrapper">
                    <div className="label">Result</div>
                    <div className="result">
                        {
                            (clicked && combinations.hasOwnProperty('combinations')) ? (
                                <div>
                                    <div>
                                    {
                                        this.renderFinalCombination(combinations.combinations)
                                    }
                                    </div>
                                    <div>
                                        {
                                            (combinations.hasOwnProperty('amountLeft') && combinations.amountLeft > 0) ? `\nleft: ${combinations.amountLeft} (no available fraction)` : ''
                                        }
                                    </div>
                                </div>
                            ) : (clicked) ? (
                                <div>No combinations available</div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { moneyChange } = state
    return { ...moneyChange }
}

export default connect(mapStateToProps, actions)(MoneyExchangeAndCombinationResult)
