import React from 'react';
import renderer from 'react-test-renderer';
import CreditCardHistoryOptions from '../CreditCardHistoryOptions.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CreditCardHistoryOptions);

describe('CreditCardHistoryOptions page', () => {
  it('renders correctly', () => {
    const rangeOptions = [
      {value: 'currPeriod', label: 'Current Statement'},
      {value: 'prevPeriod', label: '1 Billing Cycle Ago'},
      {value: 'prev2Period', label: '2 Billing Cycle Ago'}
    ];
    const networkStatus = {isConnected: true};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm handleSubmit={spy} rangeOptions={rangeOptions} isConnected={networkStatus}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
