import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {language} from '../../config/language';
import styles from './FundTransferMethodDetail.style';
import result from 'lodash/result';
import groupBy from 'lodash/groupBy';
import {currencyFormatter} from '../../utils/transformer.util';

export default class AccountInfoItemDetails extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    textStyle: PropTypes.object,
    timeConfig: PropTypes.object,
    transferChargeConfig: PropTypes.array
  }
  render () {
    const {textStyle = {}, type, timeConfig, transferChargeConfig} = this.props;
    const timeStartSKN = result(timeConfig, 'startTimeSkn_CUTOFF', '');
    const timeEndSKN = result(timeConfig, 'cutOffTimeSkn', '');
    const timeStartRTGS = result(timeConfig, 'startTimeRtgs_CUTOFF', '');
    const timeEndRTGS = result(timeConfig, 'cutOffTimeRtgs', '');
    const groupbyCharge  = groupBy(transferChargeConfig, 'mode', {});
    const limitPerTrxSKN = currencyFormatter(result(groupbyCharge, 'skn.0.limitPerTrxSKN', 0));
    const limitPerTrxRTGS = currencyFormatter(result(groupbyCharge, 'rtgs.0.limitPerTrxRTGS', 0));
    const limitPerTrxNetwork = currencyFormatter(result(groupbyCharge, 'network.0.maxAmount', 0));
    const limitPerTrxNBiFast = currencyFormatter(result(groupbyCharge, 'bifast.0.maxAmount', 0));
    const limitPerDaySKN = currencyFormatter(result(groupbyCharge, 'skn.0.limiPerDay', 0));
    const limitPerDayRTGS = currencyFormatter(result(groupbyCharge, 'rtgs.0.limiPerDay', 0));
    const limitPerDayNetwork = currencyFormatter(result(groupbyCharge, 'network.0.limiPerDay', 0));
    const limitPerDayBiFast = currencyFormatter(result(groupbyCharge, 'bifast.0.limiPerDay', 0));
    if (type === 'skn') {
      return (
        <View>
          <View style={styles.padding}>
            <Text style={styles.textStyleDisabled}>{language.TRANSFER__SKN_NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerTrxSKN}{language.TRANSFER__SKN_NETWORK_MAX_2}</Text>
            <Text style={textStyle}>Rp {limitPerDaySKN}{language.TRANSFER__SKN_NETWORK_MAX_3}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_TRANSFER}</Text></View>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_RECEIVE}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{timeStartSKN} - {timeEndSKN} {language.TRANSFER__WIB}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__SKN_TIME_TRANSFER}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__AFTER_TIME} {timeEndSKN} {language.TRANSFER__WIB}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__SKN_RTGS_AFTER_TIME_TRANSFER}</Text></View>
          </View>
        </View>
      );
    } else if (type === 'network') {
      return (
        <View>
          <View style={styles.padding}>
            <Text style={styles.textStyleDisabled}>{language.TRANSFER__SKN_NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerTrxNetwork}{language.TRANSFER__NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerDayNetwork}{language.TRANSFER__NETWORK_MAX_2}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_TRANSFER}</Text></View>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_RECEIVE}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__SKN_NETWORK_TIME_INSTANT}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__NETWORK_TIME_TRANSFER}</Text></View>
          </View>
        </View>
      );
    } else if (type === 'bifast') {
      return (
        <View>
          <View style={styles.padding}>
            <Text style={styles.textStyleDisabled}>{language.TRANSFER__SKN_NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerTrxNBiFast}{language.TRANSFER__NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerDayBiFast}{language.TRANSFER__NETWORK_MAX_2}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_TRANSFER}</Text></View>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_RECEIVE}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__SKN_NETWORK_TIME_INSTANT}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__NETWORK_TIME_TRANSFER}</Text></View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.padding}>
            <Text style={styles.textStyleDisabled}>{language.TRANSFER__SKN_NETWORK_MAX_1}</Text>
            <Text style={textStyle}>Rp {limitPerTrxRTGS}{language.TRANSFER__SKN_NETWORK_MAX_2}</Text>
            <Text style={textStyle}>Rp {limitPerDayRTGS}{language.TRANSFER__SKN_NETWORK_MAX_4}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_TRANSFER}</Text></View>
            <View style={styles.flex1}><Text style={styles.textStyleDisabled}>{language.TRANSFER__DETAIL_RECEIVE}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{timeStartRTGS} - {timeEndRTGS} {language.TRANSFER__WIB}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__RTGS_TIME_TRANSFER}</Text></View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__AFTER_TIME} {timeEndRTGS} {language.TRANSFER__WIB}</Text></View>
            <View style={styles.flex1}><Text style={textStyle}>{language.TRANSFER__SKN_RTGS_AFTER_TIME_TRANSFER}</Text></View>
          </View>
        </View>
      );
    }
  }
}
