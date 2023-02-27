import React from 'react';
import renderer from 'react-test-renderer';
import FormDataBeneficiaryPAForm from '../FormDataBeneficiaryPA.component';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(FormDataBeneficiaryPAForm);

describe('FormDataBeneficiaryPAForm: form page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
