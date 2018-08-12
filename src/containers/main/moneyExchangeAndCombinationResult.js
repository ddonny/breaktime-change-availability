import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import actions from 'actions/moneyChange';

class MoneyExchangeAndCombinationResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceOfGoods: 27000,
            customerMoney: 50000,
            change: '',
            combinations: [],
            clicked: false
        }
    }
    componentDidMount() {
        this.processChange();
    }
    changeState = (type, value) => {
        this.setState({
            [type]: value
        });
    }
    wait(ms, data) {
        return new Promise(resolve => setTimeout(resolve.bind(this, data), ms));
    }

    async afterInputChanged(type, value) {
        const a = {
            result1: await this.wait(200,
                this.changeState(type, value)
            ),
            result2: await this.wait(200,
                this.processChange()
            )
        };
        return a
    }
    processChange = () => {
        const {
            priceOfGoods,
            customerMoney
        } = this.state;
        this.changeState('change', (customerMoney - priceOfGoods));
    }
    onlyNumber = (e) => {
        const re = /[0-9]+/g;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    handleChange = (type, event) => {
        let value = event.target.value;
        let newValue = '';
        if (type === 'priceOfGoods' || type === 'customerMoney') {
            newValue = value.replace(/[^0-9]/g, '');
            if (newValue !== '') {
                newValue = Number(newValue);
            }
        }
        this.afterInputChanged(type, newValue);
    }
    findCombinations = (feet, amounts, i, combo) => {
        if (feet <= 0 || i === amounts.length)
            return [combo];

        if (i === amounts.length - 1) {
            while (feet > 0) {
                combo.push(amounts[i]);
                feet -= amounts[i];
            }
            return [combo];
        }

        let combos = this.findCombinations(feet, amounts, i + 1, combo.slice());

        while (feet > 0) {
            combo.push(amounts[i]);

            feet -= amounts[i];

            combos = combos.concat(
                this.findCombinations(feet, amounts, i + 1, combo.slice())
            );
        }

        return combos;
    }
    triggerCalculateCombination = () => {
        const {
            change
        } = this.state;
        const {
            stateDrawer
        } = this.props;
        this.setState({
            combinations: []
        }, () => {
            let denoms = [];
            // transform to array of denom
            for (let a = 0; a < stateDrawer.length; a++) {
                denoms.push(stateDrawer[a].denom);
            }
            // sort by desc
            denoms.sort(function (a, b) { return b - a });
            let calcCombinations = this.findCombinations(change, denoms, 0, []);
            this.setState({
                combinations: calcCombinations,
                clicked: true
            });
        })
    };
    renderFinalCombination = (a, b, isLast) => {
        console.log('combinations', a);
        console.log('combinations', b);
        let countby = _.countBy(a);
        let newAppend = '';
        Object.keys(countby).map(function(key, index) {
            newAppend += ' ' + key + '(' + countby[key] + 'x) ';
        });
        if (!isLast) {
            return newAppend += ' or ';
        } else {
            return newAppend;
        }
    }
    render() {
        const {
            priceOfGoods,
            customerMoney,
            change,
            combinations,
            clicked
        } = this.state;
        const {
            stateDrawer
        } = this.props;
        let finalSolutions = 0;
        let finalCombinations = [];
        // ease stateDrawer to obj count
        let stateDrawerCountObj = {};
        for (var sd in stateDrawer) {
            stateDrawerCountObj[stateDrawer[sd].denom] = stateDrawer[sd].quantity;
        }
        if (combinations.length > 0) {
            // kalkulasi kemungkinan
            for (var a in combinations) {
                let sumTotalFromCombinations = _.sum(combinations[a]);
                let isASolution = false;
                if (sumTotalFromCombinations === change) {
                    isASolution = true;
                    let res = _.values(_.groupBy(combinations[a])).map(b => ({name: b[0], count: b.length}));
                    for (var c in res) {
                        let currentDenom = res[c].name;
                        let currentDenomQuantity = res[c].count;
                        if (currentDenomQuantity > stateDrawerCountObj[currentDenom]) {
                            isASolution = false;
                        }
                    }
                }
                if (isASolution) {
                    finalSolutions += 1;
                    finalCombinations.push(combinations[a]);
                }
            }
        }
        return (
            <div className="money-exchange-result-container">
                <div className="intro">
                    <div className="intro-text">Customer paying goods with price of: </div>
                    <input type="text" className="input" onKeyPress={(e) => this.onlyNumber(e)} defaultValue={priceOfGoods} onChange={(e) => { this.handleChange('priceOfGoods', e) }} placeholder="Price of Goods" />
                    <div className="intro-text"> with money of: </div>
                    <input type="text" className="input" onKeyPress={(e) => this.onlyNumber(e)} defaultValue={customerMoney} onChange={(e) => { this.handleChange('customerMoney', e) }} placeholder="Customer Money" />
                    <div className="intro-text"> His/Her change: </div>
                    <input type="text" className="input" value={change} placeholder="Change" disabled={true} />
                </div>
                <button onClick={this.triggerCalculateCombination} className="trigger-button" disabled={(priceOfGoods === '' || customerMoney === '' || Number(change) < 0) ? true : false}>
                    Calculate Combination
                </button>
                <div className="result-wrapper">
                    <div className="label">Result</div>
                    <div className="result">
                        {
                            (clicked && finalSolutions && finalSolutions > 0) ? (
                                <div>
                                    <div>{finalSolutions} combinations available.</div>
                                    {
                                        finalCombinations.map((a, b) =>
                                            this.renderFinalCombination(a, b, ((b === finalSolutions - 1) ? true : false))
                                        )
                                    }
                                </div>
                            ) : (clicked && finalSolutions === 0) ? (
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
