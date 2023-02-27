import React from 'react';
import renderer from 'react-test-renderer';

import Locator from '../Locator.component';

jest.mock('../Locator.component');
describe('Locator component', () => {
  it('Locator: renders correctly', () => {
    const tree = renderer.create(<Locator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
