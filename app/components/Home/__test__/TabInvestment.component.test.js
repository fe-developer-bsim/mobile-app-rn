import React from 'react';
import renderer from 'react-test-renderer';
import TabInvestment from '../TabInvestment.component';


describe('TabInvestment component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<TabInvestment />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
