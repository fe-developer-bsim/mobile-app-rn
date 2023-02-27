import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import {SinarmasButton, SinarmasPicker, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {balanceFormatter, wrapMethodInFunction, generateAccountLabel, currencyFormatter} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import styles from './OpenAndromaxForm.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const fields = {
  ACCOUNT_NO: 'accountNo'
};

class OpenAndromaxForm extends React.Component {
  static propTypes ={
    handleSubmit: PropTypes.func,
    accounts: PropTypes.array,
    denominations: PropTypes.array,
    formValues: PropTypes.object,
    biller: PropTypes.object,
    invalid: PropTypes.bool,
    minimumInitialDeposit: PropTypes.number,
    availableBalance: PropTypes.number,
  }

  render () {

    const {accounts, invalid = false, handleSubmit = noop, availableBalance, minimumInitialDeposit} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View style={styles.container}>
          <Text style={styles.title}>{language.ANDROMAX_SIMOBIPLUS__DETAIL}</Text>
          <View>
            <View style={styles.verticalSpacing}>
              <View style={styles.fieldContainer}>
                <Field
                  name='email'
                  label={language.ANDROMAX_SIMOBIPLUS__EMAIL}
                  placeholder={language.ANDROMAX_SIMOBIPLUS__EMAIL}
                  component={SinarmasInput}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.greyLineFull}/>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{language.ANDROMAX_SIMOBIPLUS__PAYMENT_METHOD}</Text>
            <View>
              <View style={styles.verticalSpacing}>
                <View style={styles.amountContainer}>
                  <Text>{language.ANDROMAX_SIMOBIPLUS__INITIAL_DEPOSIT}</Text>
                  <Text style={styles.amountText}>Rp {currencyFormatter(minimumInitialDeposit)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.verticalSpacing}>
              <Text style={styles.availableBalanceText}>{language.SERVICE__PAY_FROM}</Text>
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPicker}
                placeholder={language.GENERIC_BILLER__SELECT_ACCOUNT_PLACEHOLDER}
                labelKey='display'
                itemList={generateAccountLabel(accounts)} />
              <Text style={styles.availableBalanceText}>{language.GENERIC_BILLER__AVAILABLE_BALANCE} : Rp {balanceFormatter(availableBalance)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <SinarmasButton disabled={invalid} onPress={wrapMethodInFunction(handleSubmit)}>
            <Text style={styles.nextButton}>{language.SERVICE__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default OpenAndromaxForm;
