import React from 'react';
import renderer from 'react-test-renderer';
import DetailTransactionMgmComponent from '../DetailTransactionMgm.component';

describe('DetailTransaction component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DetailTransactionMgmComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
