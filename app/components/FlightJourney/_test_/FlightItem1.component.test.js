import React from 'react';
import renderer from 'react-test-renderer';

import FlightItem from '../FlightItem1.component';

describe('FlightItem1 component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FlightItem name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
