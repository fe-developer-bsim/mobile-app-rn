import React from 'react';
import renderer from 'react-test-renderer';
import EmoneySuccessRegistration from '../EmoneySuccessRegistration.component';

describe('EmoneySuccessRegistration component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <EmoneySuccessRegistration/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
