import React from 'react';
import renderer from 'react-test-renderer';
import VerifyEmailEmoney from '../VerifyEmailEmoney.component';

describe('VerifyEmailEmoney component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<VerifyEmailEmoney />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});