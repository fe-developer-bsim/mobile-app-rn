import React from 'react';
import renderer from 'react-test-renderer';
import QuickPickListItemSend from '../QuickPickListItemSend.component';

describe('QuickPickListItemSend component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<QuickPickListItemSend />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
