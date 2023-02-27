import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './RedeemSmartfren.styles';
import {SinarmasButton, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {currencyFormatter, wrapMethodInFunction, formatFieldAccount} from '../../utils/transformer.util';
import result from 'lodash/result';

class RedeemSmartfren extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    handleSubmit: PropTypes.func,
    andromaxAcc: PropTypes.array
  }

  render () {
    const {navigation, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit, andromaxAcc} = reduxFormProps;
    const availableBalance = currencyFormatter(result(andromaxAcc, '0.balances.availableBalance'));
    const cashbackAmount = currencyFormatter(result(navigation, 'state.params.cashback.cashback'));
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Text style={styles.textTittle1}>{language.REDEEM__SMARTFREN__TITTLE__PROFILE}</Text>
        </View>
        <View style={styles.container}>
          <Field
            name='noKTP'
            label={language.REDEEM_SMARTFREN_KTP_LABEL}
            placeholder={language.REDEEM_SMARTFREN_KTP_PLACEHOLDER}
            keyboardType='numeric'
            disabled={false}
            maxLength={16}
            format={formatFieldAccount}
            component={SinarmasInput}
          />
          <Field
            name='smartfrenNumber'
            label={language.REDEEM_SMARTFREN_PHONE_LABEL}
            placeholder={language.REDEEM_SMARTFREN_PHONE_PLACEHOLDER}
            keyboardType='numeric'
            disabled={false}
            maxLength={13}
            format={formatFieldAccount}
            component={SinarmasInput}
          />
        </View>
        <View style={styles.greyLine} />
        <View style={styles.container}>
          <Text style={styles.textTittle2}>{language.REDEEM__SMARTFREN__TITTLE__ACC}</Text>
        </View>
        <View style={styles.containerFieldACC}>
          <View style={styles.textAccCashback}>
            <Text>{language.REDEEM__SMARTFREN__CASHBACK_LABEL}</Text>
          </View>
          <View>
            <Text style={styles.textAccAmount}>Rp {cashbackAmount}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Field
            name='accNumber'
            label={language.REDEEM_SMARTFREN_ACC_NUMBER}
            placeholder={language.REDEEM_SMARTFREN_ACC_NUMBER}
            disabled={true}
            component={SinarmasInput}
            keyboardType='numeric'
          />
          <Text style={styles.smallText}>Jumlah saldo Rp {availableBalance}</Text>
        </View>
        <View style={styles.buttonNext}>
          <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} text={language.REDEEM__SMARTFREN__BUTTON__CONFIRM}/>
        </View>
      </ScrollView>
    );
  }
}

export default RedeemSmartfren;
