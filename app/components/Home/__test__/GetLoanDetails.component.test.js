import React from 'react';
import renderer from 'react-test-renderer';
import GetLoanDetails from '../GetLoanDetails.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('GetLoanDetails component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<GetLoanDetails/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
