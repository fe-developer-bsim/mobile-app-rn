import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasInputElips from '../SinarmasInputElips.component';

describe('FormComponent: SinarmasInputElips component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SinarmasInputElips/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
