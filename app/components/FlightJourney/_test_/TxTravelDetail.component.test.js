import React from 'react';
import renderer from 'react-test-renderer';

import TxTravelDetail from '../TxTravelDetail.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('TxTravelDetail component', () => {
  xit('TxTravelDetail: renders correctly', () => {
    const tree = renderer.create(<TxTravelDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
