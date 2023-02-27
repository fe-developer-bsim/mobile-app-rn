import React from 'react';
import renderer from 'react-test-renderer';
import Register from '../RegisterPin.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'RegisterPin'})(Register);

describe('OnboardingJourney: Register PIN page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <DecoratedForm scramble={false}/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
