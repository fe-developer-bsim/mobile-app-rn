import React from 'react';
import renderer from 'react-test-renderer';

import CgvTab from '../CgvTab.component';

describe('CgvTab component', () => {
  xit('CgvTab: renders correctly', () => {
    const tree = renderer.create(<CgvTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
