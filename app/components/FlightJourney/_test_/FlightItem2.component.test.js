import React from 'react';
import renderer from 'react-test-renderer';

import FlightItem2 from '../FlightItem2.component';

describe('FlightItem2 component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FlightItem2 name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
