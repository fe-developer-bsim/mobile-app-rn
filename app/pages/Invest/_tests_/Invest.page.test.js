import React from 'react';
import renderer from 'react-test-renderer';
import InvestPage from '../Invest.page';

describe('invest page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InvestPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
