import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTrfConfirm.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import result from 'lodash/result';
import QRCode from 'react-native-qrcode-generator';
import {currencyFormatter} from '../../utils/transformer.util';
import {language} from '../../config/language';

class QRTrfConfirm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    ReturnHome: PropTypes.func,
  }

  submit = () => {
    const {dispatch, ReturnHome} = this.props;
    dispatch(ReturnHome);
  };

  render () {
    const {navigation} = this.props;
    const hasil = result(navigation, 'state.params.hasil');
    const amount = result(navigation, 'state.params.form.amount');
    const name = result(navigation, 'state.params.form.accountNo.name');
    const amountView = currencyFormatter(amount);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        <View style={styles.formContainer}>
          <View style={styles.containerInner}>
            <QRCode
              value={hasil}
              size={250}
              bgColor='#000'
              fgColor='#fff' />
          </View>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.amountText}>{name}</Text>
          <Text style={styles.amountText}>{language.QR_GPN__REFUND_RP}{amountView}</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default QRTrfConfirm;
