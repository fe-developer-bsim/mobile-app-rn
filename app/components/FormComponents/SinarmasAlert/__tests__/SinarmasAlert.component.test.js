import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import SinarmasAlert from '../SinarmasAlert.component';

describe('SinarmasAlert component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SinarmasAlert visible={false}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
