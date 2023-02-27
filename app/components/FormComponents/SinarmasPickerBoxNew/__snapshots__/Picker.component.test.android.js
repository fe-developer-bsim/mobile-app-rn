import React from 'react';
import renderer from 'react-test-renderer';
import AndroidPicker from '../Picker.component';

describe('FormComponent: AndroidPicker component', () => {
  it('renders correctly', () => {
    const options = [];
    const labels = [];
    const tree = renderer.create(<AndroidPicker options={options} labels={labels} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
