import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Field} from 'redux-form';
import styles from './TextBoxWithSpinner.styles';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import {SinarmasInput} from '../FormComponents';

class TextBoxWithSpinner extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    format: PropTypes.func,
    normalize: PropTypes.func,
    fieldName: PropTypes.string, 
    isLoading: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,
    disabled: PropTypes.bool,
  }

  showSpinner = () => {
    this.setState({isLoading: true});
  }

  hideSpinner = () => { 
    this.setState({isLoading: false});
  }

  handleOnBlur = (input) => {
    const {onBlur = noop} = this.props;
    if (onBlur !== noop)  {
      this.showSpinner();
      onBlur(input);
      this.hideSpinner();
    } 
  }

  render () {
    const {fieldName, isLoading, onFocus = noop, onChangeText = noop, onBlur = noop, ...extraProps} = this.props;
    return (
      <View style={styles.row}>
        <Field
          {...extraProps}
          name={fieldName}
          component={SinarmasInput}
          whenFocus={onFocus}
          whenBlur={onBlur}
          onChangeText={onChangeText}
        />
        {
          isLoading ? 
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size='small'/>
            </View>
            : 
            null
        }
      </View>
    );
  }
}

export default TextBoxWithSpinner;