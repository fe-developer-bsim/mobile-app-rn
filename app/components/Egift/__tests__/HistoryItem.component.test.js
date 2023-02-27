import React from 'react';
import renderer from 'react-test-renderer';

import HistoryItem from '../HistoryItem.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('HistoryItem component', () => {
  it('HistoryItem: renders correctly', () => {
    const tree = renderer.create(<HistoryItem/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
