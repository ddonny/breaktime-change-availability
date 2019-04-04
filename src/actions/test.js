import React from 'react';
import { shallow, mount  } from 'enzyme';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import moneyChangeActions from './moneyChange';
import constant from './../constants';
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
it('setToDrawer action return correctly', () => {
    const payload = {
        isFlag: true
    };
    const action = moneyChangeActions.setToDrawer(payload);
    expect(action).to.eql({
        type: constant.SET_TO_DRAWER,
        data: payload
    });
});