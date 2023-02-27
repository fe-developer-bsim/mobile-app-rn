import React from 'react';
import renderer from 'react-test-renderer';
import Confirmation from '../Confirmation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const spy = jest.fn();
const store = createStore(() => ({}));

describe('Egift Confirmation page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <Confirmation navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
