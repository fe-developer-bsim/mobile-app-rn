import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import Authenticate from '../../components/PaymentHelpers/Authenticate.component';
import noop from 'lodash/noop';
import result from 'lodash/result';
import styles from './CloseTdConfirmation.component.style';
import {language} from '../../config/language';
import {formatForexAmount, dateFormatter, getTdInterest, currencySymbol} from '../../utils/transformer.util';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {Alert} from '../../utils/RNHelpers.util.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AccountCarousel from './AccountCarousel.component';

export default class CloseTdConfirmation extends Component {
  static propTypes = {
    timeDepositDetail: PropTypes.object,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    accountList: PropTypes.array,
  }

  state = {
    authToggle: false
  };

  showModal = () => {
    const {triggerAuth, timeDepositDetail} = this.props;
    const amount = result(timeDepositDetail, 'balances.currentBalance');
    triggerAuth(amount);
    this.setState({authToggle: true});
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
    Alert.alert(language.TIME_DEPOSIT__CLOSE, language.TIME_DEPOSIT__CONFIRMATION_FOR_CLOSE, [{
      text: language.GENERIC__CANCEL
    }, {
      text: language.TIME_DEPOSIT__CONFIRMATION_OK,
      onPress: () => this.showModal()
    }]);
  }

  getTDMaturityTypeLabel = (type) => {
    const retn = type ? language[('TIME_DEPOSIT_ARO_' + type).toUpperCase()] : '';
    return retn;
  }

  render () {
    const {timeDepositDetail, transRefNum, userId, resendOTP = noop, config, invalid, accountList} = this.props;
    if (!timeDepositDetail) return null;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.carouselStyle}>
            <AccountCarousel accountList={accountList} />
          </View>
          <View style={styles.row}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__TYPE}</Text>
            </View>
            <Text style={styles.value}>{this.getTDMaturityTypeLabel(result(timeDepositDetail, 'maturityTypeNew', ''))}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__PRINCIPAL_AMOUNT}</Text>
            </View>
            <Text style={styles.value}>{currencySymbol(result(timeDepositDetail, 'currency', ''))} {formatForexAmount(result(timeDepositDetail, 'principal', ''), result(timeDepositDetail, 'currency', ''))}</Text>
          </View>
          {!result(timeDepositDetail, 'isSharia', '') && <View style={styles.row}>
            <View style={styles.newTitleContainer}>
              <Text>{language.TIME_DEPOSIT__TOTAL_INTEREST}</Text>
              <Text style={styles.newMarkerStyle}>*</Text>
            </View>
            <Text style={styles.value}>{currencySymbol(result(timeDepositDetail, 'currency', ''))} {formatForexAmount(getTdInterest(result(timeDepositDetail, 'principal', ''), result(timeDepositDetail, 'interestRate', '')), result(timeDepositDetail, 'currency', ''))}</Text>
          </View>}
          <View style={styles.row}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{result(timeDepositDetail, 'isSharia', '') ? language.TIME_DEPOSIT__RATE_OF_NISBAH : language.TIME_DEPOSIT__MATURITY_INTEREST_RATE}</Text>
            </View>
            <Text style={styles.value}>{result(timeDepositDetail, 'interestRate', '')} % {result(timeDepositDetail, 'isSharia', '') ? '' : language.TIME_DEPOSIT__PER_ANNUM}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.TIME_DEPOSIT__NEXT_PAYOUT_DATE}</Text>
            </View>
            <Text style={styles.value}>{dateFormatter(result(timeDepositDetail, 'maturityDate', ''))}</Text>
          </View>
          {!result(timeDepositDetail, 'isSharia', '') && <View style={styles.markerContainer}>
            <Text style={styles.markerStyle}>*</Text>
            <Text style={styles.newNoteStyle}>{language.TIME_DEPOSIT__WARNING_MSG}</Text>
          </View>}
          <View style={{marginTop: 20}}>
            <SinarmasButton onPress={this.onCloseTD} disabled={invalid}>
              <Text style={buttonLargeTextStyle}>{language.BUTTON__CONFIRM}</Text>
            </SinarmasButton>
          </View>
        </View>
        <Authenticate userId={userId} transRefNum={transRefNum} fieldEasypin='easyPin' fieldOTP='smsOtp' visible={this.state.authToggle}
          onClose={this.onModalClose} submitHandler={this.onModalSubmit} resendOTP={resendOTP} amount={result(timeDepositDetail, 'balances.currentBalance', '')} config={config}/>
      </KeyboardAwareScrollView>
    );
  }
}
