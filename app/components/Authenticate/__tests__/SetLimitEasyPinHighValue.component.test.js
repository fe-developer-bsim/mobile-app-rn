import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import EasyPinComponent from '../SetLimitEasyPinHighValue.component';

describe('EasyPinComponent component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<EasyPinComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
