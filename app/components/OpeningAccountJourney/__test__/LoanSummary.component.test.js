import React from 'react';
import renderer from 'react-test-renderer';
import SignSignatureLoan from '../SignSignatureOpeningAcc.component';

describe('SignSignatureLoan component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(
      <SignSignatureLoan/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
