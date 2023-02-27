import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton, SinarmasInputBox, SinarmasPicker, RadioButton} from '../FormComponents';
import styles from './SILIlustrasiForm2.styles';
import {formatFieldAmount, currencyFormatter, normalizeAmount, upperCase, formatFieldAmountChange, currencyFormatterChange} from '../../utils/transformer.util';
import {result, find, filter, isEmpty} from 'lodash';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import noop from 'lodash/noop';
import {Field} from 'redux-form';
import {getDataForSIl, productNameSil} from '../../utils/middleware.util';
import moment from 'moment';
import SimasIcon from '../../assets/fonts/SimasIcon';

export const fields = {
  AMOUNT: 'amount',
  INVESTA: 'investa',
  INCOME: 'income'
};

class SmartInvestaLinkInfoProductComponent extends Component {
  static propTypes = {
    validationInput: PropTypes.func,
    isSilIdrUsd: PropTypes.string,
    moneyInsured: PropTypes.number,
    getAmount: PropTypes.func,
    listProduct: PropTypes.array,
    iserror: PropTypes.bool,
    totalPremi: PropTypes.string,
    response: PropTypes.array,
    monthIncome: PropTypes.object,
    listProductIdrUsd: PropTypes.array
  }

  state = {
    valueSubmit: false,
  }

  render () {
    const {validationInput, isSilIdrUsd, moneyInsured, getAmount, listProduct, totalPremi, response, monthIncome, listProductIdrUsd, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const responseCode = result(response, 'responseCode', '');
    const responseMessage = result(response, 'responseMessage', '');
    const newDate = new Date();
    const currentDate = moment(newDate).format('DD/MM/YYYY');
    const listProducts = result(listProduct, 'listProduct', []);
    const productName = productNameSil(result(listProduct, 'listProduct', []));
    const productNameIDR = result(productName, '[0].label', '');
    const productNameUSD = result(productName, '[1].label', '');

    const monthOptionsIdr = getDataForSIl(result(listProducts, '[0].listProdDetail[0].listMti', []));
    const monthOptionsUsd = getDataForSIl(result(listProducts, '[1].listProdDetail[0].listMti', []));

    const typeFundIdr = result(listProducts, '[0].listProdDetail[0].listFund[0].fundName', '');
    const typeFundUsd = result(listProducts, '[1].listProdDetail[0].listFund[0].fundName', '');

    const silInvesOptionIdr = getDataForSIl(result(listProducts, '[0].listProdDetail[0].listRollover', []));
    const silInvesOptionUsd = getDataForSIl(result(listProducts, '[1].listProdDetail[0].listRollover', []));

    const isNextCheck = responseCode !== '00';
    const listRPI = result(listProductIdrUsd, 'listRate', []);
    const filterRPI = filter(listRPI, function (o) {
      return result(o, 'maxDynamic', 0) >= totalPremi && result(o, 'minDynamic', 0) <= totalPremi;
    });
    const findRPI = isEmpty(listRPI) ? null : find(filterRPI, {rpi: upperCase(result(monthIncome, 'label', ''))});
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} extraHeight={120}>
        <View style={styles.SilTitleHeaderView}>
          <Text style={styles.SilTitleHeader}>{language.SMART__INVESTA_LINK_DETAIL_HEADER1}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[{flex: 10}, styles.redBar]}/>
          <View style={[{flex: 0}, styles.greyBar]}/>
        </View>
        <View style={styles.upperContainer}>
          <View>
            <Text style={styles.emoneyTitle}>{language.SMART__INVESMENT_LINK_DETAIL06}</Text>
          </View>
          <View>
            <Text style={styles.pageTitleName}>{language.SMART__INVESMENT_LINK_DETAIL07}</Text>
            { isSilIdrUsd === 'IDR' ?
              <Text style={styles.titleNameProduct}>{productNameIDR}</Text>
              :
              <Text style={styles.titleNameProduct}>{productNameUSD}</Text>
            }
          </View>
          <View style={styles.greyLine} />
          <View>
            <Text style={styles.pageTitle}>{language.SMART__INVESMENT_LINK_DETAIL08}</Text>
          </View>
          <View style={styles.loginFieldsContainerCel}>
            {isSilIdrUsd === 'IDR' ?
              <Field
                name={fields.AMOUNT}
                placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                format={formatFieldAmount}
                normalize={normalizeAmount}
                keyboardType='numeric'
                component={SinarmasInputBox}
                iconName={'edit-amount'}
                leftIcon='IDR'
                textPosition='center'
                maxLength={17}
                typeField={'amount'}
                theme='primary'
                onEndEditing={getAmount}
              />
              :
              <Field
                name={fields.AMOUNT}
                placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                format={formatFieldAmountChange}
                normalize={normalizeAmount}
                keyboardType='numeric'
                component={SinarmasInputBox}
                iconName={'edit-amount'}
                leftIcon='USD'
                textPosition='center'
                maxLength={17}
                typeField={'amount'}
                onEndEditing={getAmount}
              />
            }
          </View>

