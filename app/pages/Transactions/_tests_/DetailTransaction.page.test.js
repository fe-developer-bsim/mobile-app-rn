import React from 'react';
import renderer from 'react-test-renderer';
import FAQform from '../TransactionDetail.page';

describe('Help: FAQ page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FAQform/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
