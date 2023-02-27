import React from 'react';
import renderer from 'react-test-renderer';
import LoginPreference from '../SetDefaultAutoDebit.component';

describe('LoginPreference Componenent: Profile', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <LoginPreference/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
