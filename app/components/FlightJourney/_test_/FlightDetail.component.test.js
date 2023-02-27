import React from 'react';
import renderer from 'react-test-renderer';

import FlightDetail from '../FlightDetail.component';

describe('FlightDetail component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FlightDetail name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
