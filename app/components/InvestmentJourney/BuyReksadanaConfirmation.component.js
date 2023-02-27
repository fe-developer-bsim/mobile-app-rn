import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './BuyReksadanaConfirmation.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import {getDayName} from '../../utils/transformer.util';

class FundTransferConfirmation extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    payee: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    doSubscription: PropTypes.func,
    resData: PropTypes.object,
    config: PropTypes.object,
    gapTime: PropTypes.number,
    item: PropTypes.object,
    currentLanguage: PropTypes.string,
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
    const {formValues, item, handleSubmit, currentLanguage} = this.props;
    const {containerHeightStyle} = this.state;
    const amount = parseInt(result(formValues, 'amount', 0));
    const fee = 0;
    let total = amount + fee;
    const showDetailAmt = this.state.summaryCollapsed;
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const NABDate = moment(result(detailPortfolio, 'portfolio.0.NAB_Date')).format('DD/MM/YYYY');
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    let estUnitBuy = (Number(amount) / Number(NABPerUnit)).toFixed(4);
    const currentDate = new Date();
    let showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');
    const isTypeCurrency = fundCurrency === 'IDR' ? 'Rp' : '$';
    const expId = result(detailPortfolio, 'portfolio.0.Wording_ID', '');
    const expEn = result(detailPortfolio, 'portfolio.0.Wording_EN', '');
    const expTxt = currentLanguage === 'id' ? expId : expEn;

    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={styles.fullContainer}>
              <View style={[styles.container]}>
                <Text style={styles.title}>{language.REKSADANA_TOP_UP_CONFIRMATION_TITLE}</Text>
                <View style={styles.labelSpacing} />
                <View style={styles.box}>
                  <View style={styles.rowBetween}>
                    {fundCurrency === 'IDR' ? 
                      <View style={styles.leftIcon}><SimasIcon name={'amount'} size={30} style={styles.headerIcon} /></View>
                      : 
                      <View style={styles.circle}>
                        <Text style={styles.usdIcon}>USD</Text>
                      </View>
                    }
                    <View>
                      <Text style={styles.amountText}>{isTypeCurrency} {currencyFormatter(total)}</Text>
                    </View>
                    <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]} /></View>
                  </View>
                  <View>
                    <View style={styles.greyLine} />
                    <View style={styles.containerRow}>
                      <Text style={styles.unitText}>{language.REKSADANA_ESTIMATE__OF_UNITS}</Text>
                      <Text style={styles.unitText}>{estUnitBuy} unit</Text>
                    </View>
                  </View>
                  <View>
                    <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                      {/* amount */}
                      <View style={styles.containerRow}>
                        <Text style={styles.containerAmountText}>{language.DETAIL__AMOUNT}</Text>
                        <Text style={styles.containerAmountText}>{isTypeCurrency} {currencyFormatter(amount)}</Text>
                      </View>
                      {/* fee */}
                      <View style={styles.containerRow}>
                        <Text style={styles.containerAmountText}>{language.TRANSFER__FEE}</Text>
                        <Text style={styles.containerAmountText}>{currencyFormatter(fee)}</Text>
                      </View>
                    </Collapsible>
                  </View>
                </View>
                <View style={styles.unitContainer}>
                  <Text style={styles.unitNAB}>NAB {NABDate}</Text>
                  <Text style={styles.unitPrice}>1 unit = {NABPerUnit} {fundCurrency}</Text>
                </View>

                {/* Date */}
                <View style={styles.timeInitiate}>
                  <Text style={styles.timeInitiateText}>{language.BUY_REKSADANA__DATE} {showTime}</Text>
                </View>

                <View style={styles.labelSpacing} />
                <View style={styles.senderDetail}>
                  <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.sendAccNumber}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                    <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.name', 'NIL')}</Text>
                    <Text style={styles.sendAccNameType}>{result(formValues, 'myAccount.accountType', 'NIL')}</Text>
                  </View>
                </View>

                <SimasIcon name={'more-menu'} size={25} style={styles.greyDot} />

                <View style={styles.payeeDetail}>
                  <SimasIcon name={'sendto'} size={30} style={styles.profileIcon} />
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.sendAccNumber}>{result(item, 'summaryPortfolio.Fund_Code', 'NIL')}</Text>
                  </View>
                </View>

              </View>

              <View>
                <View style={styles.greyLineBold} />
                <View style={[styles.container]}>
                  <View style={styles.bottomSpacing}>

                    {/* box Transaksi NAB */}
                    <View style={styles.containtextExplanation}>
                      <View>
                        <SimasIcon style={styles.explainIcon} name='caution-circle' size={24} />
                      </View>
                      <View>
                        <Text style={styles.textExplanation}>{expTxt}</Text>
                      </View>
                    </View>
                    {/* akhir box Transaksi NAB */}

                    {/* button confirm */}
                    <SinarmasButton text={language.SEKURITAS__CONFIRMATION_BUTTON} onPress={handleSubmit} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FundTransferConfirmation;
