import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRRefundList.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';

class QRRefundList extends React.Component {

  static propTypes = {
    rcode_amount: PropTypes.string,
    rcode_redeem_flag: PropTypes.string,
    getRefundInfo: PropTypes.func,
    created_date: PropTypes.string,
  }

  render () {
    const {rcode_amount, rcode_redeem_flag, getRefundInfo, created_date} = this.props;
    const amountFormatter = currencyFormatter(rcode_amount);
    const created_date_normalise = created_date ? moment(created_date).format('DD MMM YYYY') : '';
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.container}>
        { rcode_redeem_flag === '0' ?
          <Touchable onPress={getRefundInfo}>
            <View style={styles.bgWhiteList}>
              <View>
                <Text style={styles.textRefund}>{language.QR_GPN__REFUND_MAX_AMOUNT}</Text>
                <View style={styles.row}>
                  <Text style={styles.textAmount}>{language.QR_GPN__REFUND_RP}{amountFormatter}</Text>
                  <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                </View>
                <Text style={styles.date}>{created_date_normalise}</Text>
              </View>
            </View>
          </Touchable>
          : rcode_redeem_flag === '1' ?
            <View style={styles.bgWhiteList}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.txtRefund}>{language.QR_GPN__REFUND_MAX_AMOUNT}</Text>
                  <Text style={styles.txtUsed}>{language.QR_GPN__REFUND_ALREADY_USED}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.txtAmount}>{language.QR_GPN__REFUND_RP}{amountFormatter}</Text>
                  <SimasIcon name={'arrow'} size={15} style={styles.arrowIconUsed}/>
                </View>
                <Text style={styles.date}>{created_date_normalise}</Text>  
              </View>
            </View>
            :
            null
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default QRRefundList;
