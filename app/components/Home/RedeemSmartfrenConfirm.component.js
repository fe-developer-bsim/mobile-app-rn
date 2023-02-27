import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './RedeemSmartfrenConfirm.styles';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';

class RedeemSmartfrenConfirm extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const {invalid, handleSubmit} = this.props;
    const formRedeem = result(navigation, 'state.param.form', {});
    const cashbackAmount = currencyFormatter(result(navigation, 'state.param.cashback.cashback'));
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.container}>
          <Text style={styles.textTittle1}>{language.REDEEM__SMARTFREN__TITTLE__CONFIRM}</Text>
        </View>
        <View style={styles.containerFieldACC}>
          <View style={styles.textAccCashback}>
            <Text>{language.REDEEM__SMARTFREN__CASHBACK_LABEL}</Text>
          </View>
          <View>
            <Text style={styles.textAccAmount}>Rp {cashbackAmount}</Text>
          </View>
        </View>
        <View style={styles.greyLine} />
        <View style={styles.container}>
          <Text style={styles.textTittle2}>{language.REDEEM__SMARTFREN__TITTLE__DETAIL__TRX}</Text>
        </View>
        <View style={styles.containerText}>
          <Text>{language.REDEEM__SMARTFREN__TEXT__TRX}</Text>
          <Text style={styles.subText}>{language.REDEEM__SMARTFREN__TEXT__CASHBACK__ANDROMAX}</Text>
        </View>
        <View style={styles.containerText}>
          <Text>{language.REDEEM__SMARTFREN__TEXT__KTP}</Text>
          <Text style={styles.subText}>{result(formRedeem, 'noKTP', '')}</Text>
        </View>
        <View style={styles.containerText}>
          <Text>{language.REDEEM__SMARTFREN__TEXT__SMART__NUMBER}</Text>
          <Text style={styles.subText}>{result(formRedeem, 'smartfrenNumber', '')}</Text>
        </View>
        <View style={styles.containerText}>
          <Text>{language.REDEEM__SMARTFREN__TEXT__ACC}</Text>
          <Text style={styles.subText}>{result(formRedeem, 'accNumber', '')}</Text>
        </View>
        <View style={styles.buttonNext}>
          <View style={styles.containtextExplanation}>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton onPress={handleSubmit} disabled={invalid} text={language.REDEEM__SMARTFREN__BTN__GET__CASHBACK}/>
        </View>
      </ScrollView>

    );
  }
}

export default RedeemSmartfrenConfirm;
