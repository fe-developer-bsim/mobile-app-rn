import React from 'react';
import renderer from 'react-test-renderer';
import SILInformasiTnC from '../SILInformasiTnC.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

jest.mock('../SILInformasiTnC.page');
const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'testForm'})(SILInformasiTnC);
describe('SILInformasiTnC', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
