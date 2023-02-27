import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SelectSourceAccount, SinarmasButton} from '../FormComponents';
import {normalizeAmount, formatFieldAmount, currencyFormatter} from '../../utils/transformer.util';
import {Field} from 'redux-form';
import {language} from '../../config/language';
import styles from './TokenFormPayment.component.style';
import {result, isEmpty} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';


export const fields = {
  formName: 'TokenForm',
  accountNo: 'accountNo',
};

class TokenFormPayment extends React.Component {

  static propTypes = {
    availableBalance: PropTypes.number,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    savingAccounts: PropTypes.array,
    triggerAuth: PropTypes.func,
    isOwnAccount: PropTypes.bool,
    navigation: PropTypes.object,
    disabled: PropTypes.bool,
    errors: PropTypes.string,
    amount: PropTypes.string, 
    emoneyAccount: PropTypes.array,
    kmtr: PropTypes.bool
  }

  render () {
    const {handleSubmit, disabled, errors, amount, kmtr} = this.props;
    const errorText = result(errors, 'accountNo', '');
    const isLessAmount = !isEmpty(errorText);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraHeight={120}>
        <View>
          <View style={styles.container}>
            <View style={styles.row}>
              <View>
                <SimasIcon name={'amount'} size={30} style={[styles.amount, styles.mr10]}/>
              </View>
              <View>
                <Text style={styles.title}>{language.GENERIC_BILLER__SET_AMOUNT}</Text>
              </View>
            </View>
            <View>
              <View style={styles.textInputContainerPadding}>
                <View>
                  <Text style={styles.rpText}>{language.CGV__RP}</Text>
                </View>
                <TextInput
                  label={language.TRANSFER__AMOUNT}
                  placeholder={language.HINTTEXT__TRANSFER_AMOUNT_PLACEHOLDER}
                  format={formatFieldAmount}
                  normalize={normalizeAmount}
                  style={styles.amountField}
                  value={currencyFormatter(amount)}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.greyLine} />
        
            <View style={styles.rowAcc}>
              <Field
                name={fields.accountNo}
                formName={fields.formName}
                fieldName={fields.fieldName}
                sourceType={'genericBiller'}
                component={SelectSourceAccount}
                kmrt={kmtr}
              />   
              { errorText !== '' ?
                <View style={[styles.rowError, styles.mt5]}>
                  <SimasIcon name='input-error' style={styles.errIcon}/>
                  <Text style={styles.redText}>{errorText}</Text>
                </View>
                :
                null
              }
            </View>
          </View>
        </View>

        <View style={styles.verticalSpacing}>
          <SinarmasButton disabled={disabled || isLessAmount} onPress={handleSubmit}>
            <Text style={styles.nextButton}>{language.BUTTON__NEXT_CAPITAL}</Text>
          </SinarmasButton>
        </View>

      </KeyboardAwareScrollView>
    );
  }
}
export default TokenFormPayment;
