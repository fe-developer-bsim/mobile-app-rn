import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasIconInput, SinarmasButton, DatePicker, SinarmasPicker} from '../FormComponents';
import {Field} from 'redux-form';
import * as Utils from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './CreditCard.styles';
import {noop} from 'lodash';
import {wrapMethodInFunction, normalizeAmount, formatFieldAmount, normalizeNumber, generateAccountLabel, formatFieldNoSpecialChar} from '../../utils/transformer.util';

export const fields = {
  CARD_NAME: 'cardName',
  CREDIT_LIMIT: 'creditLimit',
  CURRENT_ADDRESS_STATUS: 'currentAddressStatus',
  CURRENT_ADDRESS_SINCE: 'currentAddressSince',
  CREDIT_TOTAL: 'creditTotal',
  SOURCE_OF_FUND_PAYMENT: 'sourceOfFundPayment',
  PAYMENT_TYPE: 'paymentType'
};

class CreditCardForm6 extends Component {

  render () {
    const {validationInput, addressStatusList, accounts, listPaymentType, isLogin, 
      totalDeposit, ccCode, isEmoneyKyc,  ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const maxDate = new Date();

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>
          <View style={styles.progressBar}>
            <View style={[{flex: 6}, styles.redBar]}/>
            <View style={[{flex: 4}, styles.greyBar]}/>
          </View>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.CREDITCARD_TITLE6}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Field
              name={fields.CARD_NAME}
              component={SinarmasIconInput}
              theme='primary'
              style={styles.fieldContainer}
              label={language.CREDITCARD__NAME_ON_CARD}
              placeholder={language.HINT__NAME_ON_CARD}
              isUseSuccessInputText={true}
              typeField={'cardName'}
              validationInput={validationInput}
              normalize={formatFieldNoSpecialChar}
              format={formatFieldNoSpecialChar}
              maxLength={20}
            />
            {ccCode === 'CCT-SIMOBI-002' ? 
              null :
              <View>
                <Field
                  name={fields.CREDIT_LIMIT}
                  component={SinarmasIconInput}
                  theme='primary'
                  style={styles.fieldContainer}
                  label={language.CREDITCARD__CREDIT_LIMIT}
                  placeholder={language.HINT__CREDIT_LIMIT}
                  isUseSuccessInputText={true}
                  typeField={'creditLimit'}
                  keyboardType={'numeric'}
                  validationInput={validationInput}
                  normalize={normalizeAmount}
                  format={formatFieldAmount}
                />
                {
                  totalDeposit !== 0 ?
                    <Text style={styles.txtDeposit}>{language.CREATE_ACCOUNT__DEPOSIT_INFO} {Utils.currencyFormatter(totalDeposit)}</Text>
                    :
                    null
                }
              </View>
            }
            
            <Field
              validationInput={validationInput}
              name={fields.CURRENT_ADDRESS_STATUS}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              placeholder={language.CREDITCARD__CURRENT_ADDRESS_STATUS}
              labelKey='name'
              itemList={addressStatusList}
            />
            <Field
              name={fields.CURRENT_ADDRESS_SINCE}
              component={DatePicker}
              label={language.CREDITCARD__CURRENT_ADDRESS_SINCE}
              placeholder={language.HINT__CURRENT_ADDRESS_SINCE}
              maximumDate={maxDate}
              minimumDate={'01/01/1900'}   
              date={maxDate} 
            />
            <Field
              name={fields.CREDIT_TOTAL}
              component={SinarmasIconInput}
              label={language.CREDITCARD__TOTAL_CREDIT_CARD}
              theme='primary'
              style={styles.fieldContainer}
              placeholder={language.HINT__TOTAL_CREDIT_CARD}
              isUseSuccessInputText={true}
              typeField={'creditTotal'}
              keyboardType={'numeric'}
              validationInput={validationInput}
              normalize={normalizeNumber}
            />
            {isLogin && isEmoneyKyc ?
              <Field
                name='sourceOfFundPayment'
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.CREDITCARD__SOURCE_PAYMENT}
                labelText={language.QR_GPN__MERCHANT_YOUR_ACCOUNT}
                labelKey='display'
                itemList={generateAccountLabel(accounts)}
              /> : null
            }
            <Field
              name={fields.PAYMENT_TYPE}
              component={SinarmasPicker}
              style={styles.fieldContainer}
              labelKey='name'
              placeholder={language.CREDITCARD__PAYMENT_TYPE}
              itemList={listPaymentType}
            />
          </View>

        </View>

        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

CreditCardForm6.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onSubmitPress: PropTypes.func,
  validationInput: PropTypes.func,
  addressStatusList: PropTypes.array,
  accounts: PropTypes.array,
  listPaymentType: PropTypes.array,
  isLogin: PropTypes.bool,
  totalDeposit: PropTypes.number,
  ccCode: PropTypes.string,
  isEmoneyKyc: PropTypes.bool
};

export default CreditCardForm6;