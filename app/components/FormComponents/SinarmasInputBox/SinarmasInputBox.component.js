import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, TextInput, Text, Image} from 'react-native';
import noop from 'lodash/noop';
import styles from './SinarmasInputBox.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import Touchable from '../../Touchable.component';
import Search from '../../../assets/images/search.png';


class SinarmasInputBox extends Component {
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

  deleteSearch = () => {
    this.props.clearText();
    this.props.deleteValueSearch();
  }


  render () {
    const {meta, input = {}, value, onFocus = noop, onBlur = noop, onChangeText = noop, borderOff, onInputChange = noop, disabled = false, placeholder = '', isUseSuccessInputText = false, typeField = 'text', setNewUsernameValue, setNewPasswordValue, usernameValue = '', passwordValue = '', oldPassword = '', validationInput, iconName = '', leftIcon = '', textPosition = '', isSplitBill, isSearch = false, autoCapitalizeSearch = false, ...extraProps} = this.props;
    const err = !disabled && (meta && meta.touched && !meta.active && meta.error);
    const onChange = onChangeText;
    const inputProps = {onChange, onFocus, onBlur, onInputChange, value, isUseSuccessInputText, typeField, setNewUsernameValue, usernameValue, setNewPasswordValue, passwordValue, oldPassword, validationInput, ...input};
    const borderStyle = borderOff ? {} : styles.border;

    const offMl5 = isSearch ? styles.ml20 : styles.ml5;
    const offRow = isSearch ? styles.rowSearch : styles.row;

    return (
      <View>
        <View>
          {
            isSplitBill ? 
              <View style={[styles.row, borderStyle]}>
                <Text style={[styles.text, styles.ml5]}>{leftIcon}</Text>
                { textPosition === 'center' ? 
                  <TextInput
                    {...extraProps}
                    value={inputProps.value}
                    textColor={disabled ? styles.tintColor.disabled : undefined}
                    ref={this._setRef}
                    style={disabled ? styles.inputStyleCenter : styles.inputStyleCenter}
                    onChangeText={this._onChangeTextHandler(inputProps)}
                    onFocus={this._onFocusHandler(inputProps)}
                    onBlur={this._onBlurHandler(inputProps, input.value)}
                    baseColor={disabled ? styles.tintColor.disabled : undefined}
                    editable={!disabled}
                    tintColor={disabled ? styles.tintColor.disabled :  styles.tintColor.textInput}
                    label={''}
                    placeholder={placeholder}
                    autoCapitalize={'none'}
                    disabled={disabled}
                    disabledLineType={'solid'}
                  />
                  :
                  <TextInput
                    {...extraProps}
                    value={inputProps.value}
                    textColor={disabled ? styles.tintColor.disabled : undefined}
                    ref={this._setRef}
                    style={disabled ? styles.inputStyleDisabled : styles.inputStyle}
                    onChangeText={this._onChangeTextHandler(inputProps)}
                    onFocus={this._onFocusHandler(inputProps)}
                    onBlur={this._onBlurHandler(inputProps, input.value)}
                    baseColor={disabled ? styles.tintColor.disabled : undefined}
                    editable={!disabled}
                    tintColor={disabled ? styles.tintColor.disabled :  styles.tintColor.textInput}
                    label={''}
                    placeholder={placeholder}
                    autoCapitalize={'none'}
                    disabled={disabled}
                    disabledLineType={'solid'}
                  />
                }
                <View>
                  <SimasIcon name={iconName} size={25} style={styles.icon} />
                </View>
              </View>
              :
              <View style={[offRow, borderStyle]}>
                { isSearch ?
                  <View style={styles.containerIconSearch}>
                    <Image source={Search} />
                  </View> : null
                }
                <Text style={[styles.text, offMl5]}>{leftIcon}</Text>
                { textPosition === 'center' ? 
                  <TextInput
                    {...extraProps}
                    value={inputProps.value}
                    textColor={disabled ? styles.tintColor.disabled : undefined}
                    ref={this._setRef}
                    style={disabled ? styles.inputStyleDisabledCenter : styles.inputStyleCenter}
                    onChangeText={this._onChangeTextHandler(inputProps)}
                    onFocus={this._onFocusHandler(inputProps)}
                    onBlur={this._onBlurHandler(inputProps, input.value)}
                    baseColor={disabled ? styles.tintColor.disabled : undefined}
                    editable={!disabled}
                    tintColor={disabled ? styles.tintColor.disabled :  styles.tintColor.textInput}
                    label={''}
                    placeholder={placeholder}
                    autoCapitalize={'none'}
                    disabled={disabled}
                    disabledLineType={'solid'}
                  />
                  :
                  <TextInput
                    {...extraProps}
                    value={inputProps.value}
                    textColor={disabled ? styles.tintColor.disabled : undefined}
                    ref={this._setRef}
                    style={disabled ? styles.inputStyleDisabled : styles.inputStyle}
                    onChangeText={this._onChangeTextHandler(inputProps)}
                    onFocus={this._onFocusHandler(inputProps)}
                    onBlur={this._onBlurHandler(inputProps, input.value)}
                    baseColor={disabled ? styles.tintColor.disabled : undefined}
                    editable={!disabled}
                    tintColor={disabled ? styles.tintColor.disabled :  styles.tintColor.textInput}
                    label={''}
                    placeholder={placeholder}
                    autoCapitalize={autoCapitalizeSearch ? 'words' : 'none'}
                    disabled={disabled}
                    disabledLineType={'solid'}
                  />
                }
                { isSearch && !isEmpty(value) ? 
                  <Touchable onPress={this.deleteSearch} style={styles.containerIconClose}>
                    <SimasIcon name='close-black' style={styles.closeIcon} size={8}/>
                  </Touchable> : null
                }
           
                <View>
                  <SimasIcon name={iconName} size={25} style={styles.icon} />
                </View>
              </View>
          }
          {err && <ErrorTextIndicator text={err}/>}
        </View>
      </View>
    );
  }
}

SinarmasInputBox.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
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
  iconName: PropTypes.string,
  leftIcon: PropTypes.string,
  textPosition: PropTypes.string,
  borderOff: PropTypes.bool,
  isSplitBill: PropTypes.bool,
  isSearch: PropTypes.bool,
  deleteValueSearch: PropTypes.func,
  clearText: PropTypes.func,
  autoCapitalizeSearch: PropTypes.bool,
};

export default SinarmasInputBox;