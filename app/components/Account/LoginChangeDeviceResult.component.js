import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import styles from './LoginChangeDeviceResult.styles';
import {SinarmasButton} from '../FormComponents';
import ChangeDevice from '../../assets/images/change-device.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class LoginChangeDeviceResult extends React.Component {
  static propTypes = {
    finishLockDownDevice: PropTypes.func,
  }

  render () {
    const {finishLockDownDevice} = this.props;
    return (

      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainer} extraHeight={120}>
        <Image source={ChangeDevice} style={styles.picture}/>
        <Text style={styles.releaseTitle}>SUCCESS!</Text>
        <Text style={styles.releaseText}>Your authenticated device has been successfully moved to a new one. Continue your transaction and browse some interesting offers!</Text>
        <View>
          <SinarmasButton onPress={finishLockDownDevice}>
            <Text style={styles.button}>DONE</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default LoginChangeDeviceResult;
