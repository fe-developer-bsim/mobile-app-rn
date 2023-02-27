import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './DigitalEForm.styles';
import EmoneySuccess from '../../assets/images/create-emoney-success.png';
  
class EmoneySuccessRegistration extends React.Component {
  static propTypes = {
    nextpage: PropTypes.func
  }
  
  render () {
    const {nextpage} = this.props;

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.successContainerEmoney}>
          <View style={styles.successTitleEmoneyCont}>
            <Text style={styles.successTitleEmoney}>{language.EMONEY__SUCCESS_TITLE}</Text>
          </View>
          <Image source={EmoneySuccess} style={styles.successImageEmoney}/>
          <View style={styles.successContent}>
            <Text style={styles.successSubtitleEmoney}>{language.EMONEY__SUCCESS_SUBBTITLE_1}
              <Text style={styles.successSubtitleEmoneyBold}>{language.EMONEY__SUCCESS_SUBBTITLE_2}</Text></Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={nextpage}>
            <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__OK}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmoneySuccessRegistration;
