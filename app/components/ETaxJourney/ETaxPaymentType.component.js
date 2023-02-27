import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {language} from '../../config/language';
import {currencyFormatter, wrapMethodInFunction, formatFieldAccount, getTaxList} from '../../utils/transformer.util';
import {SinarmasInputBoxNew, SinarmasButton, SinarmasPickerBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty, result} from 'lodash';
import savingPay from '../../assets/images/saving-paycard.png';
import styles from './ETaxLanding.styles';
import Touchable from '../../components/Touchable.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {noop} from 'lodash';

export const fields = {
  JENIS_PAJAK: 'jenisPajak',
  ID_BILLING: 'idBilling',
  ACC_NO: 'accountNo'
};

class EtaxPaymentType extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    billerAccount: PropTypes.func,
    handleSubmit: PropTypes.func,
    jenisPajak: PropTypes.array,
  }

  render () {
    const {formValues, billerAccount, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const checkAcc = isEmpty(result(formValues, 'accountNo', {}));
    const accNo = result(formValues, 'accountNo.accountNumber', '');
    const name = result(formValues, 'accountNo.name', '');
    const productType = result(formValues, 'accountNo.productType', '');
    const balance = currencyFormatter(result(formValues, 'accountNo.balances.availableBalance', ''));
    const jenisTransaksi = [{'label': 'Penerimaan Negara (MPN)', 'code': 123}];
    const transformJenisTransaksi = getTaxList(jenisTransaksi);
    const checkJenisPajak = isEmpty(result(formValues, 'jenisTransaksi', {}));
    const isTax = true;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>

            <View style={styles.mt10}>
              <Field
                name='jenisTransaksi'
                component={SinarmasPickerBoxNew}
                itemList={transformJenisTransaksi}
                isTax={true}
                rightIcon='arrow'
                placeholder={language.ETAX__HISTORY_TRANSACTION_TYPE}
                labelText={language.ETAX__HISTORY_TRANSACTION_TYPE}
                labelKey='display'
                textPickerStyle={styles.textPickerStylePayment}
                pickerStyle={styles.pickerStylePayment}
              />
              {
                checkJenisPajak && <ErrorTextIndicator text={language.VALIDATION__REQUIRED_FIELD} isTax={true}/>
              }
            </View>
              

            <View style={styles.mt10}>
              <Field
                name={fields.ID_BILLING}
                component={SinarmasInputBoxNew}
                label={'ID Billing'}
                format={formatFieldAccount}
                normalize={formatFieldAccount}
                isTax={true}
                KeyboardType={'numeric'}
                maxLength={20}
              />
            </View>
            <View style={styles.mt15}>
              {
                checkAcc ?
                  <Touchable onPress={billerAccount} style={styles.emptySourceAccountContainer}>
                    <Text style={styles.mt10}>Select Source Account</Text>
                    <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                  </Touchable> 
                  :   
                  <Touchable onPress={billerAccount} style={styles.sourceAccountContainer}>
                    <View style={styles.iconContainer}>
                      <Image source={savingPay} style={styles.imageOffer2} />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.accNumber}>{accNo}</Text>
                      <Text style={styles.accNumber}>{name}</Text>
                      <Text style={styles.accNumber}>{productType}</Text>
                      <Text style={styles.accNumber}>Balance: {balance}</Text>
                    </View>
                    <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                  </Touchable>
              }
              {
                checkAcc && <ErrorTextIndicator text={language.VALIDATION__REQUIRED_FIELD} isTax={isTax}/>
              }
            </View>
             
          </ScrollView>
          
        </View>
        <View style={styles.footer}>
          <SinarmasButton text={language.GENERIC__CONTINUE} onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || checkAcc || checkJenisPajak}/>
        </View>
      </View>
    );
  }
}

export default EtaxPaymentType;