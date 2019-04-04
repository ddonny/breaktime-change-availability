import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions/moneyChange';
import MoneyAdder from './money_adder';
import MoneyDrawer from './money_drawer';
import MoneyExchangeAndCombinationResult from './money_exchange_combination';

class MainComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      change: []
    }
  }
  render() {
    return (
      <div className="container">
        <div className="flex-column">
          <MoneyAdder/>
          <MoneyDrawer/>
          <MoneyExchangeAndCombinationResult/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { moneyChange } = state
  return { ...moneyChange }
}

export default connect(mapStateToProps, actions)(MainComponent)
