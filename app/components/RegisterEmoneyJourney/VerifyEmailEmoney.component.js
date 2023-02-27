import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './VerifyEmailEmoney.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WhiteSimobi from '../../assets/images/white-simobi.png';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';

class VerifyEmailEmoney extends Component {

  render () {
    const {onVerifyPhone} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View>
          <View style={styles.upperWrapper}>
            <View style={styles.imageContain}>
              <Image source={WhiteSimobi} style={styles.simobiPng}/>
            </View>
            <View style={styles.row}>
              <View>
                <Text style={styles.mainTitleText}>{language.ACTIVATION_EMAIL_VERIFIED}</Text>
              </View>
              <View style={styles.check}>
                <SimasIcon name='check' style={styles.iconStyle} size={20}/>
              </View>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitleText}>{language.ACTIVATION_EMAIL_VERIFIED_SUBTEXT}</Text>
            </View>
          </View>
          <View style={styles.borderGreyTop}/>
        </View>

        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={onVerifyPhone}>
            <Text style={styles.buttonLargeTextStyle}>{language.ACTIVATION_VERIFY_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

VerifyEmailEmoney.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onVerifyPhone: PropTypes.func,
};

export default VerifyEmailEmoney;
