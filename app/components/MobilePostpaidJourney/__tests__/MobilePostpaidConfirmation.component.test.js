import React from 'react';
import renderer from 'react-test-renderer';
import MobilePostpaidConfirmation from '../MobilePostpaidConfirmation.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {SinarmasButton} from '../../FormComponents';
import Authenticate from '../../PaymentHelpers/Authenticate.component';

const submitSpy = jest.fn();
const triggerAuthSpy = jest.fn();
const props = {
  formValues: {myAccount: {}},
  payee: {},
  isConnected: true,
  handleSubmit: submitSpy,
  triggerAuth: triggerAuthSpy
};
const wrapper = shallow(<MobilePostpaidConfirmation {...props}/>);

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(MobilePostpaidConfirmation);

describe('MobilePostpaidConfirmation component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm {...props}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('MobilePostpaidConfirmation Authenticate', () => {
    const fields = wrapper.find(Authenticate);
    expect(fields.length).toEqual(1);
  });

  xit('submit confirm mobile topup', () => {
    const transferButton = wrapper.find(SinarmasButton).first();
    transferButton.simulate('press');
    expect(triggerAuthSpy).toBeCalled();
    expect(wrapper.state('authToggle')).toEqual(true);
    const fields = wrapper.find(Authenticate);
    expect(fields.first().props().visible).toEqual(true);
  });

  xit('OTP modal should be closed properly', () => {
    wrapper.instance().onModalClose();
    const fields = wrapper.find(Authenticate);
    expect(fields.props().visible).toEqual(false);
  });

  xit('Mobile topup submitted properly', () => {
    wrapper.instance().onModalSubmit();
    expect(wrapper.state('authToggle')).toEqual(false);
    expect(submitSpy).toBeCalled();
  });

});
