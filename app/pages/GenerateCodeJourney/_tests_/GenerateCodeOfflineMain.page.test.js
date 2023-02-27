import React from 'react';
import renderer from 'react-test-renderer';
import GenerateCodeOfflineMain from '../GenerateCodeOfflineMain.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reduxForm} from 'redux-form';

const store = createStore(() => ({}));
const DecoratedForm = reduxForm({form: 'GenerateCodeOfflineMain'})(GenerateCodeOfflineMain);

describe('GenerateCodeOfflineMainJourney: GenerateCodeOfflineMain page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><DecoratedForm/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
