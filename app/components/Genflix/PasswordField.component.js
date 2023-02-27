import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Field} from 'redux-form';
import {SinarmasInput} from '../FormComponents';
import styles from './PasswordField.styles';
import Touchable from '../Touchable.component';
import PropTypes from 'prop-types';
import showPasswordIcon from '../../assets/images/blackEyeIcon.png';
import hidePasswordIcon from '../../assets/images/blackEyeSlashIcon.png';

class PasswordField extends Component {
  static propTypes = {
    fieldName: PropTypes.string,
  }

  constructor (props) {
    super(props);
    this.state = {
      secureTextEntry: true,
    };
  }

  showOrHidePassword = () => this.setState({secureTextEntry: !this.state.secureTextEntry})

  render () {
    const {fieldName, ...extraProps} = this.props;
    return (
      <View>
        <Field
          {...extraProps}
          name={fieldName}
          component={SinarmasInput}
          secureTextEntry={this.state.secureTextEntry}
        />
        <View style={styles.iconContainer}>
          <Touchable onPress={this.showOrHidePassword} style={styles.eyeIconStyle}><Image source={this.state.secureTextEntry ? showPasswordIcon : hidePasswordIcon}/></Touchable>
        </View>
      </View>
    );
  }
}

export default PasswordField;