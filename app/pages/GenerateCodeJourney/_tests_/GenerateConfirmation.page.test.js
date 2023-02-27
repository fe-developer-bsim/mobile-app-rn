import React from 'react';
import renderer from 'react-test-renderer';
import GenerateConfirmation from '../GenerateConfirmation.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'GenerateConfirmation'})(GenerateConfirmation);

describe('GenerateConfirmationJourney: GenerateConfirmation page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
