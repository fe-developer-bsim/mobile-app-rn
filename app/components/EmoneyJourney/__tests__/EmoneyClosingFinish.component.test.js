import React from 'react';
import renderer from 'react-test-renderer';
import EmoneyClosingFinish from '../EmoneyClosingFinish.component';

describe('EmoneyClosingFinish page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <EmoneyClosingFinish navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
