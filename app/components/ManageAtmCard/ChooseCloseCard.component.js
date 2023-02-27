import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChooseCloseCard.styles';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasPicker, SinarmasInput} from '../FormComponents';
import {Field} from 'redux-form';
import {generateAccountLabel} from '../../utils/transformer.util';
import noop from 'lodash/noop';

export const fields = {
  ACCOUNT_NAME: 'accountName',
  TOTAL_BALANCE: 'totalBalance',
  ACCOUNT_TYPE: 'accountTypeName',
  AMOUNT_TRANSFER: 'amountTransfer',
  TRANSFER_TO: 'transferTo',
  CLOSING_FEE: 'closingFee',
  CONVERTED_AMOUNT: 'convertedAmount',
  ACCOUNT_NUMBER: 'accountNumber'
};

class ChooseCloseCard extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    accountList: PropTypes.array,
    accountTypeName: PropTypes.string,
    isValas: PropTypes.bool,
    handleSubmit: PropTypes.func,
    accountValas: PropTypes.array,
    disabled: PropTypes.bool,
    valasCurrency: PropTypes.array
  }

  render () {    
    const {accounts, isValas, accountValas, disabled, valasCurrency, ...reduxFormProps} = this.props;
    const {handleSubmit = noop} = reduxFormProps;
    const txtDisabled = disabled ? 'disabledTxt' : 'enabledTxt';
    const isAccountValas = valasCurrency.includes(isValas);
   
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.wrapContainer} extraHeight={120}>
        <View style={styles.container}>
          <View>
            <View style={styles.row}>
              <Text style={styles.titleTxt}>{language.CLOSE__SAVING_ACCOUNT_TITLE_RECIPIENT}</Text>
            </View>
          </View>

          <View style={styles.subcontainer}>
            <View style={styles.cardContainer}>
              <Field 
                theme='primary'
                name={fields.ACCOUNT_NAME}
                component={SinarmasInput}
                label={language.DASHBOARD__ACCOUNT_NUMBER}
                disabled={true}
              />
            </View>
            
            <View style={styles.cardContainer}>
              <Field 
                theme='primary'
                name={fields.TOTAL_BALANCE}
                component={SinarmasInput}
                label={language.CLOSE__SAVING_ACCOUNT_TOTAL_BALANCE}
                disabled={true}
              />
            </View>

            <View style={styles.cardContainer}>
              <Field 
                theme='primary'
                name={fields.CLOSING_FEE}
                component={SinarmasInput}
                label={language.CLOSE__SAVING_ACCOUNT_CLOSE_FEE}
                disabled={true}
              />
            </View>
          
            <View style={styles.cardContainer}>
              <Field 
                theme='primary'
                name={fields.AMOUNT_TRANSFER}
                component={SinarmasInput}
                label={language.CLOSE__SAVING_ACCOUNT_TRANSFER}
                placeholder={language.CLOSE__SAVING_ACCOUNT_TRANSFER}
                disabled={true}
              />
            </View> 
            {
              isAccountValas ? 
                <View style={styles.cardContainer}>
                  <Field 
                    name={fields.TRANSFER_TO}
                    component={SinarmasPicker}
                    itemList={generateAccountLabel(accountValas)} 
                    label={language.TRANSFER__TRANSFER_TO}
                    placeholder={language.TRANSFER__TRANSFER_TO}
                    labelKey={'display'}
                    isUseSuccessInputText={true}
                  />
                </View> 
                :
                <View style={styles.cardContainer}>
                  <Field 
                    name={fields.TRANSFER_TO}
                    component={SinarmasPicker}
                    itemList={generateAccountLabel(accounts)} 
                    label={language.TRANSFER__TRANSFER_TO}
                    placeholder={language.TRANSFER__TRANSFER_TO}
                    labelKey={'display'}
                    isUseSuccessInputText={true}
                  />
                </View> 
            }

            <View style={styles.buttonWrapper}>
              <SinarmasButton onPress={handleSubmit} style={styles.enabledBtn} disabledStyle={styles.disabledBtn} disabled={disabled} >
                <Text style={styles[`${txtDisabled}`]}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default ChooseCloseCard;
