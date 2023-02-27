import React from 'react';
import renderer from 'react-test-renderer';
import SummarySIL from '../SummarySil.component';

describe('SummarySIL component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SummarySIL />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
