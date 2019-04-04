import React from 'react';
import { shallow, mount  } from 'enzyme';
import App from './../../app';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MoneyAdder from './../money_adder';
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
    // console.log(wrapper.debug())
    expect(wrapper.find('.money-adder-container')).to.have.lengthOf(1);
});