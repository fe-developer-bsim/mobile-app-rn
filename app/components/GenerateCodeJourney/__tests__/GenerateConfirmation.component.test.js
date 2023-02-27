import React from 'react';
import renderer from 'react-test-renderer';
import GenerateConfirmation from '../GenerateConfirmation.component';

describe('GenerateConfirmation component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <GenerateConfirmation/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
