import React from 'react';
import renderer from 'react-test-renderer';
import CurrentSection from '../CurrentSectionForm.component';

describe('CurrentSection component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CurrentSection/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
