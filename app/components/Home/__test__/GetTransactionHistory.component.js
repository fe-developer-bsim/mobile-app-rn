import React from 'react';
import renderer from 'react-test-renderer';
import GetTransactionHistory from '../GetTransactionHistory.component';
import TransactionItem from '../../Transactions/TransactionItem.component';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('GetTransactionHistory component', () => {
  it('renders correctly', () => {
    const transactions = [{}, {}, {}];
    const tree = renderer.create(<GetTransactionHistory transactions={transactions}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders account items correctly', () => {
    const transactions = [{}, {}, {}];
    const wrapper = shallow(<GetTransactionHistory transactions={transactions}/>);
    const transactionItems = wrapper.find(TransactionItem);
    expect(transactionItems.length).toBe(3);
  });
});
