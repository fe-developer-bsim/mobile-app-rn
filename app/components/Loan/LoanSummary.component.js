import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {View, ImageBackground, Text} from 'react-native';
import result from 'lodash/result';
import styles from './LoanSummary.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import LoanAmount from '../../assets/images/loan-amount.png';
import LoanDetail from '../../assets/images/loan-detail.png';
import LoanRepayment from '../../assets/images/loan-repayment.png';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';

class AppVersionUpdator extends React.Component {
  static propTypes = {
    isOptionalUpdate: PropTypes.bool,
    closeHandler: PropTypes.func,
    lang: PropTypes.string,
    goCheckSign: PropTypes.func,
    dataAccount: PropTypes.func,
    backToHome: PropTypes.func
  }

  render () {
    const {goCheckSign, dataAccount, backToHome} = this.props;
    const dataAccountLoan = dataAccount;
    const loanAmount = parseInt(result(dataAccountLoan, 'loanAmount', '')) + parseInt(result(dataAccountLoan, 'loanFeeRate', '')); 

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithNoTerms} keyboardShouldPersistTaps='handled'>
        <View>
          <Touchable onPress={backToHome}>
            <SimasIcon name='arrow' style={styles.redIconBack} size={18}/>
          </Touchable>
          <View style={styles.summaryContainer}>
            <View style={styles.imgContainerAmount}>
              <ImageBackground source={LoanAmount} borderRadius={7} style={styles.imageSummary}>
                <View style={styles.aprovedText}>
                  <Text style={styles.aprovedTextColor}>{language.DASHBOARD__LOAN_SUMMARY_APPROVED}</Text>
                </View>
                <Text style={styles.amountSummaryText}>{language.LOAN__AMOUNT}</Text>
                <Text style={styles.amountSummarySubText}>Rp {currencyFormatter(loanAmount)}</Text>
              </ImageBackground> 
            </View>

            <View style={styles.imgContainerDetail}>
              <ImageBackground source={LoanDetail} borderRadius={7} style={styles.imageSummary}>
                <View style={styles.ph20}>
                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentDetailText}>{language.LOAN__APPLICATION_DATE}</Text>
                    <Text style={styles.installmentDetailText}>{moment.unix(result(dataAccountLoan, 'loanTime', '') / 1000).format('D MMM YYYY')}</Text>
                  </View>

                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentDetailText}>{language.EMONEY__TOP_UP_ACCOUNT}</Text>
                    <Text style={styles.installmentDetailText}>{result(dataAccountLoan, 'account', '')}</Text>
                  </View>
                  
                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentDetailText}>{language.LOAN__PERIOD_SUMMARY}</Text>
                    <Text style={styles.installmentDetailText}>{result(dataAccountLoan, 'borrowPeriod', '')} {language.VALIDATE_DURATION__DAYS}</Text>
                  </View>
                </View>
              </ImageBackground> 
            </View>

            <View style={styles.imgContainerRepayment}>
              <ImageBackground source={LoanRepayment} borderRadius={7} style={styles.imageSummary} >
                <View style={styles.ph20}>
                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentEstimatedText}>{language.LOAN__AMOUNT_GET}</Text>
                    <Text style={styles.installmentEstimatedText}>Rp {currencyFormatter(parseInt(result(dataAccountLoan, 'loanAmount', '0')))}</Text>    
                  </View>

                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentEstimatedText}>{language.LOAN__ESTIMATED_TOTAL_INTEREST} {language.LOAN__INTEREST_AMOUNT}</Text>
                    <Text style={styles.installmentEstimatedText}>Rp {currencyFormatter(result(dataAccountLoan, 'loanFeeRate', ''))}</Text>    
                  </View>

                  <View style={styles.greyLineThin} /> 

                  <View style={styles.inlineFieldDetail}>
                    <Text style={styles.installmentEstimatedText}>{language.LOAN__YOU_WILL_PAY}</Text>
                    <Text style={styles.installmentEstimatedTextBold}>Rp {currencyFormatter(loanAmount)}</Text>    
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>

        <View style={styles.buttonWrapperHorizontal}>
          <SinarmasButton text={language.GENERIC__CONTINUE} onPress={goCheckSign}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default AppVersionUpdator;
