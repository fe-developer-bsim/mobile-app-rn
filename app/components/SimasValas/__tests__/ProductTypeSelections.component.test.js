import React from 'react';
import renderer from 'react-test-renderer';

import ProductTypeSelections from '../ProductTypeSelections.component';

describe('ProductTypeSelections component', () => {
  it('ProductTypeSelections: renders correctly', () => {
    const tree = renderer.create(<ProductTypeSelections />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
