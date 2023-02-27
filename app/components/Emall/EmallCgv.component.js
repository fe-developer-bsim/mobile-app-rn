import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallCgv.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter, formatDot} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import moment from 'moment';
import forEach from 'lodash/forEach';

class EmallCgv extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.object,
    getResult: PropTypes.func,
    navigation: PropTypes.object,
    getConfirmSimas: PropTypes.func,
    cgvCoupon: PropTypes.object,
    cgvConfig: PropTypes.object,
    getConfirmInfo: PropTypes.func,
    goLanding: PropTypes.func,
  }

  sendNavInfo = () => {
    const {navigation, getConfirmInfo} = this.props;
    const navData = result(navigation, 'state.params.accData', {});
    const seatData = result(navigation, 'state.params.emallData', {});
    getConfirmInfo(navData, seatData);
  }

  sendSeatData = () => {
    const {navigation, getResult} = this.props;
    const navData = result(navigation, 'state.params.accData', {});
    const seatData = result(navigation, 'state.params.emallData', {});
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    getResult(navData, seatData, isUseSimas);
  }

  render () {
    const {navigation, goLanding, simasPoin} = this.props;
    const accData = result(navigation, 'state.params.accData', '');
    const emallData = result(navigation, 'state.params.emallData', '');
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    const name = result(simasPoin, 'fullName', '');
    const totalPoin = result(simasPoin, 'simasPoin.data.total_point', '');
    const seatData = result(emallData, 'seatData', {});
    const productType = result(accData, 'productType', '');
    const nameAccount = result(accData, 'name', '');
    const accountNumber = result(accData, 'accountNumber', '');
    const balance = result(accData, 'balances.availableBalance', '');
    const availableBalance = isUseSimas === 'yes' ? totalPoin : balance;
    const film = result(seatData, 'scheduleData.movieName', '');
    const location = result(seatData, 'scheduleData.cinemaName', '');
    const showDate = moment(result(seatData, 'scheduleData.showDate', ''));
    const showDateFormatted = String(showDate.format('dddd, D MMMM YYYY'));
    const showStartTime = result(seatData, 'scheduleData.showStartTime', '');
    const startTime = showStartTime === '' ? '' : showStartTime.substring(0, 2) + ':' + showStartTime.substring(2, 4);
    const auditorium = result(seatData, 'scheduleData.studioName', '');
    const infoLength = seatData.paymentSeatInfoList.length;
    let rowSeat = [];
    let i = 0;
    forEach(seatData.paymentSeatInfoList, (value) => {
      i++;
      if (i !== infoLength) {
        rowSeat = [...rowSeat, value.rowName + value.seatNumber + ', '];
      } else {
        rowSeat = [...rowSeat, value.rowName + value.seatNumber];
      }
    });
    const totalAmount = result(seatData, 'totalAmount', '');
    const charge = result(seatData, 'chargeData', '');
    const chargeFormat = formatDot(charge);
    const paymentSeatInfoList = result(seatData, 'paymentSeatInfoList', []);
    const seatTotal = paymentSeatInfoList.length;
    const chargeTotal = chargeFormat * seatTotal;
    const amountTotal = totalAmount + chargeTotal;
    const isDisable = availableBalance < amountTotal;
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
          <View style={styles.bgWhite}>
            <View style={[styles.row, styles.mb10]}>
              <Text style={styles.titleTxt}>{language.CGV__BUY_TICKET}</Text>
              <Touchable onPress={goLanding}>
                <View style={styles.buttonTxt}>
                  <Text>{language.CGV__CANCELLATION}</Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__FILM}</Text>
              <Text style={styles.valueTxt}>{film}</Text>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__LOCATION}</Text>
              <Text style={styles.valueTxt}>{language.CGV__CGV} {location}</Text>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__SHOW_DATE}</Text>
              <Text style={styles.valueTxt}>{showDateFormatted}</Text>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__SHOW_TIME}</Text>
              <Text style={styles.valueTxt}>{startTime}</Text>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__AUDITORIUM}</Text>
              <Text style={styles.valueTxt}>{auditorium}</Text>
            </View>
            <View style={styles.contentCont}>
              <Text style={styles.headTxt}>{language.CGV__SEAT}</Text>
              <Text style={styles.valueTxt}>{rowSeat}</Text>
            </View>
          </View>
          <View style={styles.greyLine} />
          <View style={styles.bgWhite}>
            { isUseSimas === 'yes' ?
              <View>
                <Text style={styles.amountHead1}>{language.CGV__SIMAS_POIN} - {name}</Text>
                <Text style={styles.amountHead2}>{language.CGV__AVAIL_BALANCE2} - {currencyFormatter(totalPoin)} {language.CGV__POIN}</Text>
              </View>
              :
              <View>
                <Text style={styles.amountHead1}>{productType} - {nameAccount} - {accountNumber}</Text>
                <Text style={ isDisable ? styles.amountHead2Red : styles.amountHead2}>{language.CGV__AVAIL_BALANCE} {currencyFormatter(availableBalance)}</Text>
              </View>
            }
            <View style={styles.greyLine2} />
            <Touchable onPress={this.sendNavInfo}  style={styles.row}>
              <Text style={styles.amountTxt2}>{language.CGV__PRICE}</Text>
              <View style={styles.amountTxt4View}>
                <Text style={styles.amountTxt3}>{language.CGV__RP} {currencyFormatter(amountTotal)}</Text>
              </View>
              <View style={styles.iconContainer}>
                <SimasIcon name={'more-menu'} size={15} style={styles.cardIcon}/>
              </View>
            </Touchable>
          </View>
        </ScrollView>
        <View style={styles.greyLine2} />
        <View style={styles.buttonContainer}>
          <View>
            <Text>{language.CGV__TOTAL}</Text>
            <Text>{language.CGV__RP} {currencyFormatter(amountTotal)}</Text>
          </View>
          <SinarmasButton disabled={isDisable} style={styles.button2} onPress={this.sendSeatData} text={language.CGV__PAY} />
        </View>
      </View>
    );
  }
}

export default EmallCgv;

