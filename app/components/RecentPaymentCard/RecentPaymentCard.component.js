import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Card from '../Card/Card.component';
import {language} from '../../config/language';
import {bold, cardGreyLabelStyle, fontSizeSmallStyle} from '../../styles/common.styles';
import Touchable from '../Touchable.component';
import styles from './RecentPaymentCard.styles';

const RecentPaymentCard = ({onPress, consumerNo = 'NA', areaCode = {}, status = '', biller = {},  style = {}}) => (
  <Touchable onPress={onPress}>
    <Card style={{...styles.card, ...style, ...styles.cardStyle}}>
      <View style={{...styles.upperHalf, ...styles.spaceBetween}}>
        <View>
          <Text style={fontSizeSmallStyle}>{language.WATER_BILL__CONSUMER_NO}</Text>
          <Text style={{...bold, ...fontSizeSmallStyle}}>{consumerNo}</Text>
        </View>
        {areaCode ? (
          <View>
            <Text style={fontSizeSmallStyle}>{language.WATER_BILL__AREA_CODE}</Text>
            <Text style={styles.areaCode}>{areaCode.label}</Text>
          </View>
        ) : null}
      </View>
      <View style={{...cardGreyLabelStyle, ...styles.bottomHalf}}>
        {status ? <Text style={[fontSizeSmallStyle, styles.status, bold]}>{status}</Text> : null}
        <View style={[styles.spaceBetween]}>
          {biller.name ?
            <View>
              <Text style={[fontSizeSmallStyle]}>Provider</Text>
              <Text style={[bold, fontSizeSmallStyle]}>{biller.name}</Text>
            </View>
            : null
          }
        </View>
      </View>
    </Card>
  </Touchable>
);
RecentPaymentCard.propTypes = {
  onPress: PropTypes.func,
  consumerNo: PropTypes.string,
  style: PropTypes.object,
  areaCode: PropTypes.object,
  status: PropTypes.string,
  biller: PropTypes.object,
  billAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default RecentPaymentCard;
