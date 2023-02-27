import React from 'react';
import renderer from 'react-test-renderer';
import NButtonTrf from '../NButtonTrf.component';

describe('NButtonTrf component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NButtonTrf />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
