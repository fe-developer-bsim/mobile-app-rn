import React from 'react';
import renderer from 'react-test-renderer';
import GenerateForm from '../GenerateForm.component';

describe('GenerateForm component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <GenerateForm/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
