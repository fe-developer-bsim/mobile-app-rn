import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {result} from 'lodash';
import styles from './SellReksadanaConfirmation.styles';
import {language} from '../../config/language';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import MoneyBag from '../../assets/images/moneybag.png';
import {getDayName} from '../../utils/transformer.util';
import {currencyFormatter} from '../../utils/transformer.util';


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
    item: PropTypes.object,
    accountList: PropTypes.array,
    totalFee: PropTypes.number,
    responseUnit: PropTypes.string,
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
    const {formValues, item, handleSubmit, totalFee, responseUnit} = this.props;
    const {containerHeightStyle} = this.state;
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const NABDate = moment(result(detailPortfolio, 'portfolio.0.NAB_Date')).format('DD/MM/YYYY');
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    let totalFeeMathRound = parseInt(Math.round(totalFee));
    let earnings = parseInt(Math.round(responseUnit * NABPerUnit));
    
    const showDetailAmt = this.state.summaryCollapsed;
    let estEarnings = parseInt(Math.round(earnings - totalFeeMathRound));
    const currentDate = new Date();
    const total = (Math.round(responseUnit * NABPerUnit));
    let showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');
    const isTypeCurrency = fundCurrency === 'IDR' ? 'Rp' : '$';

    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={styles.fullContainer}>
              <View style={[styles.container]}>
                <Text style={styles.title}>{language.REKSADANA_SELL_CONFIRMATION_TITLE}</Text>
                <View style={styles.labelSpacing} />
                <View style={styles.box}>
                  <View style={styles.rowBetween}>
                    <View style={styles.leftIcon}>
                      <Image source={MoneyBag} style={styles.moneyBag} />
                    </View>
                    <View>
                      <Text style={styles.amountText}>{responseUnit} Unit</Text>
                    </View>
                    <View><SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]} /></View>
                  </View>
                  <View>
                    <View style={styles.greyLine} />
                    <View style={styles.containerRow}>
                      <Text style={styles.unitText}>{language.REKSADANA_SELL__MONEY_CONFIRMATION}</Text>
                      <Text style={styles.unitText}>{isTypeCurrency} {currencyFormatter(estEarnings)}</Text>
                    </View>
                  </View>
                  <View>
                    <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                      <View style={styles.containerRow}>
                        <Text style={styles.containerAmountText}>{language.REKSEDANA__EARNINGS}</Text>
                        <Text style={styles.containerAmountText}>{isTypeCurrency} {currencyFormatter(total)}</Text>
                      </View>
                      <View style={styles.containerRow}>
                        <Text style={styles.containerAmountText}>{language.TRANSFER__FEE}</Text>
                        <Text style={styles.containerAmountText}>{isTypeCurrency} {currencyFormatter(totalFeeMathRound)}</Text>


                      </View>
                    </Collapsible>
                  </View>
                </View>
                {/* nab */}
                <View style={styles.unitContainer}>
                  <Text style={styles.unitNAB}>NAB {NABDate}</Text>
                  <Text style={styles.unitPrice}>1 unit = {NABPerUnit} {fundCurrency}</Text>
                </View>

                {/* showtime */}
                <View style={styles.timeInitiate}>
                  <Text style={styles.timeInitiateText}>{language.BUY_REKSADANA__DATE} {showTime}</Text>
                </View>

                <View style={styles.labelSpacing} />
                <View style={styles.payeeDetail}>
                  <SimasIcon name={'sendto'} size={30} style={styles.profileIcon} />
                  <View style={styles.rightItemContainer}>
                    <Text style={styles.sendAccNumber}>{result(item, 'summaryPortfolio.Fund_Name', 'NIL')}</Text>
                  </View>
                </View>

                <SimasIcon name={'more-menu'} size={25} style={styles.greyDot} />

                <View style={styles.senderDetail}>
                  <SimasIcon name={'wallet'} size={30} style={styles.walletIcon} />
                  <View style={styles.rightItemContainer}>
                    <Text style={[styles.accNumber, styles.roboto]}>{result(formValues, 'accountNumber', '')}</Text>
                    <Text style={[styles.accName, styles.roboto]}>{result(formValues, 'name', '')}</Text>
                    <Text style={[styles.productType, styles.roboto]}>{result(formValues, 'productType', '')}</Text>
                  </View>
                </View>

              </View>
              <View>
                <View style={styles.greyLineBold} />
                <View style={[styles.container]}>
                  <View style={styles.bottomSpacing}>

                    {/* NAB Box */}
                    <View style={styles.containtextExplanation}>
                      <View>
                        <SimasIcon name={'caution-circle'} size={24} style={styles.explainIcon} />
                      </View>
                      <View>
                        <Text style={styles.textExplanation}>{language.SEKURITAS__EXPLAINATION_TEXT}</Text>
                      </View>
                    </View>

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
