import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './HistoryItem.component.styles';
import {language} from '../../config/language';
import moment from 'moment';
import {isEmpty} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';

import {currencyFormatter} from '../../utils/transformer.util';

class HistoryItem extends React.Component {
  render () {
    const {style, trxDate, description, trxPoin, saldoPoin, detailPayment} = this.props;
    const expiredDates = moment(trxDate).format('D MMM YYYY');
    const isMinus = trxPoin <= 0;
    return (
      <View style={styles.detailsContainer}>
        <View style={[styles.container, style]}>
          <View style={styles.icon}>
            <SimasIcon name={isMinus ? 'path2' : 'path2'} size={7} style={isMinus ? styles.iconFailure : styles.iconSuccess}/>
          </View>
          <View style={styles.detailContainer}>
            <View>
              <Text style={styles.descriptionHeading} numberOfLines={2}>{description}</Text>  
              {
                isEmpty(detailPayment) ? 
                  null :
                  <Text style={styles.billerName}>{detailPayment}</Text>

              }
              <Text style={styles.transactionDate}>{language.SIMAS_POIN__LAST_POIN}{currencyFormatter(saldoPoin)}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={isMinus ? styles.amountRefund : styles.amount } numberOfLines={1}>{!isMinus ? '+' : ''}{currencyFormatter(trxPoin) + ' points'} </Text>
            <Text style={styles.transactionHeading}>{expiredDates}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
      </View>
    );
  }
  static propTypes = {
    navigation: PropTypes.object,
    urlImage: PropTypes.string,
    style: PropTypes.object,
    trxDate: PropTypes.string,
    description: PropTypes.string,
    cifCode: PropTypes.string,
    onPress: PropTypes.func,
    image: PropTypes.string,
    saldoPoin: PropTypes.number,
    expiredDates: PropTypes.string,
    redemptionDates: PropTypes.string,
    trxPoin: PropTypes.number,
    voucher: PropTypes.object,
    urlDetail: PropTypes.string,
    detailPayment: PropTypes.string
  }
}
export default HistoryItem;
