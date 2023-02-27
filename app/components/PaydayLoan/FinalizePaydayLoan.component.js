import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './PaydayLoanIndex.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';

class PaydayLoanForm extends Component {
  render () {
    const {returnTohome} = this.props;
    return (
      <View  style={styles.contentContainerStyle} extraHeight={120}>
        <View style={styles.bottomWrapperFinalize}>
          <View style={styles.rowField}>
            <View style={styles.bottomleftWrapper}>
              <View style={styles.circleRed}/>
              <View style={styles.blockFinalize}/>
              <View style={styles.circle}/>
            </View>
            <View style={styles.bottomrightWrapper}>
              <SimasIcon name={'check-black'} size={40} style={styles.envelopeIcon}/>
              <View style={styles.containerFieldContent}>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlackFinalized}>{language.PAYDAY_LOAN__REQUEST_TITLE}</Text>
                </View>
              </View>
              <View style={styles.containerFieldContentDown}>
                <SimasIcon name={'envelope'} size={40} style={styles.envelopeIcon}/>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlackFinalized}>{language.PAYDAY_LOAN__CHECK_EMAIL_TITLE}</Text>
                  <Text style={styles.textLineBlack}>{language.PAYDAY_LOAN__CHECK_EMAIL_SUBTITLE}</Text>
                  <Text style={styles.textLineBoldBlack}>email </Text>
                  <Text style={styles.textLineBlack}>{language.PAYDAY_LOAN__CHECK_EMAIL_SUBTITLE_TWO}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonNextFinalize}>
          <SinarmasButton onPress={returnTohome}>
            <Text style={styles.buttonLargeTextStyle}>{language.PAYDAY_LOAN__CLOSE}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

PaydayLoanForm.propTypes = {
  navigation: PropTypes.object,
  returnTohome: PropTypes.func
};

export default PaydayLoanForm;
