import React from 'react';
import renderer from 'react-test-renderer';
import UltraVoucherTnc from '../UltraVoucherTnc.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

jest.mock('../UltraVoucherTnc.page');
const store = createStore(() => ({}));

describe('UltraVoucherTnc page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <UltraVoucherTnc/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
