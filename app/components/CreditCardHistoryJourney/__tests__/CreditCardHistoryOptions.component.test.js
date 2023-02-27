import React from 'react';
import renderer from 'react-test-renderer';
import HistoryHeaderOptions from '../HistoryHeaderOptions.component';
import noop from 'lodash/noop';

describe('HistoryHeaderOptions component', () => {
  const navigate = jest.fn();
  it('renders correctly', () => {
    const tree = renderer.create(<HistoryHeaderOptions navigate={navigate} dispatch={noop} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
