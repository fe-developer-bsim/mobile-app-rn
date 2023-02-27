import React from 'react';
import renderer from 'react-test-renderer';
import LuckyDip from '../MerchantShippingMethod.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('LuckyDip: LuckyDip page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <LuckyDip/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
