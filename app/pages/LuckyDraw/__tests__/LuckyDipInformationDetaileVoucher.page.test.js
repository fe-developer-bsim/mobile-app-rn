import React from 'react';
import renderer from 'react-test-renderer';
import LuckyDipInformationDetaileVoucher from '../LuckyDipInformationDetaileVoucher.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('LuckyDipInformationDetaileVoucher: LuckyDipInformationDetaileVoucher page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <LuckyDipInformationDetaileVoucher/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
