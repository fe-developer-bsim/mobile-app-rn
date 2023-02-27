import React from 'react';
import renderer from 'react-test-renderer';

import DrawItem from '../DrawItem.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('DrawItem component', () => {
  it('DrawItem: renders correctly', () => {
    const tree = renderer.create(<DrawItem/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
