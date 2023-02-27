import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Transactions from '../Transactions.component';
import TransactionItem from '../TransactionItemPage.component';

describe('Transactions component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Transactions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renderListItem should return TransactionItem', () => {
    const wrapper = shallow(<Transactions />);
    const itemProp = {
      amount: '23131',
      index: undefined,
      isShariaAccount: undefined,
      transactionLength: 0,
      currency: '',
      description: 'somedesc',
      date: '12/01/1993',
      getDetailTransactionHistory: {}
    };
    expect(wrapper.instance().renderListItem(itemProp)).toEqual(<TransactionItem {...itemProp}/>);
  });
});
