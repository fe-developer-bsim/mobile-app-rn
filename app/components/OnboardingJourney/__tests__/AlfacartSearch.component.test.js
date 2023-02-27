import React from 'react';
import renderer from 'react-test-renderer';
import AlfacartSearch from '../AlfacartSearch.component';

describe('AlfacartSearch component', () => {
  xit('renders correctly', () => {
    const tree = renderer.create(<AlfacartSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
