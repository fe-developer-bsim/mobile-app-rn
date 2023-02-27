import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './CgvOrderItem.component.styles';
import {language} from '../../config/language';
import moment from 'moment';
import {ScrollView} from 'react-native';
import result from 'lodash/result';
import truncate from 'lodash/truncate';

class OrderItem extends React.Component {
  render () {
    const {style, onPress, urlImage, redemptionDate, voucher} = this.props;
    const redemptionDates = moment(redemptionDate).format('D MMM YYYY hh:mm');
    const voucherName = result(voucher, 'movieName');
    const newVoucherName = truncate(voucherName, {'length': '20', 'omission': '...'});
    const bookingCode = result(voucher, 'bookingCode');
    const passKey = result(voucher, 'passKey');
    const cinemaName = result(voucher, 'cinemaName');
    return (
      <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={[styles.offerContainer, style]} onPress={onPress}>
          <View style={styles.offerImage}>
            <Image source={{uri: urlImage}} style={styles.imageSizeicon} />
          </View>
          <View>
            <View style={styles.detailsContainer}>
              <Text style={styles.transactionDate}>{language.CGV__BOOKING_CODE}</Text>
              <Text style={styles.bookingHeading}>{bookingCode}</Text>
              <Text style={styles.transactionDate}>{language.CGV__PASSKEY}</Text>
              <Text style={styles.bookingHeading}>{passKey}</Text>
              <Text style={styles.voucherNameHeading}>{newVoucherName}</Text>
              <Text style={styles.LocationName}>{cinemaName}</Text>
              <Text style={styles.datePurchase}>{language.PROFILE__SIMAS_POIN_REDEMPTION_DATE}  {redemptionDates}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  static propTypes = {
    navigation: PropTypes.object,
    urlImage: PropTypes.string,
    style: PropTypes.object,
    expiredDate: PropTypes.string,
    voucherName: PropTypes.string,
    cifCode: PropTypes.string,
    onPress: PropTypes.func,
    image: PropTypes.string,
    redemptionDate: PropTypes.string,
    expiredDates: PropTypes.string,
    redemptionDates: PropTypes.string,
    egiftcode: PropTypes.string,
    voucher: PropTypes.object,
    urlDetail: PropTypes.string,
    passkey: PropTypes.string,
    booking_id: PropTypes.string,
  }
}
export default OrderItem;
