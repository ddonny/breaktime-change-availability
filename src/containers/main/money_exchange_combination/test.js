import React from 'react';
import { shallow, mount  } from 'enzyme';
import App from './../../app';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MoneyExchangeAndCombinationResult from './../money_exchange_combination';
import configureStore from 'redux-mock-store';
import {createSerializer, toJson} from 'enzyme-to-json';

enzyme.configure({ adapter: new Adapter() });
const initialState = {};
const mockStore = configureStore();
let wrapper;
let store;
let stateDrawer = [{denom: 100000}];
beforeEach(() => {
    store = mockStore(initialState)
})
it('MoneyExchangeAndCombinationResult component rendered', () => {
    const wrapper = mount(
        <MoneyExchangeAndCombinationResult store={store}/>
    );
    // console.log(wrapper.debug())
    expect(wrapper.find('.money-exchange-result-container')).to.have.lengthOf(1);
});