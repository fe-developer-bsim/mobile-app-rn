import React from 'react';
import renderer from 'react-test-renderer';
import FaceRecogEULA from '../FaceRecogEULA.component';

describe('FaceRecogEULA Componenent: Profile', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FaceRecogEULA/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
