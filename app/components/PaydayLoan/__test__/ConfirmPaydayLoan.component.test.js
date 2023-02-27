import React from 'react';
import renderer from 'react-test-renderer';
import OverlaySpinner from '../ConfirmPaydayLoan.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('Payloan component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OverlaySpinner/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
