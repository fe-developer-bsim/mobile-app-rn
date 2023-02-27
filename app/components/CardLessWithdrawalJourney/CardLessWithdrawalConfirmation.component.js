import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Animated} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter, getDayName} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './CardLessWithdrawalConfirmation.style';
import {language} from '../../config/language';
import startCase from 'lodash/startCase';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';


class CardLessWithdrawalConfirmation extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    payee: PropTypes.object,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    isOwnAccount: PropTypes.bool,
    doTransfer: PropTypes.func,
    resData: PropTypes.object,
    prefixCardlessWithdrawal: PropTypes.string,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    collapsed: false,
    animatingFee: new Animated.Value(0),
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }
  showHide = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render () {
    const {formValues, currentDate = '', handleSubmit, resData, payee} = this.props;
    const phoneNumber = result(payee, 'phoneNumber', 'NA');
    const description = startCase(result(payee, 'description', 'NA'));
    const {containerHeightStyle} = this.state;
    const showTime = getDayName(currentDate) + ', ' + moment().format('DD MMM YYYY');
    return (
      <View onLayout={this.setContainerHeightStyle} style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}} style={[styles.container]}>

          <View style={styles.summaryContainer}>
            <Text style={styles.title}>{language.CARDLESSWITHDRAWAL__TITLE_CONFIRMATION2}</Text>
            <View style={styles.center}>
              <View style={styles.box}>
                <View style={styles.rowBetween}>
                  <SimasIcon name='amount' size={30} style={styles.iconAmount}/>
                  <Text style={styles.amountRight}>Rp {currencyFormatter(result(formValues, 'amount', 0))}</Text>
                  <Touchable onPress={this.showHide}>
                    <SimasIcon name={this.state.collapsed ? 'colapse-black' : 'expand-black'} size={20} style={styles.iconPlusMinus}/>
                  </Touchable>
                </View>
                <Collapsible collapsed={!this.state.collapsed} refName='summary'>
                  <View style={styles.lineSeparator}/>
                  <View style={styles.containerBottom}>
                    <View style={[styles.spaceBetween, styles.row]}>
                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__AMOUNT}</Text>
                      <Text style={styles.rightItemText}>Rp {currencyFormatter(result(formValues, 'amount', 0))}</Text>
                    </View>
                    <View style={[styles.row, styles.spaceBetween]}>
                      <Text style={styles.blackText}>{language.CARDLESSWITHDRAWAL__FEES}</Text>
                      <Text style={styles.rightItemText}>Rp {currencyFormatter(result(resData, 'transferTransaction.bankCharge', 0))}</Text>
                    </View>
                  </View>
                </Collapsible>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{showTime}</Text>
            </View>

            <View style={styles.rowItem}>
              <View style={styles.rowItemRight}>
                <View style={styles.iconContainer}>
                  <SimasIcon name='wallet' size={30} style={styles.iconWallet}/>
                </View>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.rightItemHeader}>{result(formValues, 'myAccount.accountNumber', 'NIL')}</Text>
                  <Text style={styles.rightItemText}>{result(formValues, 'myAccount.name', 'NIL')}</Text>
                  <Text style={styles.rightItemText}>{result(formValues, 'myAccount.productType', 'NIL')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <SimasIcon name='more-menu' size={20} style={styles.iconMenu}/>
            </View>
            <View style={styles.rowItem}>
              <View style={styles.rowItemRight}>
                <View style={styles.iconContainer}>
                  <SimasIcon name='sendto' size={30} style={styles.iconSend}/>
                </View>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.rightItemHeader}>{phoneNumber}</Text>
                  <Text style={styles.rightItemText}>{description}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style ={styles.summaryArea}/>



          <View style={styles.bottomContainer}>
            <View style={styles.rowItem}>
              <View style={styles.rowItemRight}>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.rightItemHeader}>{language.CARDLESSWITHDRAWAL__NOTES}</Text>
                  <Text style={styles.rightItemText}>{result(formValues, 'note', '-')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containtextExplanation}>
              <SimasIcon name='caution-circle' size={30} style={styles.iconCircle} />
              <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
            </View>

          </View>
          <View style={styles.bottomSpacing}>
            <SinarmasButton text={language.CARDLESSWITHDRAWAL__BUTTON_WITHDRAWAL} onPress={handleSubmit}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CardLessWithdrawalConfirmation;
