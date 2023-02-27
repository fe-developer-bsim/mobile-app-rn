import React from 'react';
import renderer from 'react-test-renderer';
import ImageConfirmationRetake from '../ImageConfirmationRetake.component';

describe('Investment component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ImageConfirmationRetake/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
