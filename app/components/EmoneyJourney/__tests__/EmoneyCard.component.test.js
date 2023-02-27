import React from 'react';
import renderer from 'react-test-renderer';

import EmoneyCard from '../EmoneyCard.component';

describe('EmoneyCard component', () => {
  xit('EmoneyCard: renders correctly', () => {
    const setDefaultAccEmoney = {};
    const tree = renderer.create(<EmoneyCard setDefaultAccEmoney={setDefaultAccEmoney}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
