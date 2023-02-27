import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Transactions from '../RecurringList.component';
import TransactionItem from '../RecurringDetail.component';

describe('Transactions component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Transactions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renderListItem should return TransactionItem', () => {
    const wrapper = shallow(<Transactions />);
    const itemProp = {
      amount: '23131',
      currency: '',
      description: 'somedesc',
      date: '12/01/1993',
      getDetailTransactionHistory: [],
      renderListItemDeleteTransaction: [],
    };
    expect(wrapper.instance().renderListItem(itemProp)).toEqual(<TransactionItem {...itemProp}/>);
  });
});
