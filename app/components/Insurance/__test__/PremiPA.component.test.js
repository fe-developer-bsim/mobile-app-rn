import React from 'react';
import renderer from 'react-test-renderer';
import PremiPAComponent from '../PremiPA.component';

describe('PremiPA component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <PremiPAComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
