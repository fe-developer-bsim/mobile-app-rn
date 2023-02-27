import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FaceRecogEULA.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';

class FaceRecogEULA extends React.Component {
  static propTypes = {
    updateFaceSetting: PropTypes.func,
    disclaimerFaceRecog: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  render () {
    const {updateFaceSetting, disclaimerFaceRecog, currentLanguage} = this.props;
    const resultDisclaimer = currentLanguage === 'id' ? result(disclaimerFaceRecog, 'id', []) : result(disclaimerFaceRecog, 'en', []);
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
          <SinarmasButton onPress={updateFaceSetting} style={styles.buttonAgree}>
            <Text style={styles.buttonText}>{language.DISCLAIMER_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default FaceRecogEULA;
