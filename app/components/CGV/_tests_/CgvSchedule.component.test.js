import React from 'react';
import renderer from 'react-test-renderer';

import CgvSchedule from '../CgvSchedule.component';

describe('CgvSchedule component', () => {
  xit('CgvSchedule: renders correctly', () => {
    const tree = renderer.create(<CgvSchedule />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
