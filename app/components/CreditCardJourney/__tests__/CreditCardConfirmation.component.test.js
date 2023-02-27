import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardConfirmation from '../CreditCardConfirmation.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import {SinarmasButton} from '../../FormComponents';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Authenticate from '../../PaymentHelpers/Authenticate.component';
import {Field} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardConfirmation);

const submitSpy = jest.fn();
const triggerAuthSpy = jest.fn();
const resendBillPayOTPSpy = jest.fn();
const props = {
  formValues: {
    amount: '100000'
  },
  isConnected: true,
  handleSubmit: submitSpy,
  triggerAuth: triggerAuthSpy,
  resendOTP: resendBillPayOTPSpy,
  currentDate: 'Tue May 16 2017',
  billDetails: {
    customerName: 'BURHAM'
  },
  biller: [{
    id: 47,
    name: 'Kartu Kredit Bank Sinarmas',
    path: '|_root||creditcard|'
  }]
};

describe('CreditCardConfirmation component', () => {

  const wrapper = shallow(<CreditCardConfirmation {...props}/>);

  const billDetails = {
    customerName: 'BURHAM'
  };
  const formValues = {
    amount: '100000'
  };
  const biller = [{
    id: 47,
    name: 'Kartu Kredit Bank Sinarmas',
    path: '|_root||creditcard|'
  }];

  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} billDetails={billDetails} formValues={formValues} biller={biller}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('submit confirm payment', () => {
    const submitButton = wrapper.find(SinarmasButton).first();
    expect(submitButton.props().disabled).toEqual(false);
    submitButton.simulate('press');
    expect(triggerAuthSpy).toBeCalled();
    expect(wrapper.state('authToggle')).toEqual(true);
  });

  xit('Payment submitted properly', () => {
    wrapper.instance().onModalSubmit();
    expect(wrapper.state('authToggle')).toEqual(false);
    expect(submitSpy).toBeCalled();
  });

  describe('No payees in the confirmation', () => {
    const newProps = {...props};
    const wrapper = shallow(<CreditCardConfirmation {...newProps}/>);
    xit('Hide field when the modal is hidden', () => {
      wrapper.instance().hideModal();
      const fields = wrapper.find(Field);
      expect(fields.last().props().visible).toEqual(false);
    });
  });

  describe('Confirmation with Payees', () => {
    const newProps = {...props, id: 111};
    const wrapper = shallow(<CreditCardConfirmation {...newProps}/>);
    xit('Hide Authenticate when the modal is hidden', () => {
      wrapper.instance().hideModal();
      const fields = wrapper.find(Authenticate);
      const authenticate = fields.last();
      expect(authenticate).toBeDefined();
      expect(authenticate.props().visible).toEqual(false);
    });

  });
});
