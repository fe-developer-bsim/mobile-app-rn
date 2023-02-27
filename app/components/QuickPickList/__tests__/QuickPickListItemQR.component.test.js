import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListItemQR from '../QuickPickListItemQR.component';

describe('QuickPickListItemQR component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListItemQR />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
