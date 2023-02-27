import React from 'react';
import renderer from 'react-test-renderer';

import TabATM from '../TabATM.component';

jest.mock('../TabATM.component');
describe('TabATM component', () => {
  it('TabATM: renders correctly', () => {
    const tree = renderer.create(<TabATM />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
