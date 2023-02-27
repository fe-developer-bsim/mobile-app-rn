import React from 'react';
import renderer from 'react-test-renderer';
import ProfileHeader from '../ProfileHeader.component';

describe('NavHeader Componenent: ProfileHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ProfileHeader navigate={jest.fn()} dispatch={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
