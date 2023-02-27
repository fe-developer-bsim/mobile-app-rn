import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasPickerLine from '../SinarmasPickerLine.component';

describe('FormComponent: SinarmasPickerIOS component', () => {
  it('renders correctly', () => {
    const input = {value: {name: ''}};
    const labelKey = 'name';
    const currentValue = 'English';
    const tree = renderer.create(<SinarmasPickerLine input={input} labelKey={labelKey} currentValue={currentValue} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
