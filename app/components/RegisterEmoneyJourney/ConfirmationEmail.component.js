import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './ConfirmationEmail.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import WhiteSimobi from '../../assets/images/white-simobi.png';
import {maskedEmail} from '../../utils/transformer.util';
import {SinarmasButtonOnboarding} from '../FormComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class PaydayLoanForm extends Component {

  render () {
    const {email, returnToLogin} = this.props;
    const maskingEmail = email ? maskedEmail(email) : null;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
        <View style={styles.spaceContainter}>
          <View style={styles.upperWrapper}>
            <View style={styles.imageContain}>
              <Image source={WhiteSimobi} style={styles.simobiPng}/>
            </View>
            <View style={styles.mainTitleRow}>
              <Text style={styles.mainTitleText}>{language.CONFIRMATION_EMAIL__TITLE}</Text>
              <SimasIcon name={'envelope'} size={30} style={styles.envelopeIconWhite}/>
            </View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>{language.CONFIRMATION_EMAIL__SUBTITLE} {maskingEmail}</Text>
            </View>
          </View>
          <View style={styles.bottomWrapperFinalize}>
            <View style={styles.rowField}>
              <View style={styles.bottomleftWrapper}>
                <View style={styles.circle}/>
                <View style={styles.blockFinalize}/>
                <View style={styles.circle}/>
              </View>
              <View style={styles.bottomrightWrapper}>
                <SimasIcon name={'envelope'} size={35} style={styles.envelopeIcon}/>
                <View style={styles.containerFieldContent}>
                  <View style={styles.subMainTitle}>
                    <Text style={styles.textLineBlackFinalized}>{language.CONFIRMATION_EMAIL__FIND_TITLE}</Text>
                    <Text style={styles.textLineBlackFinalizedBold}>{language.CONFIRMATION_BANK__SINARMAS_TITLE}</Text>
                    <Text style={styles.textLineBlack}>{language.CONFIRMATION_EMAIL__FIND_SUBTITLE}</Text>
                  </View>
                </View>
                <View style={styles.containerFieldContentDown}>
                  <SimasIcon name={'check-black'} size={35} style={styles.envelopeIcon}/>
                  <View style={styles.subMainTitle}>
                    <Text style={styles.textLineBlackFinalized}>{language.CONFIRMATION_CLICK__VERIFY} <Text style={styles.textLineBlackBold}>{language.CONFIRMATION_EMAIL__VERIFY}</Text></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButtonOnboarding onPress={returnToLogin} style={styles.buttonLoginSpace} >
            <Text style={styles.buttonMainLoginUser}>{language.REGISTRATION_EMONEY__VERIFY_EMAIL}</Text>
          </SinarmasButtonOnboarding>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}


PaydayLoanForm.propTypes = {
  navigation: PropTypes.object,
  returnToLogin: PropTypes.func,
  email: PropTypes.string,
};

export default PaydayLoanForm;
