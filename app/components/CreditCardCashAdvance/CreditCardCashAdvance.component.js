import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './CreditCardCashAdvance.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Field} from 'redux-form';
import noop from 'lodash/noop';
import * as Utils from '../../utils/transformer.util';
import {SinarmasInput, SinarmasButton, RadioButton} from '../FormComponents';
import {getSourceAccountRadioButton} from '../../utils/middleware.util';
import {result, isEmpty} from 'lodash';
import creditCard from '../../assets/images/icon-CreditCard.png';
import rpIcon from '../../assets/images/Rp-icon.png';

class CreditCardCashAdvance extends React.Component {

  static propTypes = {
    payee: PropTypes.object,
    accountList: PropTypes.array,
    onNextPress: PropTypes.func,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    accountFirst: PropTypes.object,
    goToSourceAccount: PropTypes.func,
    isSelectedAccount: PropTypes.bool,
    errors: PropTypes.array,
    disabled: PropTypes.bool,
    disabledA: PropTypes.bool,
    ccDetail: PropTypes.object,
    navigateCashAdvanceConfirm: PropTypes.func,
    handleSubmit: PropTypes.func,
    disclaimerfig: PropTypes.object,
    disableAmount: PropTypes.bool,
  }

  render () {
    const {disabled, disabledA, handleSubmit = noop, accountList, errors, ccDetail, disclaimerfig, disableAmount} = this.props;
    const accList = getSourceAccountRadioButton(accountList);
    const creditAvailable = parseInt(result(ccDetail, 'creditAvailable', '').replace(/[^0-9.]+/g, ''));
    const creditAvailableShow = Utils.currencyFormatter(creditAvailable);
    const errorTextRange = result(errors, 'amount', '');
    const accNumber = Utils.ccAccountNumber(result(ccDetail, 'accountNumber'));
    const feeMin = Utils.currencyFormatter(result(disclaimerfig, 'feeMinimum', ''));
    const feePercent = result(disclaimerfig, 'feePercent', '');
    const interest = result(disclaimerfig, 'interest', '');
    return (
      <View style={styles.halfWidth}>
        <View style={styles.halfWidth}>
          <ScrollView contentContainerStyle={{paddingBottom: 10}} style={styles.container}>
            <View style={styles.top}>
              <View style={styles.backgroundColor1} />
              <View style={styles.containerBox}>
                <View style={styles.containerLeft}>
                  <Text style={styles.detailTitleInContainer}>{language.TRANSFER__TRANSFER_TO}</Text>
                  <View style={styles.detail}>
                    <View style={styles.containerLeftSourceAcc}>
                      <ScrollView nestedScrollEnabled={true} style={{flexGrow: 0}}>
                        <Field name='destAcc' component={RadioButton} options={accList} isSourceAccount={true}/>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.rightItemContainer}>
                <Text style={styles.detailTitle}>{language.CREDITCARD__CASH_ADVANCE_SET_AMOUNT}</Text>
                <View style={styles.containerLeftDetail}>
                  <View style={styles.boxAmount}>
                    <View>
                      <Image source={rpIcon} style={styles.iconSize}/>
                    </View>
                    <View style={styles.rowRight}>
                      <Field
                        name='amount'
                        placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                        format={Utils.formatFieldAmount}
                        normalize={Utils.normalizeAmount}
                        keyboardType='numeric'
                        component={SinarmasInput}
                        style={styles.inputStyle}
                        maxLength={13}
                        textPosition='left'
                        label={language.CREDITCARD__CASH_ADVANCE_AMOUNT}
                        errorDisable={true}
                      />
                    </View>
                  </View>

                  { !isEmpty(errorTextRange) === true ?
                    <View style={styles.row}>
                      <SimasIcon name='input-error' style={styles.errIcon} />
                      <Text style={styles.redText}>{errorTextRange}</Text>
                    </View> : null}

                  <View style={styles.boxAddInfo}>
                    <View style={styles.fieldStyle}>
                      <Text style={styles.additionalText}>{language.CREDITCARD__CASH_ADVANCE_NOTE_OPT}</Text>
                      <Field
                        name='note'
                        placeholder={language.HINTTEXT__DESCRIPTION}
                        format={Utils.formatFieldNote}
                        normalize={Utils.formatFieldNote}
                        component={SinarmasInput}
                        maxLength={16}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.rightItemContainer}>
                <Text style={styles.detailTitle}>{language.CREDITCARD__CASH_ADVANCE_SOURCE}</Text>
                <View style={styles.containerRightDetail}>
                  <View style={styles.sourceAcc}>
                    <View style={styles.iconContainer}>
                      <Image source={creditCard} style={styles.iconSize}/>
                    </View>
                    <View style={styles.labelSourceAcc}>
                      <Text style={styles.textStyleName}>{language.CREDITCARD__CASH_ADVANCE_CC}</Text>
                      <Text style={styles.textStyleNumber}>{accNumber}</Text>
                      <Text style={styles.textStyleType}>{language.CREDITCARD__CASH_ADVANCE_AVAIL + creditAvailableShow}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.rightItemContainer}>
                <View style={styles.containerRightDetail}>
                  <View style={styles.detailWarning}>
                    <View style={styles.detailInside}>
                      <View style={styles.iconContainer}>
                        <SimasIcon name={'caution-circle'} size={30} style={styles.warningIcon}/>
                      </View>
                      <View>
                        <Text style={styles.warningText}>{language.DASHBOARD__CREDIT_CARD_CA_DISCLAIMER + feePercent + '% ' + language.DASHBOARD__CREDIT_CARD_CA_DISCLAIMER_1 + feeMin + '\n' + language.DASHBOARD__CREDIT_CARD_CA_DISCLAIMER_2 + interest + language.DASHBOARD__CREDIT_CARD_CA_DISCLAIMER_3}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomButton}>

            <SinarmasButton disabled={disabled || disabledA || disableAmount} onPress={Utils.wrapMethodInFunction(handleSubmit)} text={language.GENERIC__CONTINUE} />
          </View>
        </View>
      </View>
    );
  }
}

export default CreditCardCashAdvance;
