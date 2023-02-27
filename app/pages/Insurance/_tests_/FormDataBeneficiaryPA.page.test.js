import React from 'react';
import renderer from 'react-test-renderer';
import FormDataBeneficiaryPA from '../FormDataBeneficiaryPA.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('FormDataBeneficiaryPA: FormDataBeneficiaryPA page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <FormDataBeneficiaryPA/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
