import React from 'react';
import renderer from 'react-test-renderer';
import OrderDetail from '../OrderDetail.page';
import {createStore} from 'redux';

jest.mock('../OrderDetail.page');
const store = createStore(() => ({}));
describe('Profile : Order Detail', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <OrderDetail  store={store}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
