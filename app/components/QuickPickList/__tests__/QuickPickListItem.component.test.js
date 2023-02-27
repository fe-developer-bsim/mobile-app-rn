import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListItem from '../QuickPickListItem.component';

describe('QuickPickListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
