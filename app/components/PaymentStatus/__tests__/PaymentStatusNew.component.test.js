import React from 'react';
import renderer from 'react-test-renderer';
import PaymentStatusComponent from '../PaymentStatusNew.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(PaymentStatusComponent);

const onCloseSpy = jest.fn();

const mockedDate = new Date(1989, 7, 18);
global.Date = jest.fn(() => mockedDate); // eslint-disable-line no-undef

describe('PaymentStatusComponent component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm onClose={onCloseSpy}/>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
