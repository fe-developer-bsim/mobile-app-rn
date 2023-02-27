import React from 'react';
import renderer from 'react-test-renderer';
import TnCEmoney from '../TncEmoney.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

jest.mock('../TncEmoney.page');
const store = createStore(() => ({}));

describe('TncEmoney page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <TnCEmoney/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
