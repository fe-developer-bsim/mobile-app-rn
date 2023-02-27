import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter, getDayName, getTransferTime} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './FundTransferConfirmation.style';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import find from 'lodash/find';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';

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
    billerFavorite: PropTypes.array,
    favoriteBill: PropTypes.string,
    showFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
    ownAccount: PropTypes.array,
    saveAlias: PropTypes.func,
    isFavorite: PropTypes.bool,
    navigation: PropTypes.object,
    timeConfig: PropTypes.object
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
    const {formValues, handleSubmit, resData, gapTime, billerFavorite, favoriteBill, showFavorite = noop, removeFavorite, ownAccount, saveAlias, timeConfig} = this.props;
    const targetAccount = result(resData, 'transferTransaction.targetAccountObject', {});
    const isSimas = targetAccount.detailNetworkCode === '153';
    const currentDate = new Date();
    const isUnknownAccount = targetAccount.accountType === 'UnknownAccount' || isEmpty(targetAccount.accountType);
    const targetAccountType = isSimas ?
      isUnknownAccount ? result(targetAccount, 'bankName', 'NA') : result(targetAccount, 'accountType', 'NA')
      : result(targetAccount, 'bankName', 'NA');
    const transferType = result(resData, 'transferTransaction.mode', '');
    let showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const cutOffMsg = result(resData, 'transferTransaction.cutOffMsg', '');
    if (transferType === 'skn' || transferType === 'rtgs') {
      const serverTimeNew = String(moment(currentDate).add(gapTime, 'seconds').format('HH:mm'));
      const time = getTransferTime(moment(result(timeConfig, 'cutOffTimeSkn'), 'HH:mm'),
        moment(result(timeConfig, 'cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'),
        moment(result(timeConfig, 'coreBusinessDate')),
        moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm'),
        moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm'),
        transferType, cutOffMsg);
      if (time === 'nextWorking') {
        const sendDate = moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isBefore(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null 
        || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeSkn_CUTOFF'), 'HH:mm')) && cutOffMsg === null || moment(serverTimeNew, 'HH:mm').isAfter(moment(result(timeConfig, 'startTimeRtgs_CUTOFF'), 'HH:mm')) && cutOffMsg === null ? timeConfig.coreBusinessDateV3 : timeConfig.coreNextBusinessSknDateV3 || timeConfig.coreNextBusinessRtgsDateV3;
        showTime = getDayName(sendDate) + ', ' + moment(sendDate).format('DD MMM YYYY');
      }
    }
    const {containerHeightStyle} = this.state;
    const fee =  parseInt(result(resData, 'transferTransaction.bankCharge', 0));
    const amount = parseInt(result(formValues, 'amount', 0));
    let total = amount + fee;
    const showDetailAmt = this.state.summaryCollapsed;
    const notes = result(formValues, 'note', '');
    const targetAccountNumber = result(resData, 'transferTransaction.targetAccountNumber', '');
    const targetAccountName = result(resData, 'transferTransaction.targetAccountName', '');
    const isFavorite = !isEmpty(find(billerFavorite, (fav) => targetAccountNumber === fav.accountNumber));
    const scheduleTrf = result(resData, 'detailScheduledTransfer', {});
    const isSchedule = !isEmpty(scheduleTrf);
    const isAccountOwn = !isEmpty(find(ownAccount, (own) => targetAccountNumber === own.accountNumber));
    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={[styles.container]}>
              <Text style={styles.title}>{language.TRANSFER__CONFIRMATION_TITLE}</Text>
              <View style={styles.labelSpacing} />
              <View style={styles.box}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftIcon}><SimasIcon name={'amount'} size={30} style={styles.headerIcon}/></View>
                  <View>
                    <Text style={styles.amountText}>Rp {currencyFormatter(total)}</Text>
                  </View>
                  <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/></View>
                </View>
                <View>
                  <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                    <View style={styles.greyLine} />
                    <View style={styles.containerRow}>
                      <Text>{language.DETAIL__AMOUNT}</Text>
                      <Text>Rp {currencyFormatter(amount)}</Text>
                    </View>
                    <View style={styles.containerRow}>
                      <Text>{language.TRANSFER__FEE} ({startCase(transferType)})</Text>
                      <Text>Rp {currencyFormatter(fee)}</Text>
                    </View>
                  </Collapsible>
                </View>
              </View>

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
                  <Text style={styles.sendAccNumber}>{result(targetAccount, 'accountNumber', 'NA')}</Text>
                  <Text style={styles.sendAccNameType}>{result(targetAccount, 'name', 'NA')}</Text>
                  <Text style={styles.sendAccNameType}>{targetAccountType}</Text>
                </View>
              </View>

              <View style={styles.extraPadding}><Text style={styles.smallGreyText}>{language.TRANSFER__METHOD_FOOTER}</Text></View>
            </View>

            <View style={styles.greyLineBold} />
            <View style={[styles.container]}>
              {
                result(resData, 'detailScheduledTransfer.transferRepetition', 0) !== null && result(resData, 'detailScheduledTransfer.transferRepetition', 0) !== 0 ?
                  <View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.detailTitle}>{language.TRANSFER__RECURRING}</Text>
                      <Text style={styles.summaryDetail}>{result(resData, 'detailScheduledTransfer.transferRepetition', '')}x</Text>
                      <View style={[styles.mv5]} />
                    </View>

                    <View style={styles.detailContainer}>
                      <Text style={styles.detailTitle}>{language.TRANSFER__TIME}</Text>
                      <Text style={styles.summaryDetail}>{result(resData, 'detailScheduledTransfer.transferScheduled', '')}</Text>
                      <View style={[styles.mv5]} />
                    </View>
                  </View>
                  : null
              }

              <View style={styles.notes}>
                <View>
                  <Text style={styles.detailTitle}>{language.TRANSFER__NOTES}</Text>
                  <Text style={styles.summaryDetail}>{notes === '' ? '-' : notes}</Text>
                </View>
                { transferType === 'skn' || transferType === 'rtgs' || transferType === 'valas' || isSchedule || isAccountOwn ?
                  null
                  :
                  isFavorite ? <Touchable onPress={saveAlias()} /> : favoriteBill === 'yes' ?
                    <Touchable onPress={removeFavorite(targetAccountName, targetAccountNumber)}>
                      <SimasIcon name={'star-filled'} size={25} style={{color: 'red'}}/>
                    </Touchable>
                    :
                    <Touchable onPress={showFavorite(targetAccountName, targetAccountNumber)}>
                      <SimasIcon name={'star-blank'} size={25} style={{color: 'red'}}/>
                    </Touchable>
                }
              </View>


              <View style={styles.bottomSpacing}>
                <View style={styles.containtextExplanation}>
                  <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                  <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text></View>
                </View>
                <SinarmasButton text={language.TRANSFER__BUTTON_TRANSFER} onPress={handleSubmit}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FundTransferConfirmation;