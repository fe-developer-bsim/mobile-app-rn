import React from 'react';
import renderer from 'react-test-renderer';
import InvestmentComponent from '../Investment.component';

describe('Investment component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InvestmentComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
