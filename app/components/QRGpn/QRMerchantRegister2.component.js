import {View, Text} from 'react-native';
import React from 'react';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine} from '../FormComponents';
import {wrapMethodInFunction, generateAccountLabel, normalizeAmount, formatFieldAmount, generateQRLabel} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import styles from './QRMerchantRegister2.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

class QRMerchantRegister2 extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    accounts: PropTypes.array,
    businessLineList: PropTypes.array,
  }

  render () {
    const {accounts, businessLineList, ...reduxFormProps} = this.props;
    const {handleSubmit, submitting, invalid} = reduxFormProps;
    return (
      <View style={styles.halfWidth}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
          <View style={styles.formContainer}>
            <View style={styles.containerInner}>
              <Text style={styles.titles}>{language.QR_GPN__MERCHANT_DETAIL_10}</Text>
              <Field
                name='merchantName'
                label={language.QR_GPN__MERCHANT_NAME}
                placeholder={language.HINTTEXT__QR_GPN_MERCHANT_NAME}
                component={SinarmasInput}
                maxLength={25}
              />
              <Field
                name='merchantSiup'
                label={language.QR_GPN__MERCHANT_SIUP}
                placeholder={language.QR_GPN__MERCHANT_SIUP}
                component={SinarmasInput}
                maxLength={20}
              />
              <Field
                name='merchantTdp'
                label={language.QR_GPN__MERCHANT_TDP}
                placeholder={language.QR_GPN__MERCHANT_TDP}
                component={SinarmasInput}
                maxLength={20}
                keyboardType='numeric'
              />
              <Field
                name='merchantNpwp'
                label={language.QR_GPN__MERCHANT_NPWP}
                placeholder={language.QR_GPN__MERCHANT_NPWP}
                component={SinarmasInput}
                maxLength={15}
                keyboardType='numeric'
                
              />
              <Field
                name='merchantSales'
                label={language.QR_GPN__MERCHANT_SALES_VOLUME}
                placeholder={language.QR_GPN__MERCHANT_SALES_VOLUME}
                component={SinarmasInput}
                keyboardType='numeric'
                format={formatFieldAmount}
                normalize={normalizeAmount}
                maxLength={15}
              />
              <View style={styles.labelSpacing} />
              <Field
                name='businessLine'
                rightIcon='arrow'
                component={SinarmasPickerLine}
                placeholder={language.QR_GPN__MERCHANT_BUSINESS_LINE}
                labelKey='name'
                itemList={generateQRLabel(businessLineList)}
                labelText={language.QR_GPN__MERCHANT_BUSINESS_LINE}
              />
              <Field
                name='merchantEmail'
                label={language.QR_GPN__MERCHANT_EMAIL}
                placeholder={language.QR_GPN__MERCHANT_EMAIL}
                component={SinarmasInput}
              />
            </View>

            <View style={styles.containerInner}>
              <Text style={styles.titles}>{language.QR_GPN__MERCHANT_TITLE_OWNER}</Text>
              <Field
                name='nameOwner'
                label={language.QR_GPN__MERCHANT_NAME_OWNER}
                placeholder={language.QR_GPN__MERCHANT_NAME_OWNER}
                component={SinarmasInput}
                maxLength={25}
              />
              <Field
                name='nikOwner'
                label={language.QR_GPN__MERCHANT_NIK_OWNER}
                placeholder={language.QR_GPN__MERCHANT_NIK_OWNER}
                component={SinarmasInput}
                maxLength={16}
                keyboardType='numeric'
              />
              <Field
                name='merchantPhone'
                label={language.QR_GPN__MERCHANT_PHONE_NUMBER}
                placeholder={language.QR_GPN__MERCHANT_PHONE_NUMBER}
                keyboardType='numeric'
                maxLength={14}
                component={SinarmasInput}
                disabled={true}
              />
            </View>

            <View style={styles.containerInner}>
              <Text style={styles.titles}>{language.QR_GPN__MERCHANT_ACCOUNT_01}</Text>
              <Text>{language.QR_GPN__MERCHANT_ACCOUNT_02}</Text>
              <Text>{language.QR_GPN__MERCHANT_ACCOUNT_03}</Text>
              <View style={styles.labelSpacing} />
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPickerLine}
                placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
                labelText={language.QR_GPN__MERCHANT_YOUR_ACCOUNT}
                labelKey='display'
                itemList={generateAccountLabel(accounts)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={submitting || invalid} text={language.GENERIC__CONTINUE}/>
        </View>
      </View>
    );
  }
}




export default QRMerchantRegister2;
