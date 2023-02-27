import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardInfo from '../CreditCardInfo.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import GetTransactionHistory from '../GetTransactionHistory.component';

describe('CreditCardInfo component', () => {
  const props = {
    accountList: [{}],
    transactionsCC: [{}, {}],
    creditCardDetail: {a: 1, dueDate: '2017-05-23T03:54:44.304Z', cardExpired: '2017-05-23T03:54:44.304Z'}
  };
  it('renders correctly', () => {
    const tree = renderer.create(<CreditCardInfo {...props}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders account tabs correctly', () => {
    const wrapper = shallow(<CreditCardInfo {...props}/>);
    const getTransaction = wrapper.find(GetTransactionHistory);
    expect(getTransaction.length).toBe(1);
  });
});
