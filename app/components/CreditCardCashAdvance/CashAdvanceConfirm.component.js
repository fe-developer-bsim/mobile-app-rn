import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './CashAdvanceConfirm.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import * as Utils from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import {result} from 'lodash';
import creditCard from '../../assets/images/icon-CreditCard.png';
import transferIcon from '../../assets/images/Transfer.png';
import rpIcon from '../../assets/images/Rp-icon.png';

class CashAdvanceConfirm extends React.Component {

  static propTypes = {
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    accountFirst: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    selectedAccount: PropTypes.object,
    isSelectedAccount: PropTypes.bool,
    errors: PropTypes.array,
    disabled: PropTypes.bool,
    ccDetail: PropTypes.object,
    navigatePaymentSuccess: PropTypes.func,
    moveTo: PropTypes.func,
    navigation: PropTypes.object,
    confirmCashAdvance: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: false, isEasypin: true};
    moveTo('AuthDashboard', params);
  }

  hideModal = () => this.setState({authModal: false});

  onModalSubmit = () => {
    const {navigation} = this.props;
    const ccAccount = result(navigation, 'state.params.ccAccount', {});
    const destAcc = result(navigation, 'state.params.destAcc', {});
    const amount = result(navigation, 'state.params.amount', '');
    const note = result(navigation, 'state.params.note', '');
    const fee = result(navigation, 'state.params.resData.fee', '');
    const total = result(navigation, 'state.params.resData.total', '');
    this.setState(() => {
      setTimeout(() => {
        this.props.confirmCashAdvance(ccAccount, destAcc, amount, note, fee, total);
        // lanjut ke cash advance transfer success
      }, 500);
    });
  }

  render () {
    const {navigation, handleSubmit} = this.props;
    const currentDate = new Date();
    const showTime = Utils.getDayName(currentDate) + ', ' + moment().format('DD MMM YYYY');
    const amount = result(navigation, 'state.params.amount', {});
    const note = result(navigation, 'state.params.note', '');
    const additionalNote = note === '' ? '-' : note;
    const destAcc = result(navigation, 'state.params.destAcc', {});
    const srcAccNumber = result(destAcc, 'accountNumber', '');
    const srcProductType = result(destAcc, 'productType', '');
    const srcName = result(destAcc, 'name', '');
    const ccAccount = result(navigation, 'state.params.ccAccount', {});
    const accNumber = Utils.ccAccountNumber(result(ccAccount, 'accountNumber'));
    const ccProductType = result(ccAccount, 'productType', '');
    const ccName = result(ccAccount, 'name', '');
    const fee = result(navigation, 'state.params.resData.fee', {});
    const total = result(navigation, 'state.params.resData.total', {});

    return (
      <View style={styles.halfWidth}>
        <View style={styles.halfWidth}>
          <ScrollView contentContainerStyle={{paddingBottom: 10}} style={styles.container}>
            <View style={styles.top}>
              <View style={styles.backgroundColor1}/>
              <View style={styles.containerBox}>
                <View style={styles.leftItemContainer}>
                  <Text style={styles.detailTitleTop}>{language.CREDITCARD__CASH_ADVANCE_AMOUNT}</Text>
                  <View style={styles.containerLeftDetail}>
                    <View style={styles.box}>
                      <View>
                        <Image source={rpIcon} style={styles.iconSize}/>
                      </View>
                      <View style={styles.rowRight}>
                        <Text style={styles.textStyleAmount}>{currencyFormatter(amount)}</Text>
                      </View>
                    </View>

                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_NOTE}</Text>
                    </View>
                    <View style={styles.boxAddInfo}>
                      <Text style={styles.textStyleInfo}>{additionalNote}</Text>
                    </View>

                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_DATE + showTime}</Text>
                    </View>

                    <View>
                      <View style={styles.sourceAcc}>
                        <View style={styles.iconContainer}>
                          <Image source={creditCard} style={styles.iconSize}/>
                        </View>
                        <View style={styles.labelSourceAcc}>
                          <Text style={styles.textStyleName}>{ccName}</Text>
                          <Text style={styles.textStyleNumber}>{accNumber}</Text>
                          <Text style={styles.textStyleType}>{ccProductType}</Text>
                        </View>
                      </View>
                      <View style={styles.moreMenuStyle}>
                        <View style={styles.iconContainer}>
                          <SimasIcon name='more-menu' size={20} style={styles.iconMenu}/>
                        </View>
                      </View>
                      <View style={styles.destAcc}>
                        <View style={styles.iconContainer}>
                          <Image source={transferIcon} style={styles.iconSize}/>
                        </View>
                        <View style={styles.labelSourceAcc}>
                          <Text style={styles.textStyleName}>{srcName}</Text>
                          <Text style={styles.textStyleNumber}>{srcAccNumber}</Text>
                          <Text style={styles.textStyleType}>{srcProductType}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.detailInside}>
                      <View style={styles.greyLine}/>
                    </View>

                    <View style={styles.detailInside}>
                      <Text style={styles.footerText}>{language.TRANSFER__METHOD_FOOTER}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.midItemContainer}>
                <Text style={styles.detailTitle}>{language.CREDITCARD__CASH_ADVANCE_PAY_DETAILS}</Text>
                <View style={styles.containerMidDetail}>
                  <View style={styles.detail}>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_AMOUNT}</Text>
                      <Text style={styles.textRight}>Rp. {currencyFormatter(amount)}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_PROMO}</Text>
                      <Text style={styles.textRight}>-</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.TRANSFER__FEE}</Text>
                      <Text style={styles.textRight}>Rp. {currencyFormatter(fee)}</Text>
                    </View>
                  </View>

                  <View style={styles.detailInside}>
                    <View style={styles.greyLine}/>
                  </View>

                  <View style={styles.total}>
                    <Text style={styles.totalText}>{language.CREDITCARD__CASH_ADVANCE_TOTAL}</Text>
                    <Text style={styles.totalPrice}>Rp. {currencyFormatter(total)}</Text>
                  </View>

                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.rightItemContainer}>
                <View style={styles.containerRightDetail}>
                  <View style={styles.detailWarning}>
                    <View style={styles.detailInside}>
                      <View style={styles.iconContainer}>
                        <SimasIcon name={'caution-circle'} size={30} style={styles.warningIcon}/>
                      </View>
                      <Text style={styles.warningText}>{language.CREDITCARD__CASH_ADVANCE_CAUTION_DETAIL}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomButton}>
            <SinarmasButton onPress={handleSubmit} text={language.GENERIC__CONTINUE} />
          </View>
        </View>
      </View>
    );
  }
}

export default CashAdvanceConfirm;
