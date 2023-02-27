import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import Switch from '../Switch.component';

describe('Switch component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Switch/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
