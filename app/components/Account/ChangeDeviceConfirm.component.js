import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChangeDeviceConfirm.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class ChangeDeviceConfirm extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const languange = language.CGV__PAY_FROM;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{languange}</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default ChangeDeviceConfirm;
