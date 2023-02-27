import React from 'react';
import renderer from 'react-test-renderer';
import LuckyDipItemPrize from '../LuckyDipItemPrize.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('LuckyDipItemPrize: LuckyDipItemPrize page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <LuckyDipItemPrize/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
