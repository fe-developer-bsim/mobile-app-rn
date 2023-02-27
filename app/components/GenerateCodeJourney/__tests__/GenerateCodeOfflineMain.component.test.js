import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeOfflineMain from '../GenerateCodeOfflineMain.component';

describe('GenerateCodeOfflineMain component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <GenerateCodeOfflineMain/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
