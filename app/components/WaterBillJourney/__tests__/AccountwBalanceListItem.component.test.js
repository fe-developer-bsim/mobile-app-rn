import React from 'react';
import renderer from 'react-test-renderer';
import AccountwBalanceListItem from '../AccountwBalanceListItem.component';

describe('AccountwBalanceListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AccountwBalanceListItem accountNumber='1' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
