import React from 'react';
import renderer from 'react-test-renderer';
import MerchantDeals from '../MerchantDeals.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'offersForm'})(MerchantDeals);

describe('MerchantDeals: MerchantDeals page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
