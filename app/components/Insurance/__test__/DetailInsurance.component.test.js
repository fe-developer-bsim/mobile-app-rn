import React from 'react';
import renderer from 'react-test-renderer';
import DetailInsuranceComponent from '../DetailInsurance.component';

jest.mock('../DetailInsurance.component');
describe('DetailInsurance component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <DetailInsuranceComponent/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
