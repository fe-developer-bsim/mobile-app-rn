import React from 'react';
import renderer from 'react-test-renderer';

import TabShopping from '../TabShopping.component';

describe('TabShopping component', () => {
  it('TabShopping: renders correctly', () => {
    const tree = renderer.create(<TabShopping />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
