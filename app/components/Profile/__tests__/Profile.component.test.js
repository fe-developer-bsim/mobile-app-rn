import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../Profile.component';

describe('Profile Componenent: Profile', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Profile navigateTo={jest.fn()} changeLanguage={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
