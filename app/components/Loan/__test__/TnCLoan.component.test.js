import React from 'react';
import renderer from 'react-test-renderer';
import TnCLoan from '../TnCLoan.component';

jest.mock('../TnCLoan.component');
describe('TnCLoan component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TnCLoan/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
