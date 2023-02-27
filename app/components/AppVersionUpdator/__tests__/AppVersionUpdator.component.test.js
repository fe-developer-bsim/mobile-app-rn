import React from 'react';
import renderer from 'react-test-renderer';

import AppVersionUpdator from '../AppVersionUpdator.component';

describe('AppVersionUpdator component', () => {
  xit('AppVersionUpdator: renders correctly', () => {
    const tree = renderer.create(<AppVersionUpdator />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
