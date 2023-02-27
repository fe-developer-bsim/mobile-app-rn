import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasPickerBox from '../SinarmasPickerBox.component';

describe('FormComponent: SinarmasPickerIOS component', () => {
  it('renders correctly', () => {
    const input = {value: {name: ''}};
    const labelKey = 'name';
    const currentValue = 'English';
    const tree = renderer.create(<SinarmasPickerBox input={input} labelKey={labelKey} currentValue={currentValue} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
