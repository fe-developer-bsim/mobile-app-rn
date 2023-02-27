import React from 'react';
import renderer from 'react-test-renderer';
import MobileTopupPayment from '../MobileTopupPayment.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MobileTopupPayment);

describe('MobileTopupPayment component', () => {
  it('renders correctly', () => { // TODO: Remove X after fixing picker component for IOS, according to the refactored pickerandroid
    const myAccount = {test: 'test'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={myAccount} handleSubmit={spy} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onNext should call goToPayment', () => {
    const spy = jest.fn();
    const biller = {test: 'test'};
    const myAccount = {test: 'test'};
    const wrapper = shallow(<MobileTopupPayment onNextPress={spy} biller={biller} formValues={myAccount}/>);
    wrapper.instance().sendBiller();
    expect(spy).toBeCalledWith(biller);
  });

});
