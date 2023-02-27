import React from 'react';
import renderer from 'react-test-renderer';

import ChooseServices from '../ChooseServices.component';

describe('ChooseServices component', () => {
  it('ChooseServices: renders correctly', () => {
    const tree = renderer.create(<ChooseServices />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
