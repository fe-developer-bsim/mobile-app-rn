import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Transactions from '../TransactionsEmoney.component';
import TransactionItem from '../TransactionItemPageEmoney.component';

describe('Transactions component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Transactions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renderListItem should return TransactionItem', () => {
    const wrapper = shallow(<Transactions />);
    const itemProp = {
      currency: '',
      getDetailTransactionHistory: {}
    };
    expect(wrapper.instance().renderListItem(itemProp)).toEqual(<TransactionItem {...itemProp}/>);
  });
});
