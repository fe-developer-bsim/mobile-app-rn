import React from 'react';
import renderer from 'react-test-renderer';
import PlanTravel from '../PlanTravel.page';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(() => ({}));

describe('PlanTravel: PlanTravel page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <PlanTravel/>
    </Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
