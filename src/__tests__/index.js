// var expect = require('chai').expect;
// var request = require('request');

// it('Localhost:3000 running', function(done) {
//     request('http://localhost:3000/' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });

// it('Localhost:3000 running', function(done) {
//     request('http://localhost:3000/' , function(error, response, body) {
//         expect(document.querySelector('.money-adder-container')).to.exist;
//         done();
//     });
// });
import React from 'react';
import { shallow, mount  } from 'enzyme';
import App from './../containers/app';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MoneyAdder from './../containers/main/moneyAdder';
import MoneyDrawer from './../containers/main/moneyDrawer';
import MoneyExchangeAndCombinationResult from './../containers/main/moneyExchangeAndCombinationResult';
import configureStore from 'redux-mock-store';
import {createSerializer, toJson} from 'enzyme-to-json';

enzyme.configure({ adapter: new Adapter() });
const initialState = {};
const mockStore = configureStore();
let wrapper;
let store;
beforeEach(() => {
    store = mockStore(initialState)
})
it('MoneyAdder component rendered', () => {
    const wrapper = mount(
        <MoneyAdder store={store}/>
    );
    console.log(wrapper.debug())
    // expect(true).toEqual(true);
    expect(wrapper.find('.money-adder-container')).to.have.lengthOf(1);
});