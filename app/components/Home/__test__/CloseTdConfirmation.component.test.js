import React from 'react';
import renderer from 'react-test-renderer';
import CloseTdConfirmation from '../CloseTdConfirmation.component';
import Authenticate from '../../PaymentHelpers/Authenticate.component';
import {SinarmasButton} from '../../FormComponents';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {reduxForm} from 'redux-form';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
jest.mock('react-timer-mixin');

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm'
})(CloseTdConfirmation);

const confirmBillSpy = jest.fn();
const triggerAuthSpy = jest.fn();

describe('TimeDepositInfo component', () => {
  xit('renders correctly', () => {
    const timeDepositDetail = {
      principal: 8000000.00,
      interestRate: 5.00,
      maturityType: 'ARO P',
      maturityTypeNew: 'P',
      maturityDate: '2017-04-10T07:19:38.081Z',
    };
    const accountList = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm timeDepositDetail={timeDepositDetail} accountList={accountList} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Close Time Deposit Confirmation Component: Show OTP modal when confirm the close TD', () => {

    const wrapper = shallow(<CloseTdConfirmation handleSubmit={confirmBillSpy} triggerAuth={triggerAuthSpy}/>).instance();

    xit('submit confirm close TD', async () => {
      const confirmBillButton = wrapper.find(SinarmasButton).first();
      confirmBillButton.simulate('press');
      wrapper.instance().showModal();
      expect(triggerAuthSpy).toBeCalled();
      expect(wrapper.state('authToggle')).toEqual(true);
      const fields = wrapper.find(Authenticate);
      expect(fields.first().props().visible).toEqual(true);
    });

    xit('OTP modal should be closed properly', () => {
      wrapper.instance().onModalClose();
      const fields = wrapper.find(Authenticate);
      expect(fields.first().props().visible).toEqual(false);
    });

    xit('close TD submitted properly', () => {
      wrapper.instance().onModalSubmit();
      expect(wrapper.state('authToggle')).toEqual(false);
      expect(confirmBillSpy).toBeCalled();
    });
  });
});
