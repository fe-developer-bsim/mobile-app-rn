import React from 'react';
import renderer from 'react-test-renderer';
import SimasPoinComponent from '../SimasPoinWEB.component';

jest.mock('../SimasPoinWEB.component');
describe('Profile : SimasPoin', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SimasPoinComponent navigateTo={jest.fn()} changeLanguage={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
