import React from 'react';
import { shallow, mount  } from 'enzyme';
import App from './../../app';
import enzyme from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import MoneyDrawer from './../money_drawer';
import configureStore from 'redux-mock-store';
import {createSerializer, toJson} from 'enzyme-to-json';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

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
it ('listenScrollEvent fired after scroll', () => {
    let wrapper = ReactTestUtils.renderIntoDocument(<MoneyDrawer store={store} stateDrawer={stateDrawer}/>);
    var scrollableContainer = ReactTestUtils.findRenderedDOMComponentWithClass(wrapper, 'money-drawer-container');
    console.log('scrollableContainer', scrollableContainer)
    scrollableContainer.scrollTop = 50;
    // ReactTestUtils.Simulate.scroll(scrollableContainer.getDOMNode(), { deltaY: 50 });
    expect(scrollableContainer.scrollTop).to.equal(50)
})