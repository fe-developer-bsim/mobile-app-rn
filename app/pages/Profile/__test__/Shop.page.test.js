import React from 'react';
import renderer from 'react-test-renderer';
import Shop from '../Shop.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const spy = jest.fn();
const store = createStore(() => ({}));

describe('Egift Shop page', () => {
  xit('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <Shop navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
