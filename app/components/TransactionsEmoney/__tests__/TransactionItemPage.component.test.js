import React from 'react';
import renderer from 'react-test-renderer';
import TransactionItem from '../TransactionItemPageEmoney.component';

describe('TransactionItemPage component', () => {
  it('renders correctly', () => {
    const amount = '10000';
    const tree = renderer.create(<TransactionItem amount={amount} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
