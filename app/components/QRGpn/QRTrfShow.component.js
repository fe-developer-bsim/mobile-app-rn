import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTrfShow.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {wrapMethodInFunction, generateAccountLabel, balanceFormatter, getUnformattedAccountAmount, formatFieldAccount, normalizeAmount} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import {SinarmasPickerLine, SinarmasInput, SinarmasButton} from '../FormComponents';
import result from 'lodash/result';

class QRTerminalRegister extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
  }

  submit = () => {
    const {dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  render () {
    const {accounts, formValues, ...reduxFormProps} = this.props;
    const {submitting, invalid} = reduxFormProps;
    const availableBalance = getUnformattedAccountAmount(result(formValues, 'accountNo', {}));
    const balanceView = balanceFormatter(availableBalance);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <Text style={styles.tittle}>{language.QR_GPN__SHOW_MY_QR}</Text>
            <Field
              name='accountNo'
              rightIcon='arrow'
              component={SinarmasPickerLine}
              labelText={language.GENERIC_BILLER__SOURCE_ACC}
              placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
              labelKey='display'
              itemList={generateAccountLabel(accounts)} />
            <Text style={styles.availableBalanceText}>{language.GENERIC_BILLER__AVAILABLE_BALANCE} : {language.QR_GPN__REFUND_RP}{balanceView}</Text>
            <View style={styles.fieldForm}>
              <Field
                name='amount'
                label={language.QR_GPN__AMOUNT_WITHDRAWAL}
                placeholder={language.QR_GPN__HINT_AMOUNT_WITHDRAWAL}
                keyboardType='numeric'
                maxLength={13}
                component={SinarmasInput}
                format={formatFieldAccount}
                normalize={normalizeAmount}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerBtn}>
          <SinarmasButton onPress={this.submit} disabled={invalid || submitting} text={language.QR_GPN__SHOW_QR}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRTerminalRegister;
