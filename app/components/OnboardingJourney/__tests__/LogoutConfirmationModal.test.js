import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('lodash');

import LogoutConfirmationModal from '../LogoutConfirmationModal.component';

describe('LogoutConfirmationModal component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LogoutConfirmationModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
