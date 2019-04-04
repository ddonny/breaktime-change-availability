import React from 'react';
import { shallow, mount  } from 'enzyme';
import App from './../../app';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MoneyDrawer from './../money_drawer';
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
it('MoneyDrawer component rendered', () => {
    const wrapper = mount(
        <MoneyDrawer store={store} stateDrawer={stateDrawer}/>
    );
    // console.log(wrapper.debug())
    expect(wrapper.find('.money-drawer-container')).to.have.lengthOf(1);
});