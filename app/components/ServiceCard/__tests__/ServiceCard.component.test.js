import React from 'react';
import renderer from 'react-test-renderer';
import ServiceCard from '../ServiceCard.component';
describe('Homescreen page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ServiceCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
