import React from 'react';
import renderer from 'react-test-renderer';
import Help from '../Help.page';

describe('Help: HELP page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Help/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
