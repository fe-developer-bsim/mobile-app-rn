import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './PaydayLoanIndex.styles';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import * as Utils from '../../utils/transformer.util';
import result from 'lodash/result';
import moment from 'moment';

class PaydayLoanForm extends Component {
  state = {
    checked: false,
  }
  checkboxChange = () => {
    if (this.state.checked) {
      this.setState({checked: false});
    }  else {
      this.setState({checked: true});
    }
  }

  onCheckButton = () => {
    if (this.state.checked) {
      return false;
    }  else {
      return true;
    }
  }

  render () {
    const {dataForm, amountLoan, numberAccount, name, ...reduxFormProps} = this.props;
    const interest = result(dataForm, 'interest', '') ? result(dataForm, 'interest', '') : 0;
    const amountSkip = result(dataForm, 'amountPayloan', '');
    const amountNotSkip = amountLoan ? amountLoan : amountSkip;
    const feeAdmin = amountNotSkip * 2 / 100;
    const displayAmount = Utils.formatFieldAmount(amountNotSkip);
    const totalAmount = Utils.formatFieldAmount(amountNotSkip - feeAdmin);
    const date = new Date();
    const time = moment(date).format('dddd, DD MMM YYYY');
    const timeleap = moment(date).format('DD');
    const cutTime = moment(date).subtract(timeleap - 26, 'days').format('dddd, DD MMM YYYY');
    const {handleSubmit = noop} = reduxFormProps;
    return (
      <KeyboardAwareScrollView  style={styles.columnContainer} extraHeight={120}>
        <View style={styles.bottomWrapper}>
          <View>
            <Text style={styles.mainTitleText}>{language.PAYDAY_LOAN__CONFIRMATION_TITLE}</Text>
          </View>
          <View style={styles.percentLoanRowConfirmation}>
            <View>
              <Text style={styles.confirmationDetail}>
                {language.PAYDAY_LOAN__CONFIRMATION_LOAN}
              </Text>
            </View>
            <View>
              <Text style={styles.amountConfirmation}>Rp {displayAmount}</Text>
            </View>
          </View>
          <View style={styles.percentLoanRowConfirmation}>
            <View>
              <Text style={styles.confirmationDetail}>
                {language.PAYDAY_LOAN__ADMIN_FEE}
              </Text>
            </View>
            <View>
              <Text style={styles.amountConfirmation}>- Rp {Utils.formatFieldAmount(feeAdmin)}</Text>
            </View>
          </View>
          <View style={styles.percentLoanRowConfirmation}>
            <View>
              <Text style={styles.confirmationDetail}>
                {language.PAYDAY_LOAN__CONFIRMATION_INTEREST}
              </Text>
            </View>
            <View>
              <Text style={styles.amountConfirmation}>Rp {Utils.formatFieldAmount(interest)}</Text>
            </View>
          </View>
          <View style={styles.borderGrey}/>
          <View style={styles.percentLoanRowConfirmation}>
            <View>
              <Text style={styles.confirmationDetail}>
                {language.PAYDAY_LOAN__CONFIRMATION_GET_MONEY}
              </Text>
            </View>
            <View>
              <Text style={styles.amountConfirmationColor}>Rp {totalAmount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.partTwo}/>
        <View style={styles.bottomWrapper}>
          <View>
            <Text style={styles.mainTitleText}>{language.PAYDAY_LOAN__REPAYMENT_TITLE}</Text>
          </View>
          <View style={styles.rowField}>
            <View style={styles.bottomleftWrapper}>
              <View style={styles.circle}/>
              <View style={styles.block}/>
              <View style={styles.circle}/>
            </View>
            <View style={styles.bottomrightWrapper}>
              <View style={styles.containerFieldContent}>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlack}>{time}</Text>
                </View>
                <View style={styles.subSubTitle}>
                  <Text style={styles.textLineColorGreen}>{language.PAYDAY_LOAN__GET_MONEY} + Rp {totalAmount}</Text>
                </View>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlack}>{language.PAYDAY_LOAN__TO_ACCOUNT}</Text>
                </View>
                <View style={styles.subSubTitle}>
                  <Text style={styles.textLineBoldBlack}>{numberAccount}</Text>
                </View>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBoldBlack}>{name}</Text>
                </View>
              </View>
              <View style={styles.containerFieldContentDown}>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlack}>{cutTime}</Text>
                </View>
                <View style={styles.subSubTitle}>
                  <Text style={styles.textLineColorRed}>{language.PAYDAY_LOAN__REPAY_MONEY} - Rp {displayAmount}</Text>
                </View>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBlack}>{language.PAYDAY_LOAN__FROM_ACCOUNT}</Text>
                </View>
                <View style={styles.subSubTitle}>
                  <Text style={styles.textLineBoldBlack}>{numberAccount}</Text>
                </View>
                <View style={styles.subMainTitle}>
                  <Text style={styles.textLineBoldBlack}>{name}</Text>
                </View>
              </View>
              <View style={styles.forfeitText}>
                <Text>
                  {language.PAYDAY_LOAN__FORFEIT}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.rowFieldAgreement}>
            <View>
              <CheckBox onChange={this.checkboxChange} uncheckedImage={UnCheckBox} checkedImage={RedCheckBox} label={''} checkboxStyle={styles.checkboxStyle} labelStyle={styles.checkboxLabel}/>
            </View>
            <View>
              <Text style={styles.checkboxLabel}> {language.PAYDAY_LOAN__AGREEMENT_CONFIRMATION}</Text>
            </View>
          </View>
          <View style={styles.buttonNext}>
            <View style={styles.containtextExplanation}>
              <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
            </View>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={this.onCheckButton()} >
              <Text style={styles.buttonLargeTextStyle}>{language.PAYDAY_LOAN__BUTTON_CONFIRM}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

PaydayLoanForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onLoginPress: PropTypes.func,
  validationInput: PropTypes.func,
  setAmountOne: PropTypes.func,
  setAmountTwo: PropTypes.func,
  setAmountThree: PropTypes.func,
  setAmountFour: PropTypes.func,
  dataForm: PropTypes.object,
  payBill: PropTypes.func,
  amountLoan: PropTypes.string,
  amount: PropTypes.string,
  numberAccount: PropTypes.string,
  name: PropTypes.string,
};

export default PaydayLoanForm;
