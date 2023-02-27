import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeTimeout from '../GenerateCodeTimeout.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'GenerateCodeTimeout'})(GenerateCodeTimeout);

describe('GenerateCodeTimeoutJourney: GenerateCodeTimeout page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
