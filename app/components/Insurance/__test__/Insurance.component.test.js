import React from 'react';
import renderer from 'react-test-renderer';
import InsuranceComponent from '../Insurance.component';

describe('Insurance component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InsuranceComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
