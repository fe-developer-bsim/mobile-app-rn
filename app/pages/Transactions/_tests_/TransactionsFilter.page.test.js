import React from 'react';
import renderer from 'react-test-renderer';
import TransactionsFilter from '../TransactionsFilter.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('TransactionsFilter page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <TransactionsFilter/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
