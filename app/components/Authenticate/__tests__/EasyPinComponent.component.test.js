import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import EasyPinComponent from '../EasyPinComponent.component';

describe('EasyPinComponent component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<EasyPinComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
