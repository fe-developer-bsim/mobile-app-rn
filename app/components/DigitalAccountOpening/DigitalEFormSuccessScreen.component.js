import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import {result} from 'lodash';
  
class DigitalEFormSuccessScreen extends React.Component {
  static propTypes = {
    backToHome: PropTypes.func,
    data: PropTypes.object,
    currentLanguage: PropTypes.string
  }
  
  render () {
    const {backToHome, data, currentLanguage} = this.props;
    const image = result(data, 'image', '');
    const titleID = result(data, 'titleID', '');
    const titleEN = result(data, 'titleEN', '');
    const subtitleID = result(data, 'subTitleID', '');
    const subtitleEN = result(data, 'subTitleEN', '');

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.successContainer}>
          <Image source={{uri: image}} style={styles.successImage}/>
          <View style={styles.successContent}>
            <Text style={styles.successText}>{currentLanguage === 'id' ? titleID : titleEN}</Text>
            <Text style={styles.successSubText}>{currentLanguage === 'id' ? subtitleID : subtitleEN}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={backToHome}>
            <Text style={styles.buttonLargeTextStyle}>{language.LOAN__TRACK_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default DigitalEFormSuccessScreen;
