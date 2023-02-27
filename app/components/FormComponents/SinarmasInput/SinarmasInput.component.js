import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Animated, Text} from 'react-native';
import noop from 'lodash/noop';
import styles from './SinarmasInput.styles';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import {TextField} from 'react-native-material-textfield';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';

class SinarmasInput extends Component {
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
    const {whenBlur = noop} = this.props;
    const val = this._inputRef._lastNativeText;
    onBlur(val);
    whenBlur(val);
    onInputChange(val);
    if (!isEmpty(val)) {
      this.setState({isFocused: true});
    } else {
      this.setState({isFocused: false});
    }
  }

  _onFocusHandler = (inputProps) => () => {
    const {onFocus, onInputChange} = inputProps;
    const {whenFocus = noop} = this.props;
    const val = this._inputRef._lastNativeText;
    onFocus(val);
    whenFocus(val);
    onInputChange(val);
    this.setState({isFocused: true});
  }

  _onChangeTextHandler = (inputProps) => (val) => {
    const {onChange, onInputChange, isUseSuccessInputText, validationInput = noop} = inputProps;
    onChange(val);
    onInputChange(val);
    if (isUseSuccessInputText && !isEmpty(val)) {
      const isValid = validationInput(val);
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
    const {meta, input = {}, value = '', onFocus = noop, onBlur = noop, onChangeText = noop, onInputChange = noop, disabled = false, label = '',
      placeholder = '', isUseSuccessInputText = false, typeField = 'text', setNewUsernameValue, setNewPasswordValue, usernameValue = '', passwordValue = '',
      oldPassword = '', validationInput, textPosition = '',  errorDisable = false, isBoxR = false, ...extraProps} = this.props;
    const err = !disabled && (meta && meta.touched && !meta.active && meta.error);
    const onChange = onChangeText;

    const inputProps = {onChange, onFocus, onBlur, onInputChange, value, isUseSuccessInputText, typeField, setNewUsernameValue, usernameValue, setNewPasswordValue, passwordValue, oldPassword, validationInput, ...input};
    const disabledError = !errorDisable;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [35, 10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      })
    };

    return (
      <View>
        { this.state.isSuccessInputText ?
          <View>
            <View>
              <Animated.Text style={labelStyle}>
                {label}
              </Animated.Text>
            </View>
            <TextField
              {...extraProps}
              value={inputProps.value}
              textColor={(isBoxR) ? 'black' : disabled ? styles.tintColor.disabled : undefined}
              ref={this._setRef}
              style={(isBoxR) ? styles.inputStyleR : (disabled) ? styles.inputStyleDisabled :  (textPosition === 'center') ? styles.inputStyleCenter : styles.inputStyle}
              onChangeText={this._onChangeTextHandler(inputProps)}
              onFocus={this._onFocusHandler(inputProps)}
              onBlur={this._onBlurHandler(inputProps, input.value)}
              editable={!disabled}
              tintColor={ disabled ? styles.tintColor.disabled : styles.tintColor.textInput}
              label={''}
              baseColor={disabled ? styles.tintColor.disabled : styles.tintColor.disabled}
              placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
              autoCapitalize={'none'}
              disabled={disabled}
              isBoxR={isBoxR}
              disabledLineType={'solid'}/>
          </View>
          : (isBoxR) ?
            <View>
              <Text style={{position: 'absolute', left: 0}}> {label} </Text>
              <TextField
                {...extraProps}
                value={inputProps.value}
                textColor={'black'}
                ref={this._setRef}
                style={styles.inputStyleR}
                onChangeText={this._onChangeTextHandler(inputProps)}
                onFocus={this._onFocusHandler(inputProps)}
                onBlur={this._onBlurHandler(inputProps, input.value)}
                editable={false}
                tintColor={ styles.tintColor.successTextInput }
                label={''}
                baseColor={ styles.tintColor.successTextInput }
                placeholder={this.state.isFocused && isEmpty(value) ? placeholder : ''}
                autoCapitalize={'none'}
                disabled={true}
                isBoxR={isBoxR}
                disabledLineType={'none'}/>
            </View>
            :
            <View>
              <View>
                <Animated.Text style={labelStyle} numberOfLines={1}>
                  {label}
                </Animated.Text>
              </View>
              <TextField
                {...extraProps}
                value={inputProps.value}
                textColor={disabled ? styles.tintColor.disabled : undefined}
                ref={this._setRef}
                style={disabled ? styles.inputStyleDisabled : (textPosition === 'center') ? styles.inputStyleCenter : styles.inputStyle}
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
        }
        {disabledError && err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

SinarmasInput.propTypes = {
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
  whenFocus: PropTypes.func,
  whenBlur: PropTypes.func,
  textPosition: PropTypes.string,
  errorDisable: PropTypes.bool,
  isBoxR: PropTypes.bool
};

export default SinarmasInput;
