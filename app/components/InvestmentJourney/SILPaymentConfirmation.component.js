import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {getDayName, getTransferTime, formatForexAmount, removeCommaSIL} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './SILPaymentConfirmation.styles';
import {language} from '../../config/language';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import startCase from 'lodash/startCase';



class ConfirmationPaymentBuyPolisSILComponent extends Component {
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
    billerFavorite: PropTypes.array,
    favoriteBill: PropTypes.string,
    showFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    ownAccount: PropTypes.array,
    saveAlias: PropTypes.func,
    isFavorite: PropTypes.bool,
    navigation: PropTypes.object,
    isSilIdrUsd: PropTypes.string,
    currencyRate: PropTypes.array,
    amount: PropTypes.string,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
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

  render () {
    const {formValues, handleSubmit, resData, config, gapTime, isSilIdrUsd} = this.props;
    const currentDate = new Date();
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
    const fee = parseInt(result(resData, 'transferTransaction.bankCharge', 0));
    const amount = parseInt(result(formValues, 'amount', 0));
    const currency = result(formValues, 'myAccount.currency', '');
    let total = amount + fee;
    const showDetailAmt = this.state.summaryCollapsed;
    const amountInDebitCurrDisplay = removeCommaSIL(result(resData, 'amountInDebitCurrDisplay', 0));
    const debitRate = result(resData, 'debitRate', 0);
    const creditRate = result(resData, 'creditRate', 0);
    
    
    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={styles.halfWidthContainer}>
            <View>
              <View style={[styles.container]}>
                <Text style={styles.title}>{language.PAYMENT_CONFIRM_SIL}</Text>
                <View style={styles.labelSpacing} />
                {
                  currency === 'IDR' && isSilIdrUsd === 'USD' ?
                    <View>
                      <View style={styles.box}>
                        <View style={styles.rowBetween}>
                          <Text style={styles.amountText}>{isSilIdrUsd} </Text>
                          <Text style={styles.amountText}>{formatForexAmount(total, isSilIdrUsd)}</Text>
                          <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/></View>
                        </View>
                        <View>
                          <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                            <View style={styles.lineGrey} />
                            <View style={styles.containerRow}>
                              <Text>{language.SIL__MULTI_EQUIVALENT}</Text>
                              <Text>{currency} {formatForexAmount(amountInDebitCurrDisplay, currency)}</Text>
                            </View>
                            <View style={styles.containerRow}>
                              <Text>{language.SIL__MULTI_EXCHANGE_SALE}</Text>
                              <Text>{currency} {formatForexAmount(creditRate, currency)}</Text>
                            </View>
                          </Collapsible>
                        </View>
                      </View>
                    </View>
                    :
                    currency === 'USD' && isSilIdrUsd === 'IDR' ?
                      <View >
                        <View style={styles.box}>
                          <View style={styles.rowBetween}>
                            <Text style={styles.amountText}>{isSilIdrUsd} </Text>
                            <Text style={styles.amountText}>{formatForexAmount(total, isSilIdrUsd)}</Text>
                            <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/></View>
                          </View>
                          <View>
                            <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                              <View style={styles.lineGrey} />
                              <View style={styles.containerRow}>
                                <Text>{language.SIL__MULTI_EQUIVALENT}</Text>
                                <Text>{currency} {formatForexAmount(amountInDebitCurrDisplay, currency)}</Text>
                              </View>
                              <View style={styles.containerRow}>
                                <Text>{language.SIL__MULTI_BUY_EXCHANGE}</Text>
                                <Text>{isSilIdrUsd} {formatForexAmount(debitRate, isSilIdrUsd)}</Text>
                              </View>
                            </Collapsible>
                          </View>
                        </View>
                      </View>
                      :
                      currency === 'IDR' && isSilIdrUsd === 'IDR' ? 
                        <View >
                          <View style={styles.box}>
                            <View style={styles.rowBetween}>
                              <Text style={styles.amountText}>{currency} </Text>
                              <Text style={styles.amountText}>{formatForexAmount(total, currency)}</Text>
                              <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/></View>
                            </View>
                            <View>
                              <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                                <View style={styles.lineGrey} />
                                <View style={styles.containerRow}>
                                  <Text>{language.DETAIL__AMOUNT}</Text>
                                  <Text>{currency} {formatForexAmount(amount, currency)}</Text>
                                </View>
                                <View style={styles.containerRow}>
                                  <Text>{language.TRANSFER__FEE} ({startCase(transferType)})</Text>
                                  <Text>{currency} {formatForexAmount(fee, currency)}</Text>
                                </View>
                              </Collapsible>
                            </View>
                          </View>
                        </View>
                        : 
                        <View >
                          <View style={styles.box}>
                            <View style={styles.rowBetween}>
                              <Text style={styles.amountText}>{currency} </Text>
                              <Text style={styles.amountText}>{formatForexAmount(total, currency)}</Text>
                              <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/></View>
                            </View>
                            <View>
                              <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                                <View style={styles.lineGrey} />
                                <View style={styles.containerRow}>
                                  <Text>{language.DETAIL__AMOUNT}</Text>
                                  <Text>{currency} {formatForexAmount(amount, currency)}</Text>
                                </View>
                                <View style={styles.containerRow}>
                                  <Text>{language.TRANSFER__FEE} ({startCase(transferType)})</Text>
                                  <Text>{currency} {formatForexAmount(fee, currency)}</Text>
                                </View>
                              </Collapsible>
                            </View>
                          </View>
                        </View>
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
                  <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.sendAccNumber}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                    <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.name', 'NIL')}</Text>
                    <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.productType', 'NIL')}</Text>
                  </View>
                </View>

                <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>

                <View style={styles.payeeDetail}>
                  <SimasIcon name={'sendto'} size={30} style={styles.profileIcon}/>
                  <View style={styles.rightItemContainer}>
                    {isSilIdrUsd === 'USD' ?
                      <Text style={styles.sendAccNumber}> {'SIMAS INVESTA LINK'}</Text>
                      : 
                      <Text style={styles.sendAccNumber}> {'SMART INVESTA LINK'}</Text>
                    }
                  </View>
                </View>
              </View>

              <View style={styles.greyLineBold} />
            </View>
            <View>
              <View style={[styles.container]}>
                <View style={styles.bottomWrapper}>
                  <View style={styles.containtextExplanation}>
                    <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                    <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text></View>
                  </View>
                  <SinarmasButton text={language.QR_GPN__MERCHANT_BTN} onPress={handleSubmit}/>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ConfirmationPaymentBuyPolisSILComponent;