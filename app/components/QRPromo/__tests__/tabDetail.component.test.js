import React from 'react';
import renderer from 'react-test-renderer';

import TabDetail from '../tabDetail.component';

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('TabDetail component', () => {
  it('TabDetail: renders correctly', () => {
    const tree = renderer.create(<TabDetail/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
