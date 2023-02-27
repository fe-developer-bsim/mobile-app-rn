import React from 'react';
import renderer from 'react-test-renderer';
import ElectricityIndex from '../ElectricityIndex.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({user: {}}));
const DecoratedForm = reduxForm({form: 'ElectricityIndex'})(ElectricityIndex);

describe('ElectricityIndex page', () => {
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
