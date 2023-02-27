import React from 'react';
import renderer from 'react-test-renderer';
import ElectricityIndex from '../ElectricityIndex.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

describe('MobileTopup component', () => {

  const spy = jest.fn();
  const store = createStore(() => ({}));
  const DecoratedForm = reduxForm({form: 'testForm', onSubmit: spy})(ElectricityIndex);

  it('renders correctly', () => {
    const onNewTopup = jest.fn();
    const handleCardClick = jest.fn();
    const recentTransactions = [{
      text: 'Irsyaad',
      subtext: '001 002 0023 0023'
    }, {
      text: 'Arsyaad',
      subtext: '1231 202 0023 6423'
    }, {
      text: 'Arsyaad',
      subtext: '1231 202 0023 6423'
    }];

    const billers = [{
      text: 'test1',
      subtext: 'test1'
    }, {
      text: 'test2',
      subtext: 'test2'
    }, {
      text: 'test3',
      subtext: 'test3'
    }];

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm onNewTopup={onNewTopup} billers={billers} handleCardClick={handleCardClick} recentTransactions={recentTransactions}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
