import React from 'react';
import renderer from 'react-test-renderer';
import TransactionDetailMgm from '../TransactionDetailMgm.page';

describe('Help: TransactionDetailMgm page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<TransactionDetailMgm/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
