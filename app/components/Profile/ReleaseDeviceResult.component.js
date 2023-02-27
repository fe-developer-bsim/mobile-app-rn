import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './ReleaseDeviceResult.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import ChangeDevice from '../../assets/images/change-device.png';
import {language} from '../../config/language';

class ReleaseDeviceResult extends Component {
  static propTypes={
    toReleaseQr: PropTypes.func,
  }

  render () {
    const {toReleaseQr} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.bodyContainer} extraHeight={120}>
        <Image source={ChangeDevice} style={styles.picture}/>
        <Text style={styles.releaseTitle}>SUCCESS!</Text>
        <Text style={styles.releaseText}>{language.RESULT_TEXT}</Text>
        <View>
          <SinarmasButton onPress={toReleaseQr}>
            <Text style={styles.button}>{language.GENERATE_CODE_GENERATOR_BUTTON_DONE}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default ReleaseDeviceResult;
