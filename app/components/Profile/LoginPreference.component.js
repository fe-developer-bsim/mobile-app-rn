import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './LoginPreference.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';

class LoginPreference extends React.Component {
  static propTypes = {
    updateFaceSetting: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }

  render () {
    const {updateFaceSetting, updateFingerSetting, isUsingFaceRecog, isUsingFingerprint, hasFingerprint, isFaceRecogEnabled} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {language.LOGIN_PREFERENCE__TITLE}
        </Text>
        {
          isFaceRecogEnabled ?
            <View>
              <View style={styles.greyLine}/>
              <View style={styles.loginItemContainer}>
                <View style={styles.row}>
                  <View style={styles.iconContainer}>
                    <SimasIcon name='face-recog' style={styles.icon} size={40}/>
                  </View>
                  <View style={styles.loginTypeContainer}>
                    <Text style={styles.loginType}>{language.LOGIN_PREFERENCE__FACE}</Text>
                  </View>
                </View>
                <Switch
                  onChangeHandler={updateFaceSetting}
                  defaultValue={isUsingFaceRecog}
                />
              </View>
            </View> : null
        }
        <View style={styles.greyLine}/>
        {
          hasFingerprint ?
            <View>
              <View style={styles.loginItemContainer}>
                <View style={styles.row}>
                  <View style={styles.iconContainer}>
                    <SimasIcon name='fingerprint' style={styles.icon} size={40}/>
                  </View>
                  <View style={styles.loginTypeContainer}>
                    <Text style={styles.loginType}>{language.LOGIN_PREFERENCE__FINGER}</Text>
                  </View>
                </View>
                <Switch
                  onChangeHandler={updateFingerSetting}
                  defaultValue={isUsingFingerprint}
                />
              </View>
              <View style={styles.greyLine}/>
            </View> : null
        }
      </View>
    );
  }
}

export default LoginPreference;