import React from 'react';
import renderer from 'react-test-renderer';
import CgvOrderItem from '../CgvOrderItem.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('CgvOrderItem component', () => {
  it('CgvOrderItem: renders correctly', () => {
    const tree = renderer.create(<CgvOrderItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
