import {View, Text, Clipboard} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRRefundInfo.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {result} from 'lodash';
import Touchable from '../Touchable.component';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';

class QRRefundInfo extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
  }

  state = {
    rcode_id: ''
  }

  writeToClipboard = () => {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params.data', {});
    const rcode_id = result(data, 'rcode_id', '');
    Clipboard.setString(rcode_id);
  };

  render () {
    const {navigation} = this.props;
    const data = result(navigation, 'state.params.data', {});
    const created_date = result(data, 'created_date', '');
    const rcode_amount = result(data, 'rcode_amount', '');
    const rcode_id = result(data, 'rcode_id', '');
    const rcode_redeem_flag = result(data, 'rcode_redeem_flag', '');
    const rcode_used_invoice = result(data, 'rcode_used_invoice', '');
    const rcode_used_by = result(data, 'rcode_used_by', '');
    const modified_date = result(data, 'modified_date', '');
    const amountFormatter = currencyFormatter(rcode_amount);
    const created_date_normalise = created_date ? moment(created_date).format('DD MMM YYYY') : '';
    const modified_date_normalise = modified_date ? moment(modified_date).format('DD MMM YYYY') : '';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
        { rcode_redeem_flag === '0' ?
          <View>
            <View>
              <Text style={styles.infoTxt1}>{language.QR_GPN__REFUND_INFO_01}</Text>
              <View style={styles.boxTxt2}>
                <Text style={styles.infoTxt2}>{language.QR_GPN__REFUND_INFO_02}</Text>
                <Text style={styles.infoTxt2}>{language.QR_GPN__REFUND_INFO_03}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.boxCode}>{rcode_id}</Text>
              <Touchable onPress={this.writeToClipboard}>
                <SimasIcon name='copy' style={styles.copyIcon} size={25}/>
              </Touchable>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.infoTxt3}>{language.QR_GPN__REFUND_INFO_04}</Text>
              <Text style={styles.infoTxt4}>{language.QR_GPN__REFUND_RP}{amountFormatter}</Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.infoTxt3}>{language.QR_GPN__REFUND_INFO_05}</Text>
              <Text style={styles.infoTxt4}>{created_date_normalise}</Text>
            </View>
          </View>
          :
          <View>
            <View>
              <Text style={styles.infoTxt1}>{language.QR_GPN__REFUND_INFO_01}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boxCode}>{rcode_id}</Text>
              <View>
                <SimasIcon name='copy' style={styles.copyIconUsed} size={25}/>
              </View>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.infoTxt3}>{language.QR_GPN__REFUND_TRANSACTION_TXT}</Text>
              <Text style={styles.infoTxt4}>{rcode_used_invoice}</Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.infoTxt3}>{language.QR_GPN__REFUND_USED_BY}</Text>
              <Text style={styles.infoTxt4}>{rcode_used_by}</Text>
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.infoTxt3}>{language.QR_GPN__REFUND_DATE}</Text>
              <Text style={styles.infoTxt4}>{modified_date_normalise}</Text>
            </View>
            <View>
              <Text style={styles.redTxt}>{language.QR_GPN__REFUND_USED_02}</Text>
            </View>
          </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}


export default QRRefundInfo;
