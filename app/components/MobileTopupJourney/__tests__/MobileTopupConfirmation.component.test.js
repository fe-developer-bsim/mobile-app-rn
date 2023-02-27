import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import MobileTopupConfirmation from '../MobileTopupConfirmation.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MobileTopupConfirmation);

describe('MobileTopup component', () => {

  it('renders correctly', () => {
    const spy = jest.fn();
    const accounts = [];
    const topupAmount = {};
    const biller = {};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} accounts={accounts} topupAmount={topupAmount} biller={biller} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('Modal should close', () => {
    const spy = jest.fn();
    const wrapper = shallow(<MobileTopupConfirmation handleSubmit={spy}/>);
    wrapper.instance().onModalClose();
    expect(wrapper.state('authToggle')).toBe(false);
  });

  xit('Modal pin should be shown', () => {
    const spy = jest.fn();
    const wrapper = shallow(<MobileTopupConfirmation handleSubmit={spy} triggerAuth={spy}/>);
    wrapper.instance().showModal();
    expect(wrapper.state('authToggle')).toBe(true);
  });

  xit('Modal should submit', () => {
    const spy = jest.fn();
    const wrapper = shallow(<MobileTopupConfirmation handleSubmit={spy}/>);
    wrapper.instance().onModalSubmit();
    expect(wrapper.state('authToggle')).toBe(false);
    expect(spy).toBeCalled();
  });

});
