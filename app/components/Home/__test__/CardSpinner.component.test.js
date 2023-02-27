import React from 'react';
import renderer from 'react-test-renderer';
import CardSpinner from '../CardSpinner.component';

describe('CardSpinner component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CardSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
