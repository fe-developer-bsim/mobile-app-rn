import React from 'react';
import renderer from 'react-test-renderer';

import FinalizeEmoney from '../FinalizeEmoney.component';

describe('FormError component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FinalizeEmoney name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
