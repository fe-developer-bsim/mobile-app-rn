import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './IdentityFourthForm.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class IdentityFourthForm extends Component {

  render () {
    const {onFinalizeForm, onHowToTransferPress, vaNumber, vaName, smartfrenAmount} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.columnContainer} extraHeight={120}>
        <View >
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{language.IDENTITYFOURTHFORM__TITLE}</Text>
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Text style={styles.amountTitle}>{language.IDENTITYFOURTHFORM__TRANSFER_AMOUNT_TITLE}</Text>
            {smartfrenAmount === '0' ?
              <Text style={styles.amountTransfer}>{language.IDENTITYFOURTHFORM__TRANSFER_AMOUNT}</Text> :
              <Text style={styles.amountTransfer}>{language.IDENTITYFOURTHFORM__TRANSFER_AMOUNT_SMARTFREN}</Text>
            }
          </View>
          <View style={styles.FieldsContainerWrapper}>
            <Text style={styles.virtualAccountTitle}>{language.IDENTITYFOURTHFORM__TRANSFER_TARGET_ACCOUNT_VA}</Text>
            <Text style={styles.virtualAccount}>{vaNumber}</Text>
            <Text style={styles.codeBank}>{language.IDENTITYFOURTHFORM__TRANSFER_KODE_BANK}</Text>
          </View>
          {vaName ?
            <View style={styles.FieldsContainerWrapper}>
              <Text style={styles.accountNameTitle}>{language.IDENTITYFOURTHFORM__TRANSFER_TARGET_ACCOUNT_VA_NAME}</Text>
              <Text style={styles.accountName}>{vaName}</Text>
            </View> :
            <View style={styles.FieldsContainerWrapper}>
              <Text style={styles.accountNameTitle}/>
              <Text style={styles.accountName}/>
            </View>
          }
        </View>
        <View style={styles.buttonComponent}>
          <View style={styles.FieldsContainerWrapper}>
            {smartfrenAmount === '0' ?
              <Text style={styles.expireRegis}>{language.IDENTITYFOURTHFORM__EXPIRED_REGISTRATION}</Text> :
              <Text style={styles.expireRegis}>{language.IDENTITYFOURTHFORM__NEW_EXPIRED_SMARTFREN}</Text>
            }
          </View>
          <View style={styles.buttonNext}>
            <SinarmasButton style={styles.buttonHowTo} onPress={onHowToTransferPress}>
              <Text style={styles.buttonHowToTransfer}>{language.IDENTITYFOURTHFORM__HOW_TO_TRANSFER}</Text>
            </SinarmasButton>
            <SinarmasButton style={styles.buttonPayment} onPress={onFinalizeForm}>
              <Text style={styles.buttonIhaveMakePayment}>{language.IDENTITYFOURTHFORM__IHAVE_MAKE_A_PAYMENT}</Text>
            </SinarmasButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }

}

IdentityFourthForm.propTypes = {
  handleSubmit: PropTypes.func,
  navigation: PropTypes.object,
  onFinalizeForm: PropTypes.func,
  onHowToTransferPress: PropTypes.func,
  vaNumber: PropTypes.string,
  vaName: PropTypes.string,
  smartfrenAmount: PropTypes.string
};

export default IdentityFourthForm;
