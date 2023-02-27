import React from 'react';
import renderer from 'react-test-renderer';
import TransactionItem from '../DetailTransaction.component';

describe('DetailTransaction component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TransactionItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
