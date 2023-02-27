import React from 'react';
import renderer from 'react-test-renderer';
import FingerprintModal from '../FingerprintModal.component.android';

describe('FingerprintModal component', () => {
  it('FingerprintModal: renders correctly', () => {
    const tree = renderer.create(<FingerprintModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
