import React from 'react';
import renderer from 'react-test-renderer';
import SuccessScreen from '../DigitalEFormSuccessScreen.component';

describe('SuccessScreen page', () => {
  it('renders correctly', () => {
    const navigation = {state: {params: {}}};
    const tree = renderer.create(
      <SuccessScreen navigation={navigation}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
