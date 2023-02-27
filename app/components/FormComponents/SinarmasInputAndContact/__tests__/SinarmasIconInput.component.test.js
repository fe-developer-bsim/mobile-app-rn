import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasIconInput from '../SinarmasIconContactInput.component';

describe('FormComponent: SinarmasIconInput component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SinarmasIconInput iconName='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
