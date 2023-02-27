import React from 'react';
import renderer from 'react-test-renderer';
import FlightDetail from '../FlightDetail.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const spy = jest.fn();
const store = createStore(() => ({}));

describe('FlightDetail page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <FlightDetail mockDate={true} navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
