import React from 'react';
import renderer from 'react-test-renderer';
import Touchable from '../Touchable.component.ios';

describe('Touchable component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Touchable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