          { responseCode !== '00' && totalPremi === '' ? null :
            responseCode !== '00' ?
              <View style={styles.row}>
                <SimasIcon name='input-error' style={styles.errIcon}/>
                <Text style={styles.redText}>{responseMessage}</Text>
              </View> : null
          }
          

          <View>
            <Text style={styles.moneyInsured}>{language.SMART__INVESMENT_LINK_DETAIL09}</Text>
          </View>
          <View>
            { totalPremi === '' && isSilIdrUsd === 'IDR' ?
              <Text style={styles.titleNameCurrency}>IDR {currencyFormatter(moneyInsured === '--')}</Text>
              :
              (totalPremi === '' && isSilIdrUsd === 'USD') || (isSilIdrUsd === 'USD' && responseCode === '01') ?
                <Text style={styles.titleNameCurrency}>USD {currencyFormatter(moneyInsured === '--')}</Text>
                :
                isSilIdrUsd === 'IDR' ?
                  <Text style={styles.titleNameCurrency}>IDR {currencyFormatter(moneyInsured)}</Text>
                  :
                  <Text style={styles.titleNameCurrency}>USD {currencyFormatterChange(moneyInsured)}</Text>
            }
          </View>
          <View>
            {isSilIdrUsd === 'IDR' ?
              <Text style={styles.pageTitleName}>{language.SMART__INVESMENT_WITHDRAWAL_TEXT_IDR}</Text>
              :
              <Text style={styles.pageTitleName}>{language.SMART__INVESMENT_WITHDRAWAL_TEXT_USD}</Text>
            }
          </View>
          {isSilIdrUsd === 'IDR' ?
            <View style={styles.choosePeriod}>
              <Field
                name={fields.INCOME}
                component={SinarmasPicker}
                label={language.SIL__INVESTMENT_WITHDRAWAL_TEXT}
                placeholder={language.SIL__INVESTMENT_WITHDRAWAL_TEXT_PLACEHOLDER}
                itemList={monthOptionsIdr}
                labelKey='label'
                validationInput={validationInput}
              />
            </View>
            :
            <View style={styles.choosePeriod}>
              <Field
                name={fields.INCOME}
                component={SinarmasPicker}
                label={language.SIL__INVESTMENT_WITHDRAWAL_TEXT}
                placeholder={language.SIL__INVESTMENT_WITHDRAWAL_TEXT_PLACEHOLDER}
                itemList={monthOptionsUsd}
                labelKey='label'
                validationInput={validationInput}
              />
            </View>
          }
          {!isEmpty(findRPI) ?
            <View style={styles.rateInvest}>
              <View>
                <Text>{language.INQUIRY__SIL_INVEST_RATE}</Text>
              </View>
              <View style={styles.row}>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_LOW} {result(findRPI, 'low', '')}% - </Text>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_MEDIUM} {result(findRPI, 'mid', '')}% - </Text>
                <Text>{language.INQUIRY__SIL_INVEST_RATE_HIGH} {result(findRPI, 'high', '')}%</Text>
              </View>
            </View> : null
          }
          <View>
            {isSilIdrUsd === 'IDR' ?
              <Text style={styles.titleDate}>{language.SMART__INVESMENT_WITHDRAWAL_DATE_IDR}</Text>
              :
              <Text style={styles.titleDate}>{language.SMART__INVESMENT_WITHDRAWAL_DATE_USD}</Text>
            }
          </View>
          <View>
            <Text style={styles.titleCurrentDate}>{currentDate}</Text>
          </View>
          <View>
            <Text style={styles.titleTypeFund}>{language.SMART_INVESMENT_LINK_TYPE}</Text>
          </View>
          <View>
            {isSilIdrUsd === 'IDR' ?
              <Text style={styles.typeFund}>{typeFundIdr}</Text>
              :
              <Text style={styles.typeFund}>{typeFundUsd}</Text>
            }
          </View>
          <View>
            <Text style={styles.pageTitleName}>{language.SMART_INVESMENT_PAYMENT_OPTIONS}</Text>
          </View>
          {isSilIdrUsd === 'IDR' ?
            <View style={styles.invesRadioButton}>
              <Field name={fields.INVESTA}
                component={RadioButton}
                options={silInvesOptionIdr}/>
            </View>
            :
            <View style={styles.invesRadioButton}>
              <Field name={fields.INVESTA}
                component={RadioButton}
                options={silInvesOptionUsd}/>
            </View>
          }
        </View>
        <View>
          <View style={styles.buttonOtpSubmit}>
            <SinarmasButton style={styles.buttonRegister} onPress={handleSubmit} disabled={invalid || submitting || isNextCheck}>
              <Text style={styles.buttonLargeTextStyle}>{language.SIL__CONFIRMATION_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}

export default SmartInvestaLinkInfoProductComponent;