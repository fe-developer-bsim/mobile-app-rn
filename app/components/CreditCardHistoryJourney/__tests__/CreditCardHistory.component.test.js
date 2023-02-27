import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import CreditCardHistory from '../CreditCardHistory.component';
import HistoryItem from '../../Transactions/TransactionItem.component';

describe('CreditCardHistory component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CreditCardHistory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  xit('renderListItem should return HistoryItem', () => {
    const wrapper = shallow(<CreditCardHistory />);
    const itemProp = {
      CCtransDetail: {},
      currency: '',
      currencyCC: 'IDR',
      getDetailTransactionHistory: {},
      index: undefined,
      transactionLength: 0,
      transactions: {
        currency: '',
        currencyCC: 'IDR',
        desc: 'somedesc',
        getDetailTransactionHistory: {},
        index: undefined,
        transactionLength: 0,
        trxAmt: '23131',
        trxAmtSign: 'D',
        postDate: '12/01/1993',
        hideIcon: true},
      trxAmt: '23131',
      trxAmtSign: 'D',
      desc: 'somedesc',
      postDate: '12/01/1993',
      hideIcon: true,
    };
    expect(wrapper.instance().renderListItem(itemProp)).toEqual(<HistoryItem {...itemProp}/>);
  });
});
