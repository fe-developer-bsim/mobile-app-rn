import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './QRInputAmount.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {View} from 'react-native';
import {Field} from 'redux-form';
import {normalizeAmount, formatFieldAmount} from '../../utils/transformer.util';
import {SinarmasInput} from '../FormComponents';
import {language} from '../../config/language';

class QRInputAmount extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
  }

  render () {
    const {handleSubmit, invalid} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.flex1}>
          <Field
            name='amount'
            label={language.LABEL__QR_PAYMENT_AMOUNT}
            placeholder={language.HINTTEXT__QR_PAYMENT_AMOUNT}
            maxLength={13}
            format={formatFieldAmount}
            normalize={normalizeAmount}
            component={SinarmasInput}
            keyboardType='phone-pad'
          />
        </View>
        <View>
          <SinarmasButton onPress={handleSubmit} text={language.SERVICE__NEXT_BUTTON} disabled={invalid}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRInputAmount;
