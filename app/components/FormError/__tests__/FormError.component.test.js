import React from 'react';
import renderer from 'react-test-renderer';

import FormError from '../FormError.component';

describe('FormError component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FormError name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
