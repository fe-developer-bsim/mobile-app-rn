import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyTopup from '../EmoneyTopup.component';

describe('AccountListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EmoneyTopup/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
