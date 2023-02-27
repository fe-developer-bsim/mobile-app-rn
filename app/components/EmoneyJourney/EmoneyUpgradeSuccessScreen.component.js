import React from 'react';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import styles from './EmoneyUpgrade.styles';
import SuccessIcon from '../../assets/images/success-icon-new.png';
  
class EmoneyUpgradeSuccessScreen extends React.Component {

  render () {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          <Image source={SuccessIcon} style={styles.successImage}/>
          <View style={styles.successContainer}>
            <View style={styles.successContent}>
              <Text style={styles.successText}>{language.EMONEY__UPGRADE_SUCCESS_TITLE}</Text>
              <Text style={styles.successSubText}>{language.EMONEY__UPGRADE_SUCCESS_SUBTITLE}</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmoneyUpgradeSuccessScreen;
