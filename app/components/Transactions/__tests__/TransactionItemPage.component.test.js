import React from 'react';
import renderer from 'react-test-renderer';
import TransactionItem from '../TransactionItemPage.component';

describe('TransactionItemPage component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TransactionItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
