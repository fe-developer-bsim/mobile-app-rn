import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeTenForm from '../BillerTypeTenForm.component';

describe('BillerTypeTenForm component', () => {
  xit('renders correctly', () => {
    const accountInfo = {};
    const tree = renderer.create(<BillerTypeTenForm accountInfo={accountInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
