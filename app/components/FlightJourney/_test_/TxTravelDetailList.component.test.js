import React from 'react';
import renderer from 'react-test-renderer';

import TxTravelDetailList from '../TxTravelDetailList.component';

describe('TxTravelDetailList component', () => {
  xit('TxTravelDetailList: renders correctly', () => {
    const tree = renderer.create(<TxTravelDetailList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
