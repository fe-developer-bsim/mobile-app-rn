import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeTnc from '../GenerateCodeTnc.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'GenerateCodeTnc'})(GenerateCodeTnc);

describe('GenerateCodeTncJourney: GenerateCodeTnc page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
