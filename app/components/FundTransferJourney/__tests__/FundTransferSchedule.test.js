import React from 'react';
import renderer from 'react-test-renderer';
import FundTransferSchedule from '../FundTransferSchedule.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(FundTransferSchedule);

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('FundTransferSchedule component', () => {
  it('renders correctly', () => {
    const myAccount = {test: 'test'};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm formValues={myAccount} handleSubmit={spy} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
