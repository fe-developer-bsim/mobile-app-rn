import React from 'react';
import renderer from 'react-test-renderer';

import SortingFlightModal from '../SortingFlightModal.component';

describe('SortingFlightModal component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SortingFlightModal name='success'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
