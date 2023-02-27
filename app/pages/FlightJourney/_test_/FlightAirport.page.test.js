import React from 'react';
import renderer from 'react-test-renderer';
import FlightAirportList from '../FlightAirportList.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const spy = jest.fn();
const store = createStore(() => ({}));

describe('Flight AirportList page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <Provider store={store}>
        <FlightAirportList mockDate={true} navigation={navigation} handleSubmit={spy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
