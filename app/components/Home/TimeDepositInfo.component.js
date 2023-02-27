import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {dateFormatter, getTdInterest, currencySymbol, currencyFormatter, balanceFormatter, formatForexAmount} from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './TimeDepositInfo.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import Authenticate from '../../components/PaymentHelpers/Authenticate.component';
import {Alert} from '../../utils/RNHelpers.util.js';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import lowerCase from 'lodash/lowerCase';

class TimeDepositInfo extends React.Component {

  static propTypes = {
    timeDepositDetail: PropTypes.object,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    isConnected: PropTypes.bool,
    handleSubmit: PropTypes.func,
    accountNumber: PropTypes.string,
    userMobileNumber: PropTypes.string,
    triggerAuthNav: PropTypes.func,
    accountInfo: PropTypes.object,
  }

  state = {
    authToggle: false
  };

  showModal = () => {
    const {triggerAuthNav} = this.props;
    const params = {onSubmit: this.onModalSubmit};
    triggerAuthNav('closetd', 'AuthDashboard', params, true);
  }

  onModalClose = () => {
    this.setState({authToggle: false});
  }

  onModalSubmit = () => {
    this.setState({otpToggle: false}, () => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        const {handleSubmit = noop} = this.props;
        handleSubmit();
      }, 500);
    });
  };

  onCloseTD = () => {
    const {accountInfo} = this.props;
    const checkState = result(accountInfo, 'isAlreadyClose', '');
    const dateMaturity = '"' + dateFormatter(result(this.props.timeDepositDetail, 'maturityDate', ''), 'D MMM YYYY') + '"';
    const subTitleAlreadyClose = language.TIME_DEPOSIT__CONFIRMATION_ALREADY_CLOSE + dateMaturity;
    const subTitleBrforeClose = language.TIME_DEPOSIT__CONFIRMATION_FOR_CLOSE + dateMaturity + language.TIME_DEPOSIT__CONFIRMATION_FOR_CLOSE_MESSAGE + language.TIME_DEPOSIT__CONFIRMATION_FOR_CLOSE_MESSAGE_LAST;
    if (lowerCase(checkState) === 'yes') {
      Alert.alert(language.TIME_DEPOSIT__ALREADY_CLOSE, subTitleAlreadyClose, [{
        text: language.TIME_DEPOSIT__CONFIRMATION_OK_ALREADY_CLOSE,
      }]);
    } else {
      Alert.alert(language.TIME_DEPOSIT__CLOSE, subTitleBrforeClose, [{
        text: language.GENERIC__CANCEL
      }, {
        text: language.TIME_DEPOSIT__CONFIRMATION_OK,
        onPress: () => this.showModal()
      }]);
    }
  }

  getTDMaturityTypeLabel = (type) => {
    const retn = type ? language[('TIME_DEPOSIT_ARO_' + type).toUpperCase()] : '';
    return retn;
  }

  render () {
    const {timeDepositDetail, transRefNum, userId, resendOTP = noop, config, userMobileNumber} = this.props;
    const currency = result(timeDepositDetail, 'currency', '');
    const ecrRate = result(timeDepositDetail, 'ecrRate', 0);    
    if (!timeDepositDetail) return null;
    return (
      <View>
        <View style={styles.formContainer}>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__TYPE}</Text>
            </View>
            <Text style={styles.value}>{this.getTDMaturityTypeLabel(result(timeDepositDetail, 'maturityTypeNew', ''))}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__PRINCIPAL_AMOUNT}</Text>
            </View>
            <Text style={styles.value}>{currencySymbol(currency)} {currency === 'IDR' ? currencyFormatter(result(timeDepositDetail, 'principal', ''), currency) : formatForexAmount(result(timeDepositDetail, 'principal', ''), currency)}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.row}>
              <View style={styles.interestTextContainer}>
                <Text style={styles.title}>{result(timeDepositDetail, 'isSharia', '') ? language.TIME_DEPOSIT__RATE_OF_NISBAH : language.TIME_DEPOSIT__MATURITY_INTEREST_RATE}</Text>
              </View>
              <Text style={styles.value}>{result(timeDepositDetail, 'interestRate', '')} % {result(timeDepositDetail, 'isSharia', '') ? '' : language.TIME_DEPOSIT__PER_ANNUM}</Text>
            </View>
          </View>
          {!result(timeDepositDetail, 'isSharia', '') &&
          <View style={styles.borderBottom}>
            <View style={styles.row}>
              <View style={styles.interestTextContainer}>
                <Text style={styles.title}>{language.TIME_DEPOSIT__TOTAL_INTEREST}<Text style={styles.newMarkerStyle}>*</Text></Text>
                <Text style={styles.newNoteStyle}>{language.TIME_DEPOSIT__WARNING_MSG}</Text>
              </View>
              <Text style={styles.value}>{currencySymbol(result(timeDepositDetail, 'currency', ''))} {balanceFormatter(getTdInterest(result(timeDepositDetail, 'principal', ''), result(timeDepositDetail, 'interestRate', '')), result(timeDepositDetail, 'currency', ''))}</Text>
            </View>
          </View>
          }
          {result(timeDepositDetail, 'isSharia', '') &&
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__RATE_OF_NISBAH_BANK}</Text>
            </View>
            <Text style={styles.value}>{100 - result(timeDepositDetail, 'interestRate', 0)} %</Text>
          </View>
          }
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SIMULATION_PERIOD}</Text>
            </View>
            <Text style={styles.value}>{result(timeDepositDetail, 'periode', '')}</Text>
          </View>
          
         
         
          {result(timeDepositDetail, 'isSharia', '') &&
          <View>
            {ecrRate === 'null' ?
              null :
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.TIME_DEPOSIT__INTEREST_LABEL_SHARIAH}</Text>
                </View>
                <Text style={styles.value}>{result(timeDepositDetail, 'ecrRate', 0)} % p.a</Text>
              </View>
            }
          </View>
          
          }             
            
        
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__NEXT_PAYOUT_DATE}</Text>
            </View>
            <Text style={styles.value}>{dateFormatter(result(timeDepositDetail, 'maturityDate', ''), 'D MMM YYYY')}</Text>
          </View>
          {
            result(timeDepositDetail, 'maturityType') !== 'NON ARO' &&
            <Touchable onPress={this.onCloseTD}>
              <View style={styles.closeTdContainer}>
                <Text style={styles.redText}>
                  {language.TIME_DEPOSIT__CLOSE_TIME_DEPOSIT_BUTTON}
                </Text>
                <SimasIcon name={'arrow'} size={13} style={styles.redText}/>
              </View>
            </Touchable>
          }
        </View>
        <Authenticate userId={userId} transRefNum={transRefNum} fieldEasypin='easyPin' fieldOTP='smsOtp' visible={this.state.authToggle}
          onClose={this.onModalClose} submitHandler={this.onModalSubmit} resendOTP={resendOTP} amount={result(timeDepositDetail, 'balances.currentBalance', '')} config={config}
          userMobileNumber={userMobileNumber} transactionId={'closetd'}/>
      </View>
    );
  }
}

export default TimeDepositInfo;
