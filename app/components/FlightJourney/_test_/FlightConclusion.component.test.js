import React from 'react';
import renderer from 'react-test-renderer';

import FlightConclusion from '../FlightConclusion.component';

describe('FlightConclusion component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FlightConclusion name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
