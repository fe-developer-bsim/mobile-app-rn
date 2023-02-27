import React from 'react';
import renderer from 'react-test-renderer';
import Component from '../TextBoxWithSpinner.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(Component);

describe('Text Box with Spinner (when onBlur) component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <DecoratedForm/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


