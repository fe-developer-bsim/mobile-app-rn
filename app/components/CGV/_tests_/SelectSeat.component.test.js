import React from 'react';
import renderer from 'react-test-renderer';

import SelectSeat from '../SelectSeat.component';

describe('SelectSeat component', () => {
  xit('SelectSeat: renders correctly', () => {
    const tree = renderer.create(<SelectSeat />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
