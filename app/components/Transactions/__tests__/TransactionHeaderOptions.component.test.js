import React from 'react';
import renderer from 'react-test-renderer';
import TransactionHeaderOptions from '../TransactionHeaderOptions.component';
import noop from 'lodash/noop';

describe('TransactionHeaderOptions component', () => {
  const navigate = jest.fn();
  it('renders correctly', () => {
    const tree = renderer.create(<TransactionHeaderOptions navigate={navigate} dispatch={noop} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
