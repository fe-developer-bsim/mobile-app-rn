import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, Keyboard} from 'react-native';
import noop from 'lodash/noop';
import {formatFieldAccount} from '../../utils/transformer.util';

class EasyPinInput extends React.Component {
  state = {
    maxLength: 6,
    value: ''
  }

  handleValidate = () => {
    Keyboard.dismiss();
  }

  static propTypes = {
    input: PropTypes.object,
    style: PropTypes.object,
    secureTextEntry: PropTypes.bool,
    changeEasyPin: PropTypes.func,
    dispatch: PropTypes.func,
    isOBMActive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  }
  static defaultProps = {
    input: {
      onChange: noop
    },
    submitHandler: noop,
  }

  handleEasyPinChange = (pin) => {
    const {input, changeEasyPin} = this.props;
    const newPin = String(formatFieldAccount(pin));
    this.setState({value: newPin});
    if (newPin.length >= this.state.maxLength) {
      const encryptedEasyPin = formatFieldAccount(pin);
      input.onChange(pin);
      changeEasyPin(encryptedEasyPin, pin);
      this.handleValidate();
    } else {
      input.onChange(formatFieldAccount(pin));
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({value: newProps.input.value});
  }

  render () {
    const {style, secureTextEntry = true} = this.props;
    return <TextInput underlineColorAndroid='transparent' onChangeText={this.handleEasyPinChange} style={style}
      value={this.state.value} keyboardType='numeric' maxLength={6} secureTextEntry={secureTextEntry}/>;
  }
}

export default EasyPinInput;
