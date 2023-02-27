import React from 'react';
import renderer from 'react-test-renderer';
import CardLessWithdrawalSourceAccount from '../CardLessWithdrawalSourceAccount.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const spy = jest.fn();
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(CardLessWithdrawalSourceAccount);

describe('CardLessWithdrawalSourceAccount page', () => {
  it('renders correctly', () => {
    const getBalanceEmoney =  {};
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm navigate={spy} dispatch={spy} handleSubmit={spy} getBalanceEmoney={getBalanceEmoney}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
