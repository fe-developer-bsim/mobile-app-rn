import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListSearchItem from '../QuickPickListSearchItem.component';

describe('QuickPickListSearchItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListSearchItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
