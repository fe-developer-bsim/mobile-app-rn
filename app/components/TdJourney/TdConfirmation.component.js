import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import styles from './TdConfirmation.component.style';
import {language} from '../../config/language';
import {getTdInterest, currencyFormatter, dateFormatter, currencySymbol, formatForexAmount} from '../../utils/transformer.util';
import result from 'lodash/result';

export default class TdConfirmation extends Component {
  render () {
    const {invalid, accountNo = {}, navigation, maturityType, handleSubmit} = this.props;
    const {tdSummary, isShariaAccount, tdFormValues} = navigation.state.params;
    const period = parseInt(result(tdFormValues, 'periodeList.code', '1').substr(0, 2));
    const rate = Number(tdSummary.interestRate);
    const TdInterest = (getTdInterest(tdSummary.initialDeposit, rate)) * period;
    const accountTypeText = isShariaAccount ? language.TIME_DEPOSIT__SHARIA_ACCOUNT : accountNo.accountType;
    const rateTextStyle = isShariaAccount ? styles.lightFontItalics : styles.lightFont;
    const currency = tdSummary.currency;
    
    const ecr = Number(tdSummary.ecrRate);
    return (
      <ScrollView keyboardShouldPersistTaps='handled'  style={styles.container}>
        <Text style={styles.summaryHeading}>{language.TIME_DEPOSIT__PAYMENT_SUMMARY}</Text>
        <Text style={styles.subheading}>{language.TIME_DEPOSIT__PAYMENT_SUMMARY_SUBHEAD}</Text>
        <View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__PAY_FROM}</Text></View>
            <View style={styles.halfWidthRow}>
              <View style={styles.halfWidth}><Text
                style={styles.boldFont}>{accountTypeText}</Text></View>
              <View style={styles.halfWidth}><Text
                style={styles.lightFont}>{accountNo.accountNumber}</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__TYPE}</Text></View>
            <View style={styles.halfWidth}><Text
              style={styles.boldFont}>{maturityType}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.lightFont}>{isShariaAccount ? language.TIME_DEPOSIT__RATE_OF_NISBAH : language.TIME_DEPOSIT__RATE_OF_INTEREST}</Text>
            </View>
            <View style={styles.halfWidth}><Text style={styles.boldFont}>{rate}% {isShariaAccount ? '' : language.TIME_DEPOSIT__PERIOD}</Text></View>
          </View>
          {
            isShariaAccount &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__RATE_OF_NISBAH_BANK}</Text></View>
              <View style={styles.halfWidth}><Text
                style={styles.boldFont}>{100 - rate}%</Text></View>        
            </View>
            
          }
          {
            isShariaAccount  &&
            <View style={styles.row}>
              <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__INTEREST_LABEL_SHARIAH}</Text></View>
              <View style={styles.halfWidth}><Text
                style={styles.boldFont}>{ecr}% p.a</Text></View>
            </View>
            
          }
          {!isShariaAccount &&
          <View>
            <View style={styles.row}>
              <View style={styles.markerContainer}>
                <Text style={rateTextStyle}>{isShariaAccount ? language.TIME_DEPOSIT__TOTAL_NISBAH : language.TIME_DEPOSIT__TOTAL_INTEREST}</Text>
                <Text style={styles.marker}>*</Text>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.boldFont}>{currencySymbol(currency)} {currencyFormatter(getTdInterest(tdSummary.initialDeposit, rate))} {language.TIME_DEPOSIT__MONTH_AND_DAY}</Text>
              </View>
            </View>
            {period > 2 &&
            <View style={styles.row}>
              <View style={styles.markerContainer} />
              <View style={styles.halfWidth}>
                <Text style={styles.boldFont}>{currencySymbol(currency)} {currencyFormatter(TdInterest)} {period < 2 ? '' : `/ ${period}` + ` ${language.TIME_DEPOSIT__MONTH}`} </Text>
              </View>
            </View>
            }
          </View>
          }
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__TENURE}</Text></View>
            <View style={styles.halfWidth}><Text
              style={styles.boldFont}>{period} {language.TIME_DEPOSIT__MONTH}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.lightFont}>{language.TIME_DEPOSIT__MONTHLY_PAYOUT_DATE}</Text></View>
            <View style={styles.halfWidth}><Text
              style={styles.boldFont}>{dateFormatter(tdSummary.completionDate, 'D MMM YYYY')}</Text></View>
          </View>
          <View style={styles.hr}/>
          <View style={styles.row}>
            <View style={styles.halfWidth}><Text style={styles.boldFont}>{language.TIME_DEPOSIT__PRINCIPAL_AMOUNT}</Text></View>
            <View style={styles.halfWidth}><Text
              style={styles.principalText}>{currencySymbol(currency)} {currency === 'IDR' ? currencyFormatter(tdSummary.initialDeposit) : formatForexAmount(tdSummary.initialDeposit, currency)}</Text></View>
          </View>
          <View style={styles.hr}/>
        </View>
        <View style={styles.verticalSpacing}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={invalid}>
            <Text style={styles.button}>{language.TIME_DEPOSIT__CONFIRM_TD}</Text>
          </SinarmasButton>
          {!isShariaAccount &&
            <View style={styles.markerContainerBottom}>
              <Text style={styles.subheading}>*</Text>
              <Text style={styles.subheading}>{language.TIME_DEPOSIT__WARNING_MSG_DEFAULT}</Text>
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

TdConfirmation.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  accountNo: PropTypes.object,
  invalid: PropTypes.bool,
  triggerAuth: PropTypes.func,
  transRefNum: PropTypes.string,
  maturityType: PropTypes.string,
  config: PropTypes.array,
  resendBillPayOTP: PropTypes.func,
  userId: PropTypes.number,
  userMobileNumber: PropTypes.string,
};
