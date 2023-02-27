import React from 'react';
import renderer from 'react-test-renderer';

import QRTerminalList from '../QRTerminalList.component';

describe('QRTerminalList component', () => {
  it('QRTerminalList: renders correctly', () => {
    const tree = renderer.create(<QRTerminalList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
