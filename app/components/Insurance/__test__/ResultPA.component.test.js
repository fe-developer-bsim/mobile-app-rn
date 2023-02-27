import React from 'react';
import renderer from 'react-test-renderer';
import ResultPAComponent from '../ResultPA.component';

describe('ResultPA component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ResultPAComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
