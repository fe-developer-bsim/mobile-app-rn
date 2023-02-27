import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallCgvInfo.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter, formatDot} from '../../utils/transformer.util';

class EmallCgvInfo extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const seatData = result(navigation, 'state.params.seatData', {});
    const amount = result(seatData, 'seatData.totalAmount', '');
    const charge = result(seatData, 'seatData.chargeData', '');
    const chargeFormat = formatDot(charge);
    const paymentSeatInfoList = result(navigation, 'state.params.seatData.seatData.paymentSeatInfoList', []);
    const seatTotal = paymentSeatInfoList.length;
    const chargeTotal = chargeFormat * seatTotal;
    const amountTotal = amount + chargeTotal;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <View style={styles.titleBuy}>
            <Text style={styles.textBuy}>{language.CGV__PAYMENT}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.leftPart}>{seatTotal}</Text>
              <Text style={styles.midPart}>{language.CGV__TICKET}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rightPart}>{language.CGV__RP} {currencyFormatter(amount)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.leftPart}>{seatTotal}</Text>
              <Text style={styles.midPart}>{language.CGV__CONVIENCE}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rightPart}>{language.CGV__RP} {currencyFormatter(chargeTotal)}</Text>
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.row}>
            <Text style={styles.leftPart2}>{language.CGV__TOTAL}</Text>
            <Text style={styles.rightPart2}>{language.CGV__RP} {currencyFormatter(amountTotal)}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmallCgvInfo;
