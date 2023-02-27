import React from 'react';
import renderer from 'react-test-renderer';

import Confirmation from '../Confirmation.component';

describe('Confirmation component', () => {
  it('Confirmation: renders correctly', () => {
    const tree = renderer.create(<Confirmation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
