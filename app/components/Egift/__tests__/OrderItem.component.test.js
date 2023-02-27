import React from 'react';
import renderer from 'react-test-renderer';

import OrderItem from '../OrderItem.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('OrderItem component', () => {
  it('OrderItem: renders correctly', () => {
    const tree = renderer.create(<OrderItem/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
