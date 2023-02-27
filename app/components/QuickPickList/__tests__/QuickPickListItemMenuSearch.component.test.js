import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListItemMenuSearch from '../QuickPickListItemMenuSearch.component';

describe('QuickPickListItemMenuSearch component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<QuickPickListItemMenuSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
