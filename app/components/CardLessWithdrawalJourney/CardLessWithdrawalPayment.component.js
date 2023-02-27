import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CardLessWithdrawalPayment.style';
import noop from 'lodash/noop';
import {SinarmasInput, SinarmasButton, SinarmasInputBox} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';

class CardLessWithdrawalPayment extends Component {
  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    paymentMethods: PropTypes.array,
    prefixCardlessWithdrawal: PropTypes.string,
    accountFirst: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    selectedAccount: PropTypes.object,
    isSelectedAccount: PropTypes.bool
  }

  render () {
    const {invalid, submitting, onNextPress = noop, formValues, goToSourceAccount, selectedAccount, isSelectedAccount} = this.props;
    const availableBalance = Utils.getUnformattedAccountAmount(formValues['myAccount']);
    return (
      <View style={styles.outerContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
          <View style={styles.formContainer}>
            <View style={styles.container}>
              <View style={[styles.row, styles.left, styles.paddingVer]}>
                <SimasIcon name='amount' size={30} style={[styles.iconAmount]}/>
                <Text style={styles.textAmount}>{language.CARDLESSWITHDRAWAL__SET_AMOUNT}</Text>
              </View>
              <View style={styles.labelSpacing} />
              <View style={styles.center}>
                <View style={styles.fieldWidth}>
                  <Field
                    name='amount'
                    label={language.CARDLESSWITHDRAWAL__AMOUNT}
                    placeholder={language.CARDLESSWITHDRAWAL__HINTTEXT_TRANSFER_AMOUNT}
                    format={Utils.formatFieldAmount}
                    normalize={Utils.normalizeAmount}
                    component={SinarmasInputBox}
                    leftIcon={'Rp'}
                    textPosition={'center'}
                    keyboardType={'phone-pad'}
                    iconName={'edit-amount'}
                    maxLength={13}
                  />
                </View>
              </View>
            </View>
            <View style={styles.greyLine} />
            <View style={styles.container}>
              <View style={[styles.row, styles.left, styles.paddingVer]}>
                <SimasIcon name='wallet' size={30} style={styles.iconWallet}/>
                <Text style={styles.textAmount}>{language.GENERIC_BILLER__WALLET}</Text>
              </View>
              <View style={styles.labelSpacing} />

              <Touchable onPress={goToSourceAccount}>
                <View style={styles.account}>
                  {
                    isSelectedAccount ?
                      <View>
                        <Text style={styles.blackText}>{language.GENERIC_BILLER__WALLET}</Text>
                      </View>
                      :
                      <View>
                        <Text style={styles.sendAccNumber}>{selectedAccount.accountNumber}</Text>
                        <Text style={styles.sendAccNameType}>{selectedAccount.name}</Text>
                        <Text style={styles.sendAccNameType}>{selectedAccount.accountType}</Text>
                        <View style={styles.row}>
                          <Text style={styles.availableBalanceText}>{language.CARDLESSWITHDRAWAL__BALANCE}: </Text>
                          <Text style={styles.availableBalanceText}> Rp {Utils.currencyFormatter(availableBalance)}</Text>
                        </View>
                      </View>
                  }
                  <SimasIcon name='more-menu-2' size={15} style={styles.moreMenu}/>
                </View>
              </Touchable>

            </View>
            <View style={styles.greyLine} />
            <View style={styles.container}>
              <View style={styles.note}>
                <View style={styles.row}>
                  <Text style={styles.textOptional}>{language.CARDLESSWITHDRAWAL__OPTIONAL}</Text>
                </View>
                <Field
                  name='note'
                  label={language.GENERIC_BILLER__DESCRIPTION}
                  placeholder={language.HINTTEXT__DESCRIPTION}
                  format={Utils.formatFieldNote}
                  normalize={Utils.formatFieldNote}
                  component={SinarmasInput}
                  maxLength={16}
                />
              </View>

            </View>
          </View>

        </KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.paddingContent}>
            <SinarmasButton dtActionName='Next Cash Withdrawal' disabled={invalid || submitting || isSelectedAccount} onPress={onNextPress} text={language.SERVICE__NEXT_BUTTON} />
          </View>
        </View>
      </View>
    );
  }
}
export default CardLessWithdrawalPayment;
