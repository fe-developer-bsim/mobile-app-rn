import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './EForm.styles';
import LoanSuccess from '../../assets/images/loan-success.png';
  
class EFormLoanSuccess extends React.Component {
  static propTypes = {
    backToHome: PropTypes.func,
  }
  
  render () {
    const {backToHome} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.successContainer}>
          <Image source={LoanSuccess} style={styles.successImage}/>
          <View style={styles.successContent}>
            <Text style={styles.successText}>{language.LOAN__SUCCESS_TITLE}</Text>
            <Text style={styles.successSubText}>{language.LOAN__SUCCESS_SUBTITLE} <Text style={styles.successBold}>{language.LOAN__SUCCESS_SUBTITLE_BOLD}</Text> {language.LOAN__SUCCESS_SUBTITLE2}</Text>
          </View>
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton onPress={backToHome}>
            <Text style={styles.buttonLargeTextStyle}>{language.LOAN__TRACK_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EFormLoanSuccess;
