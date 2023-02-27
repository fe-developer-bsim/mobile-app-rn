import React from 'react';
import renderer from 'react-test-renderer';
import CardLessWithdrawalPayment from '../CardLessWithdrawalPayment.component';

describe('CardLessWithdrawalPayment component', () => {
  xit('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<CardLessWithdrawalPayment accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
