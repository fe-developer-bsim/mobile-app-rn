import React from 'react';
import renderer from 'react-test-renderer';
import MainGenerateCode from '../MainGenerateCode.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'MainGenerateCode'})(MainGenerateCode);

describe('MainGenerateCodeJourney: MainGenerateCode page', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
