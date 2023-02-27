import React from 'react';
import renderer from 'react-test-renderer';
import SavingAccounts from '../SavingAccounts.component';

describe('SavingAccounts component', () => {
  it('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<SavingAccounts accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
