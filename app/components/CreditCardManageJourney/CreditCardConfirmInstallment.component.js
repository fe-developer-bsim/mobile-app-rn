import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView} from 'react-native';
import styles from './CreditCardConfirmInstallment.style';
import map from 'lodash/map';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {toCCFormater} from '../../utils/transformer.util';
import result from 'lodash/result';



class CreditCardConfirmInstallment extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    formValues: PropTypes.object,
    selectedAccount: PropTypes.object,
    periode: PropTypes.object,
    changeInstallmet: PropTypes.func,
    moveTo: PropTypes.func,
  }

  installmentList (data) {
    return (
      <View>
        <Text style={styles.detailTextInstallmet}> {data} </Text>
      </View>
    );
  }

  installmentAmountList (data) {
    return (
      <View>
        <Text style={styles.detailTextInstallmet}> {'Rp. ' + toCCFormater(data)} </Text>
      </View>
    );
  }

  showModal = () => {
    const {moveTo} = this.props;
    const params = {onSubmit: this.onModalSubmit, isOtp: false, isEasypin: true};
    moveTo('AuthDashboard', params);
  };

  onModalSubmit = () => {
    const {selectedAccount, periode, formValues} = this.props;
    const arn = result(formValues, 'arn');
    const schmeId = result(periode, 'schmeId');
    const amount = result(formValues, 'sublabel');
    this.setState(() => {
      // set time out because of this bug
      // https://github.com/facebook/react-native/issues/10471
      setTimeout(() => {
        this.props.changeInstallmet(selectedAccount, amount, arn, schmeId, periode, formValues);
      }, 500);
    });
  };

  render () {
    const {formValues, periode, handleSubmit} = this.props;
    const amount = result(formValues, 'sublabel', 'NIL');
    const label = result(formValues, 'label', 'NIL');
    const periodeL = result(periode, 'term', 'NIL');
    const interest = result(periode, 'interestRate[0]');
    const firstI = result(periode, 'installmentAmount[0]');
    const Iamount = map(periode.installmentAmount, this.installmentAmountList);
    const Imonth = map(periode.installmentMonth, this.installmentList);
    const Idate = map(periode.installmentDate, this.installmentList);
    const IHFee = result(periode, 'installmentHandleFee', '0');

    return (
      <View style={styles.halfWidth}>
        <View style={styles.halfWidth}>
          <ScrollView contentContainerStyle={{paddingBottom: 20}} style={styles.container}>
            <View style={styles.top}>
              <View style={styles.backgroundColor1}/>
              <View style={styles.containerBox}>
                <View style={styles.containerLeft}>
                  <Text style={styles.detailTitle}>{language.OPEN_NEW_ACCOUNT__TRANSACTION}</Text>

                  <View style={styles.detail}>
                    <View style={styles.detailInside}>
                      <View style={styles.detailInsideName}>
                        <Text style={styles.detailText}>{label}</Text>
                      </View>
                      <View style={styles.detailInsideAmt}>
                        <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.rightItemContainer}>
                <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT_DETAIL}</Text>
                <View style={styles.containerLeftDetail}>
                  <View style={styles.detail}>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DETAIL__AMOUNT}</Text>
                      <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_POT}</Text>
                      <Text style={styles.detailText}>{periodeL}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_INTEREST}</Text>
                      <Text style={styles.detailText}>{interest + ' %'}</Text>
                    </View>
                    <View style={styles.detailInside}>
                      <Text style={styles.detailText}>{language.EXCHANGE__RATES_ADMIN_BANK}</Text>
                      <Text style={styles.detailText}>{'Rp ' + toCCFormater(IHFee)}</Text>
                    </View>
                  </View>

                  <View style={styles.detailInside}>
                    <View style={styles.greyLine}/>
                  </View>

                  <View style={styles.total}>
                    <Text style={styles.detailTextBold}>{language.CREDITCARD__INSTALLMENT_PER_MONTH}</Text>
                    <Text style={styles.detailTextBold}>{'Rp ' + toCCFormater(firstI)}</Text>
                  </View>

                </View>
              </View>
            </View>

            <View style={styles.mid}>
              <View style={styles.rightItemContainer}>
                <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT}</Text>
                <View style={periodeL.startsWith('3') ? styles.containerInstallmentDetail3 :
                  periodeL.startsWith('5') ? styles.containerInstallmentDetail5 :
                    periodeL.startsWith('6') ? styles.containerInstallmentDetail6 :
                      styles.containerInstallmentDetail6
                }>
                  <ScrollView nestedScrollEnabled={true}>
                    <View style={styles.installmentContainer}>
                      <View style={styles.detailInsideInstallment}>
                        <Text style={styles.detailTextInstallmet}>{language.DASHBOARD__CREDIT_CARD_MONTH_LABEL}</Text>
                        {Imonth}
                      </View>
                      <View style={styles.detailInsideInstallment}>
                        <Text style={styles.detailTextInstallmet}>{language.DASHBOARD__CREDIT_CARD_DUE_DATE}</Text>
                        {Idate}
                      </View>
                      <View style={styles.detailInsideInstallment}>
                        <Text style={styles.detailTextInstallmet}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT}</Text>
                        {Iamount}
                      </View>
                    </View>
                  </ScrollView>
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

export default CreditCardConfirmInstallment;
