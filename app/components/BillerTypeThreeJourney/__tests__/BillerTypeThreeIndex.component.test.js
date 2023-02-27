import React from 'react';
import renderer from 'react-test-renderer';
import BillerTypeThreeIndex from '../BillerTypeThreeIndex.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

describe('BillerTypeThreeIndex component', () => {

  const spy = jest.fn();
  const store = createStore(() => ({}));
  const DecoratedForm = reduxForm({form: 'testForm', onSubmit: spy})(BillerTypeThreeIndex);

  it('renders correctly', () => {

    const tree = renderer.create(
      <Provider store={store}>
        <DecoratedForm />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
