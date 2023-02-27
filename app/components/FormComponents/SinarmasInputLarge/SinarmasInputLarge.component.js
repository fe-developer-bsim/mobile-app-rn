import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, Animated} from 'react-native';
import noop from 'lodash/noop';
import styles from './SinarmasInputLarge.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import {TextField} from 'react-native-material-textfield';

class SinarmasInputLarge extends Component {
  _inputRef = null
  _setRef = (ref) => {
    this._inputRef = ref; // ref is required to access the target value in case of onblur and onfocus
  }

  state = {
    isFocused: false,
    isSuccessInputText: false
  }

  componentWillReceiveProps (nextProps) {
    this._inputRef._lastNativeText = nextProps.input && nextProps.input.value;
  }

  componentWillMount () {
    const value = result(this.props, 'input.value', '');
    if (!isEmpty(value)) {
      this._animatedIsFocused = new Animated.Value(1);
    } else {
      this._animatedIsFocused = new Animated.Value(0);
    }
  }

  componentDidUpdate () {
    const lastNativeTextValue = result(this._inputRef, '_lastNativeText', '');
    const inputLastNativeText = result(this._inputRef, 'input._lastNativeText', '');
    const value = result(this._inputRef, 'props.value', '');
    let focused = false;
    if (!isEmpty(lastNativeTextValue) || !isEmpty(inputLastNativeText) || this.state.isFocused || !isEmpty(value)) {
      focused = true;
    }
    Animated.timing(this._animatedIsFocused, {
      toValue: focused ? 1 : 0,
      duration: 200,
    }).start();
  }

  // used _lastNativeText because android doesnt pass targetEvent in onBlur and onFocus
  _onBlurHandler = (inputProps) => () => {
    const {onBlur, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onBlur(val);
    onInputChange(val);
    if (!isEmpty(val)) {
      this.setState({isFocused: true});
    } else {
      this.setState({isFocused: false});
    }
  }

  _onFocusHandler = (inputProps) => () => {
    const {onFocus, onInputChange} = inputProps;
    const val = this._inputRef._lastNativeText;
    onFocus(val);
    onInputChange(val);
    this.setState({isFocused: true});
  }

  _onChangeTextHandler = (inputProps) => (val) => {
    const {onChange, onInputChange, isUseSuccessInputText, validationInput} = inputProps;
    onChange(val);
    onInputChange(val);
    if (isUseSuccessInputText && !isEmpty(val)) {
      const isValid = validationInput(inputProps, val);
      if (isValid) {
        this.setState({isSuccessInputText: true});
      } else {
        this.setState({isSuccessInputText: false});
      }
    } else {
      this.setState({isSuccessInputText: false});
    }
  }

  render () {
    const {meta, input = {}, value, onFocus = noop, onBlur = noop, onChangeText = noop, onInputChange = noop, disabled = false, placeholder = '', isUseSuccessInputText = false, typeField = 'text', setNewUsernameValue, setNewPasswordValue, usernameValue = '', passwordValue = '', oldPassword = '', validationInput, withoutBorder = true, ...extraProps} = this.props;
    const err = !disabled && (meta && meta.touched && !meta.active && meta.error);

    const onChange = onChangeText;

    const inputProps = {onChange, onFocus, onBlur, onInputChange, value, isUseSuccessInputText, typeField, setNewUsernameValue, usernameValue, setNewPasswordValue, passwordValue, oldPassword, validationInput, ...input};

    return (
      <View>
        { this.state.isSuccessInputText ?
          <View style={withoutBorder ? styles.complexFieldWithoutBorder : styles.complexField}>
            <View>
              <Text style={withoutBorder ? styles.currencyTextWithoutBorder : styles.currencyText}>Rp. </Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                {...extraProps}
                value={inputProps.value}
                textColor={disabled ? styles.tintColor.disabled : undefined}
                ref={this._setRef}
                style={withoutBorder ? styles.inputStyleWithoutBorder : styles.inputStyle}
                onChangeText={this._onChangeTextHandler(inputProps)}
                onFocus={this._onFocusHandler(inputProps)}
                onBlur={this._onBlurHandler(inputProps, input.value)}
                editable={!disabled}
                tintColor={ disabled ? styles.tintColor.disabled : styles.tintColor.successTextInput}
                label={''}
                baseColor={disabled ? styles.tintColor.disabled : styles.tintColor.successTextInput}
                placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
                autoCapitalize={'none'}
                disabled={disabled}
                disabledLineType={'solid'}/>
            </View>
            { withoutBorder ? 
              null
              :
              <View>
                <SimasIcon name='edit-amount' size={25} style={styles.iconEdit}/>
              </View>
            }
          </View>
          :
          <View style={withoutBorder ? styles.complexFieldWithoutBorder : styles.complexField}>
            <View>
              <Text style={withoutBorder ? styles.currencyTextWithoutBorder : styles.currencyText}>Rp. </Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                {...extraProps}
                value={inputProps.value}
                textColor={disabled ? styles.tintColor.disabled : undefined}
                ref={this._setRef}
                style={withoutBorder ? styles.inputStyleWithoutBorder : styles.inputStyle}
                onChangeText={this._onChangeTextHandler(inputProps)}
                onFocus={this._onFocusHandler(inputProps)}
                onBlur={this._onBlurHandler(inputProps, input.value)}
                baseColor={disabled ? styles.tintColor.disabled : undefined}
                editable={!disabled}
                tintColor={disabled ? styles.tintColor.disabled :  styles.tintColor.textInput}
                label={''}
                placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
                autoCapitalize={'none'}
                disabled={disabled}
                disabledLineType={'solid'}/>
            </View>
            { withoutBorder ? 
              null
              :
              <View>
                <SimasIcon name='edit-amount' size={25} style={styles.iconEdit}/>
              </View>
            }
          </View>
        }
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

SinarmasInputLarge.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
  containerStyle: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isUseSuccessInputText: PropTypes.bool,
  typeField: PropTypes.string,
  setNewUsernameValue: PropTypes.func,
  setNewPasswordValue: PropTypes.func,
  usernameValue: PropTypes.string,
  passwordValue: PropTypes.string,
  oldPassword: PropTypes.string,
  validationInput: PropTypes.func,
  width: PropTypes.any,
  withoutBorder: PropTypes.bool,
};

export default SinarmasInputLarge;
