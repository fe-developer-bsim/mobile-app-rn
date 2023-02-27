import React from 'react';
import renderer from 'react-test-renderer';
import FundTransferConfirmation from '../FundTransferConfirmation.component';
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
  triggerAuth: triggerAuthSpy,
  currentDate: 'Tue May 16 2017'
};
const wrapper = shallow(<FundTransferConfirmation {...props}/>);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(FundTransferConfirmation);

describe('FundTransferConfirmation component', () => {
  it('renders correctly', () => {

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm {...props}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('FundTransferConfirmation buttons', () => {
    const buttons = wrapper.find(Authenticate);
    expect(buttons.length).toEqual(1);
  });

  xit('submit confirm transfer', () => {
    const transferButton = wrapper.find(SinarmasButton).first();
    transferButton.simulate('press');
    expect(submitSpy).toBeCalled();
  });

});
