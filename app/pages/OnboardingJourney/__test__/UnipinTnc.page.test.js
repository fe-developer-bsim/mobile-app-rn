import React from 'react';
import renderer from 'react-test-renderer';
import UnipinTnc from '../UnipinTnc.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

jest.mock('../UnipinTnc.page');
const store = createStore(() => ({}));

describe('UnipinTnc page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <UnipinTnc/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
