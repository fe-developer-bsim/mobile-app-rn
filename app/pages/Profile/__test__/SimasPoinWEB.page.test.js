import React from 'react';
import renderer from 'react-test-renderer';
import SimasPoinPage from '../SimasPoinWEB.page';

jest.mock('../SimasPoinWEB.page');
describe('Profile : SimasPoin', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SimasPoinPage/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
