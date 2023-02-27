import React from 'react';
import renderer from 'react-test-renderer';
import AccountInfoItemDetails from '../AccountInfoItemDetails.component';

describe('AccountInfoItemDetails component', () => {
  it('renders correctly', () => {
    const itemTheme = {
      accountType: 'CurrentAccount',
      styleType: 'savings'
    };
    const balances = {currency: 'Rp'};
    const tree = renderer.create(<AccountInfoItemDetails itemTheme={itemTheme} balances={balances}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
