import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import noop from 'lodash/noop';
import {encryptText} from '../../utils/secure.util';
import {formatFieldAccount} from '../../utils/transformer.util';

class EasyPinInput extends React.Component {
  state = {
    maxLength: 6,
    value: ''
  }

  static propTypes = {
    input: PropTypes.object,
    style: PropTypes.object,
    secureTextEntry: PropTypes.bool,
    submitHandler: PropTypes.func
  }
  static defaultProps = {
    input: {
      onChange: noop
    },
    submitHandler: noop,
  }

  handleEasyPinChange = (pin) => {
    const {submitHandler, input} = this.props;
    const newPin = String(formatFieldAccount(pin));
    this.setState({value: newPin});
    if (newPin.length >= this.state.maxLength) {
      const encryptedEasyPin = encryptText(formatFieldAccount(pin));
      input.onChange(encryptedEasyPin);
      submitHandler(encryptedEasyPin);
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
      value={this.state.value} keyboardType='numeric' maxLength={6} secureTextEntry={secureTextEntry} autoFocus={true}/>;
  }
}

export default EasyPinInput;
