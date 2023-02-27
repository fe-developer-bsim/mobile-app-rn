import React from 'react';
import renderer from 'react-test-renderer';

import TnCEmoney from '../TnCEmoney.component';

jest.mock('../TnCEmoney.component');
describe('FormError component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TnCEmoney name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
