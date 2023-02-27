import React from 'react';
import renderer from 'react-test-renderer';
import SavingSourceAccount from '../SavingSourceAccount.component';

describe('SavingSourceAccount component', () => {
  xit('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<SavingSourceAccount accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
