import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import WaterBillSummary from '../WaterBillSummary.component';
import {SinarmasButton} from '../../FormComponents';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import Authenticate from '../../PaymentHelpers/Authenticate.component';
import set from 'lodash/set';


const confirmBillSpy = jest.fn();
const triggerAuthSpy = jest.fn();
const navigation = set({}, 'state.params.bill', {});

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm'
}
)(WaterBillSummary);

describe('WaterBillSummary Component: WaterBillSummary', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={confirmBillSpy} navigation={navigation} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit('confirm bill if it is not connected', () => {
    const wrapper = shallow(<WaterBillSummary handleSubmit={confirmBillSpy} triggerAuth={triggerAuthSpy} navigation={navigation}/>);
    const fields = wrapper.find(Authenticate);
    expect(fields.length).toEqual(1);
    expect(fields.first().props().visible).toEqual(false);
    expect(fields.last().props().visible).toEqual(false);
  });

  describe('WaterBillSummary Component: Show OTP modal when confirm the bill', () => {
    const wrapper = shallow(<WaterBillSummary handleSubmit={confirmBillSpy} triggerAuth={triggerAuthSpy} navigation={navigation} isConnected={true}/>);

    xit('submit confirm bill', () => {
      const confirmBillButton = wrapper.find(SinarmasButton).first();
      confirmBillButton.simulate('press');
      expect(confirmBillSpy).toBeCalled();
    });
  });
});
