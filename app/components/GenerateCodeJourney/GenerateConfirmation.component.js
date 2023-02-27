import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './GenerateConfirmation.styles';
import {SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import result from 'lodash/result';
import {wrapMethodInFunction, currencyFormatter, getDayName, formatFieldAmount} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';

class GenerateConfirmation extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    isLogin: PropTypes.bool,
    dataMerchant: PropTypes.object,
    emoneyAccounts: PropTypes.array,
    goToSelectAcc: PropTypes.func,
    thisState: PropTypes.object,
    trxType: PropTypes.string,
    generateCode: PropTypes.object,
  }

  state = {
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
  }

  onModalSubmit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 175}});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  render () {
    const {formValues, navigation, submitting, invalid, emoneyAccounts} = this.props;
    const navParams = result(navigation, 'state.params');
    const amount = Number(result(formValues, 'amount', 0));
    const tipAmountManual = Number(result(navParams, 'data.tipAmountManual', 0));
    const tag57 = Number(result(navParams, 'jsonDt.57', ''));
    const isNaNTip = isNaN(tipAmountManual);
    const tip = ((isNaNTip || tag57 > 0) ? (amount * tag57) / 100 : tipAmountManual);
    const total = (Number(tip) + amount);
    const {containerHeightStyle} = this.state;
    const currentDate = new Date();
    const showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const feeLKD = result(navigation, 'state.params.payload.merchantFee', '');
    const merchName = result(navigation, 'state.params.payload.merchantName', '');
   
    return (
      <ScrollView onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <View keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={[styles.container]}>
              <View style={[styles.row1, styles.left, styles.paddingVer]}>
                <View style={styles.iconAmount}>
                  <Text style={styles.iconText}>IDR</Text>
                </View>
                <Text style={styles.textAmount}>{language.GENERATE_CONFIRMATION_TITTLE}</Text>
              </View>
              <View style={styles.labelSpacing} />
              <View style={styles.box}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftIcon}><Text style={styles.amountText}>{language.GENERATE_CONFIRMATION_FEE_2}</Text></View>
                  <View>
                    <Text style={styles.amountText1}>{currencyFormatter(total)}</Text>
                  </View>
                  <View><SimasIcon onPress={this.summaryCollapse} name={''} size={20} style={[styles.plus]}/></View>
                </View>
                <View>
                  <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                    <View style={styles.greyLine} />
                    <View style={styles.containerRow}>
                      <Text>{language.DETAIL__AMOUNT}</Text>
                      <Text>IDR {currencyFormatter(amount)}</Text>
                    </View>
                    <View style={styles.containerRow}>
                      <Text>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                      <Text>IDR {currencyFormatter(tip)}</Text>
                    </View>
                  </Collapsible>
                </View>
              </View>
              <View style={styles.containtextExplanationFee}>
                <View>
                  <View style={styles.space}>
                    <Text style={styles.textExplanationFee}>{language.GENERATE_CONFIRMATION_FEE_1}</Text>
                    <Text style={styles.feeText}>{language.GENERATE_CONFIRMATION_FEE_2} {formatFieldAmount(feeLKD)} </Text>
                    <Text style={styles.textExplanationFee}>{language.GENERATE_CONFIRMATION_FEE_3}</Text>
                  </View>
                  <Text style={styles.textExplanationFee}>{language.GENERATE_CONFIRMATION_FEE_4} {merchName} {language.GENERATE_CONFIRMATION_FEE_5}</Text>
                </View>
              </View>
              <View style={styles.greyLine} />
              <View style={styles.timeInitiate}>
                <Text style={styles.timeInitiateText}>{language.GENERATE_CODE_CONFIRMATION_DATE} {showTime}</Text>
              </View>
              <View style={styles.labelSpacing} />
              <View style={styles.senderDetail}>
                <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>          
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNumber}>{result(emoneyAccounts, 'accountNumber', '')}</Text>
                  <Text style={styles.sendAccNameType}>{result(emoneyAccounts, 'name', '')}</Text>
                  <Text style={styles.sendAccNameType}>{result(emoneyAccounts, 'productType', '')}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.container]}>
            <View style={styles.containtextExplanation}>
              <SimasIcon name={''} size={25} style={styles.explainIcon}/>
              <View style={styles.containExplantionRight}>
                <Text style={styles.textExplanation} />
              </View>
            </View>
            <SinarmasButton style={styles.btnConfirm} onPress={this.onModalSubmit} disabled={invalid || submitting} >
              <Text style={styles.buttonLargeTextStyle}>{language.GENERATE_CONFIRMATION_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default GenerateConfirmation;