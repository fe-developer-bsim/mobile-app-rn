import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FingerPrintEULA.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';

class FingerPrintEULA extends React.Component {
  static propTypes = {
    updateFingerSetting: PropTypes.func,
    currentLanguage: PropTypes.string,
    disclaimerFingerPrint: PropTypes.object,
  }

  render () {
    const {currentLanguage, disclaimerFingerPrint, updateFingerSetting} = this.props;
    const resultDisclaimer = currentLanguage === 'id' ? result(disclaimerFingerPrint, 'id', []) : result(disclaimerFingerPrint, 'en', []); 
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {resultDisclaimer.map((resultDisclaimer, i) => (
            <View key={i}>
              <View style={styles.row}>
                <View style={styles.contentContainer}>
                  <Text style={i === 0 ? styles.textBold : styles.textReg}>{resultDisclaimer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View>
          <SinarmasButton onPress={updateFingerSetting} style={styles.buttonAgree}>
            <Text style={styles.buttonText}>{language.DISCLAIMER_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default FingerPrintEULA;
