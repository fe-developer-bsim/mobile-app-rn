import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {getDayName, getTransferTime, removeComma, formatForexAmount, formatFieldAmountWithDecimalValas, currencyFormatter, wrapMethodInFunction} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './FundTransferValasConfirmation.style';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import {spreadMarginValasRefreshRateValas} from '../../state/thunks/common.thunks';
import BackgroundTimer from 'react-native-background-timer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  spreadMarginValasRefreshRateValas: (isSubmit) => dispatch(spreadMarginValasRefreshRateValas(isSubmit)),
});

class FundTransferConfirmation extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    payee: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    doTransfer: PropTypes.func,
    resData: PropTypes.object,
    config: PropTypes.object,
    gapTime: PropTypes.number,
    getCurrency: PropTypes.array,
    currencyRate: PropTypes.array,
    isValas: PropTypes.bool,
    resDataRecurr: PropTypes.object,
    formRefreshRateValas: PropTypes.object,
    rateChangeValas: PropTypes.bool,
    spreadMarginValasRefreshRateValas: PropTypes.func,
    dispatch: PropTypes.func,
    toggleSpreadMargin: PropTypes.bool,
    valasRefreshInterval: PropTypes.number,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
    secondsRemaining: this.props.valasRefreshInterval,
    isSubmit: false,
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  submit = () => {
    const {dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    this.setState({isSubmit: true});
    dispatch(wrapMethodInFunction(handleSubmit));
  }

  tick = () => {
    const {spreadMarginValasRefreshRateValas} = this.props;
    const {isSubmit} = this.state;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (isSubmit === true) {
      BackgroundTimer.clearInterval(this.interval);
    } else if (isSubmit === false && this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      this.testsec();
      spreadMarginValasRefreshRateValas(isSubmit);
    }
  }

  testsec = () => {
    const {valasRefreshInterval} = this.props;
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: valasRefreshInterval,
    });
  }

  componentDidMount = () => {
    if (this.props.toggleSpreadMargin) {
      this.testsec();
    }
    this.setState({isSubmit: false});
  }

  render () {
    const {formValues, resData, config, gapTime, currencyRate, resDataRecurr, formRefreshRateValas, rateChangeValas} = this.props;
    const targetAccount = result(resData, 'targetAccountObject', {});
    const isSimas = targetAccount.detailNetworkCode === '153';
    const currentDate = new Date();
    const isUnknownAccount = targetAccount.accountType === 'UnknownAccount' || isEmpty(targetAccount.accountType);
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA')
      : result(targetAccount, 'bankName', 'NA');
    const transferType = result(resData, 'transferTransaction.mode', '');
    let showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    if (transferType === 'skn' || transferType === 'rtgs') {
      const serverTimeNew = String(moment(currentDate).add(gapTime, 'seconds').format('HH:mm'));
      const time = getTransferTime(moment(result(config, 'cutOffTimeSkn'), 'HH:mm'),
        moment(result(config, 'cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'),
        moment(result(config, 'coreBusinessDate')),
        moment('00:00', 'HH:mm'),
        transferType);
      if (time === 'nextWorking') {
        const sendDate = moment(config.coreBusinessDateV3).isAfter(moment(config.serverTime), 'day') ? config.coreBusinessDateV3 : config.coreNextBusinessDateV3;
        showTime = getDayName(sendDate) + ', ' + moment(sendDate).format('DD MMM YYYY');
      }
    }
    const {containerHeightStyle} = this.state;
    const fee = Number(result(resData, 'transferTransaction.bankCharge', 0));
    const amount = Number(result(formValues, 'amount', 0));
    const showDetailAmt = this.state.summaryCollapsed;
    const notes = result(formValues, 'note', '');
    let total = amount + fee;
    const totalDisplay = (total).toFixed(2);
    const currencyDeterminant = result(currencyRate, 'currencyDeterminant', '');
    const amountInDebitCurrDisplay = removeComma(result(resData, 'amountInDebitCurrDisplay', 0));
    const amountInCreditCurrDisplay = removeComma(result(resData, 'amountInCreditCurrDisplay', 0));
    const debitCurrency = result(resData, 'debitCurrency', '');
    const targetCurrency = result(resData, 'targetCurrency', '');
    const currencyRateDisplay = rateChangeValas === true && !isEmpty(result(formRefreshRateValas, 'currencyRateDisp', '')) ? result(formRefreshRateValas, 'currencyRateDisp', '') : result(resData, 'currencyRateDisplay', '');
    const currencyIndicator = result(currencyRate, 'currencyIndicator', '');
    const currency = result(resData, 'currency', '');
    let equivalent = '';
    if (currencyDeterminant === debitCurrency && debitCurrency !== 'IDR') {
      equivalent = `${targetCurrency === 'IDR' ? 'Rp' : targetCurrency} ${formatFieldAmountWithDecimalValas(amountInCreditCurrDisplay, targetCurrency)}`;
    } else if (currencyDeterminant === debitCurrency && debitCurrency === 'IDR') {
      equivalent = `${targetCurrency === 'IDR' ? 'Rp' : targetCurrency} ${formatForexAmount(amountInCreditCurrDisplay, targetCurrency)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency === 'IDR') {
      equivalent = `${debitCurrency === 'IDR' ? 'Rp' : debitCurrency} ${formatForexAmount(amountInDebitCurrDisplay, debitCurrency)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency !== 'IDR') {
      equivalent = `${debitCurrency === 'IDR' ? 'Rp' : debitCurrency} ${formatFieldAmountWithDecimalValas(amountInDebitCurrDisplay, debitCurrency)}`;
    }
    let amountView = '';
    if (currencyDeterminant === debitCurrency && debitCurrency !== 'IDR') {
      amountView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatForexAmount(amount, currencyDeterminant)}`;
    } else if (currencyDeterminant === debitCurrency && debitCurrency === 'IDR') {
      amountView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatFieldAmountWithDecimalValas(amount, currencyDeterminant)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency === 'IDR') {
      amountView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatFieldAmountWithDecimalValas(amount, currencyDeterminant)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency !== 'IDR') {
      amountView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatForexAmount(amount, currencyDeterminant)}`;
    }
    let feeView = '';
    if (currencyDeterminant === debitCurrency && debitCurrency !== 'IDR') {
      feeView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatForexAmount(fee, currencyDeterminant)}`;
    } else if (currencyDeterminant === debitCurrency && debitCurrency === 'IDR') {
      feeView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatFieldAmountWithDecimalValas(fee, currencyDeterminant)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency === 'IDR') {
      feeView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatFieldAmountWithDecimalValas(fee, currencyDeterminant)}`;
    } else if (currencyDeterminant === targetCurrency && targetCurrency !== 'IDR') {
      feeView = `${currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant} ${formatForexAmount(fee, currencyDeterminant)}`;
    }

    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={[styles.container]}>
              <Text style={styles.title}>{language.TRANSFER__CONFIRMATION_TITLE}</Text>
              <View style={styles.labelSpacing} />
              <View style={styles.box}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftIcon}><Text style={styles.currencyFont}>{currencyDeterminant === 'IDR' ? 'Rp' : currencyDeterminant}</Text></View>
                  <View>
                    <Text style={styles.amountText}>{currency !== 'IDR' ? formatFieldAmountWithDecimalValas(totalDisplay, currency) : currencyFormatter(totalDisplay)}</Text>
                  </View>
                  <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]} /></View>
                </View>
                <View>
                  <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                    <View style={styles.greyLine} />
                    <View>
                      {
                        targetCurrency !== debitCurrency ?
                          <View style={styles.containerRow}>
                            <Text>{language.EXCHANGE__RATES_EQUIVALENT}</Text>
                            <Text>{equivalent}</Text>
                          </View>
                          : null
                      }
                      <View style={styles.containerRow}>
                        <Text>{language.DETAIL__AMOUNT}</Text>
                        <Text>{amountView}</Text>
                      </View>
                      <View style={styles.containerRow}>
                        <Text>{language.EXCHANGE__RATES_ADMIN_BANK} </Text>
                        <Text>{feeView}</Text>
                      </View>
                    </View>
                  </Collapsible>
                </View>
              </View>
              {!isEmpty(currencyRateDisplay) ?
                currencyIndicator !== 'sameValas' ?
                  <View style={styles.containerRowRate}>
                    <Text>{language.EXCHANGE__RATES}</Text>
                    <View>
                      <Text>{currencyRateDisplay}</Text>
                    </View>
                  </View>
                  : null
                : null
              }
              <View style={styles.timeInitiate}>
                {
                  result(formValues, 'transferTime', '') === '' ?
                    <Text style={styles.timeInitiateText}>On {showTime}</Text>
                    :
                    <Text style={styles.timeInitiateText}>On {getDayName(result(formValues, 'transferTime', '')) + ', ' + moment(result(formValues, 'transferTime', '')).format('DD MMM YYYY')}</Text>
                }
              </View>
              <View style={styles.labelSpacing} />
              <View style={styles.senderDetail}>
                <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNumber}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                  <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.name', 'NIL')}</Text>
                  <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.productType', 'NIL')}</Text>
                </View>
              </View>

              <SimasIcon name={'more-menu'} size={25} style={styles.greyDot} />

              <View style={styles.payeeDetail}>
                <SimasIcon name={'sendto'} size={30} style={styles.profileIcon} />
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNumber}>{result(targetAccount, 'accountNumber', 'NA')}</Text>
                  <Text style={styles.sendAccNameType}>{result(targetAccount, 'name', 'NA')}</Text>
                  <Text style={styles.sendAccNameType}>{targetAccountType}</Text>
                </View>
              </View>
            </View>

            <View style={styles.greyLineBold} />
            <View style={[styles.container]}>
              {
                result(resDataRecurr, 'detailScheduledTransfer.transferRepetition', 0) !== null && result(resDataRecurr, 'detailScheduledTransfer.transferRepetition', 0) !== 0 ?
                  <View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailTitle}>{language.TRANSFER__RECURRING}</Text>
                      <Text style={styles.summaryDetail}>{result(resDataRecurr, 'detailScheduledTransfer.transferRepetition', '')}x</Text>
                      <View style={[styles.mv5]} />
                    </View>

                    <View style={styles.detailContainer}>
                      <Text style={styles.detailTitle}>{language.TRANSFER__TIME}</Text>
                      <Text style={styles.summaryDetail}>{result(resDataRecurr, 'detailScheduledTransfer.transferScheduled', '')}</Text>
                      <View style={[styles.mv5]} />
                    </View>
                  </View>
                  : null
              }
              <View style={styles.notes}>
                <Text style={styles.detailTitle}>{language.TRANSFER__NOTES}</Text>
                <Text style={styles.summaryDetail}>{notes === '' ? '-' : notes}</Text>
              </View>
              <View style={styles.bottomSpacing}>
                <View style={styles.containtextExplanation}>
                  <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon} />
                  <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.EXCHANGE__RATES_EXPLANATION}</Text></View>
                </View>
                <SinarmasButton text={language.TRANSFER__BUTTON_TRANSFER} onPress={this.submit} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundTransferConfirmation);