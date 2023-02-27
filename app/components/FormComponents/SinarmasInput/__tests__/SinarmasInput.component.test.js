import React from 'react';
import renderer from 'react-test-renderer';
import SinarmasInput from '../SinarmasInput.component';
import {TextField} from 'react-native-material-textfield';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

const onInputChangeSpy = jest.fn();
const onChangeTextSpy = jest.fn();
const onFocusSpy = jest.fn();
const onBlurSpy = jest.fn();

describe('FormComponent: SinarmasInput component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<SinarmasInput/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('SinarmasInput', () => {
    const wrapper = shallow(<SinarmasInput value={'test value'} onInputChange={onInputChangeSpy} onBlur={onBlurSpy} onFocus={onFocusSpy} onChangeText={onChangeTextSpy} ref/>);
    const instance = wrapper.instance();

    it('input change callback', () => {
      const input = wrapper.find(TextField);
      expect(input.at(0).props().value).toEqual('test value');
      instance._onChangeTextHandler({
        onInputChange: instance.props.onInputChange,
        onChange: instance.props.onChangeText}
      )('1111');
      expect(onChangeTextSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });

    it('Focus callback', () => {
      instance._inputRef = {};
      instance._onFocusHandler({
        onInputChange: instance.props.onInputChange,
        onFocus: instance.props.onFocus}
      )();
      expect(onFocusSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });

    it('Blur callback', () => {
      instance._inputRef = {};
      instance._onBlurHandler({
        onInputChange: instance.props.onInputChange,
        onBlur: instance.props.onBlur}
      )();
      expect(onBlurSpy).toBeCalled();
      expect(onInputChangeSpy).toBeCalled();
    });
  });
});
