import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import FlightAvailability2 from '../FlightAvailability2.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(FlightAvailability2);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('FlightAvailability2 Component: PaymentSelection', () => {
  xit('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
