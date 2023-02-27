import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';
import TxTravelSeat from '../TxTravelSeat.component';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({
  form: 'testForm',
  onSubmit: spy
}
)(TxTravelSeat);

describe('TxTravelSeat Component: PaymentSelection', () => {
  it('renders correctly', () => {
    const formValues = {};
    const accounts = [];
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={formValues} accounts={accounts} mockDate={true}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
