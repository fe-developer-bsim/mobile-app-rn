import React from 'react';
import renderer from 'react-test-renderer';
import ElectricityPayment from '../ElectricityPayment.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({user: {}}));
const DecoratedForm = reduxForm({form: 'ElectricityPayment'})(ElectricityPayment);

describe('ElectricityPayment page', () => {
  it('renders correctly', () => {
    const navigation = {
      state: {
        params: {}
      }
    };
    const tree = renderer.create(<Provider store={store}><DecoratedForm navigation={navigation}/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
