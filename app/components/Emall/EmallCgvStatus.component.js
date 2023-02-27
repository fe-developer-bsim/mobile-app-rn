import {View, Image, Text, Linking} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallCgvStatus.styles';
import LogoImage from '../../assets/images/simobiplus.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Toast} from '../../utils/RNHelpers.util';
import moment from 'moment';
import forEach from 'lodash/forEach';
import Touchable from '../Touchable.component';
import {currencyFormatter, formatDot} from '../../utils/transformer.util';

class EmallCgvStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    date: PropTypes.string,
    transRefNum: PropTypes.string,
    onPrimaryCustomerCall: PropTypes.func,
    toDashboard: PropTypes.func,
    simasPoin: PropTypes.object,
  }

  openStoreURL = () => {
    Linking.canOpenURL('http://.bit.ly/simobiplus').then((supported) => {
      if (supported) {
        Linking.openURL('http://bit.ly/simobiplus');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  render () {
    const {handleSubmit, navigation, date, transRefNum, onPrimaryCustomerCall, simasPoin} = this.props;
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    const successData = result(navigation, 'state.params.successData', '');
    const accData = result(navigation, 'state.params.navData', '');
    const resData = result(navigation, 'state.params.resData', {});
    const bookingCode = result(resData, 'paymentResult.bookingCode', '');
    const passKey = result(resData, 'paymentResult.passKey', '');
    const seatData = result(navigation, 'state.params.seatData', {});
    const film = result(seatData, 'seatData.scheduleData.movieName', '');
    const location = result(seatData, 'seatData.scheduleData.cinemaName', '');
    const showDate = moment(result(seatData, 'seatData.scheduleData.showDate', ''));
    const showDateFormatted = String(showDate.format('dddd, D MMMM YYYY'));
    const showStartTime = result(seatData, 'seatData.scheduleData.showStartTime', '');
    const startTime = showStartTime === '' ? '' : showStartTime.substring(0, 2) + ':' + showStartTime.substring(2, 4);
    const auditorium = result(seatData, 'seatData.scheduleData.studioName', '');
    const infoLength = seatData.seatData.paymentSeatInfoList.length;
    let rowSeat = [];
    let i = 0;
    forEach(seatData.seatData.paymentSeatInfoList, (value) => {
      i++;
      if (i !== infoLength) {
        rowSeat = [...rowSeat, value.rowName + value.seatNumber + ', '];
      } else {
        rowSeat = [...rowSeat, value.rowName + value.seatNumber];
      }
    });
    const productType = result(accData, 'productType', '');
    const nameAccount = result(accData, 'name', '');
    const accountNumber = result(accData, 'accountNumber', '');
    const totalAmount = result(seatData, 'totalAmount', '');
    const charge = result(seatData, 'chargeData', '');
    const chargeFormat = formatDot(charge);
    const paymentSeatInfoList = result(seatData, 'paymentSeatInfoList', []);
    const seatTotal = paymentSeatInfoList.length;
    const chargeTotal = chargeFormat * seatTotal;
    const amountTotal = totalAmount + chargeTotal;
    const name = result(simasPoin, 'fullName', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        { successData === 'success' ?
          <View>
            <View style={styles.whiteContainer}>
              <View style={styles.logoContainer}>
                <Image source={LogoImage} style={styles.logoImage}/>
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.regCont}>
                <View>
                  <Text style={styles.successTxt}>{language.CGV__SUCCESS_01}</Text>
                  <Text style={styles.successTxt2}>{language.CGV__SUCCESS_02}</Text>
                </View>
                <View style={styles.checkContainer}>
                  <SimasIcon name={'success-circle'} size={50} style={styles.plusIcon}/>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.whiteText}>{language.CGV__NO_TRANS} {transRefNum}</Text>
              </View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.whiteContainer}>
              <View>
                <Text style={styles.rcpTxt}>{language.CGV__RECEIPT}</Text>
              </View>
              <View style={styles.greyLine} />
              <View style={styles.regCont}>
                <Text style={styles.amountTitle}>{language.CGV__TICKET_PURCHASE}</Text>
                <Text style={styles.amountText}>{language.CGV__RP} {currencyFormatter(amountTotal)}</Text>
              </View>
              <View style={styles.greyLine} />
              { isUseSimas === 'yes' ?
                <View>
                  <Text style={styles.sourceAccount}>{language.CGV__SOURCE_ACCOUNT} - <Text style={styles.account}>{language.CGV__SIMAS_POIN}, {name}</Text></Text>
                </View>
                :
                <View>
                  <Text style={styles.sourceAccount}>{language.CGV__SOURCE_ACCOUNT} - <Text style={styles.account}>{productType}, {accountNumber}, {nameAccount}</Text></Text>
                </View>
              }
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.whiteContainer}>
              <View>
                <Text style={styles.bookingTxt}>{language.CGV__BOOKING_CODE}</Text>
                <Text style={styles.bookingTxt2}>{bookingCode}</Text>
              </View>
              <View style={styles.info2}>
                <Text style={styles.bookingTxt}>{language.CGV__PASSKEY}</Text>
                <Text style={styles.bookingTxt2}>{passKey}</Text>
              </View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.whiteContainer}>
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
            <View style={styles.greyLine2} />
            <View style={styles.whiteContainer}>
              <View style={styles.messContainer}>
                <SimasIcon name={'envelope'} size={35} style={styles.waitIcon}/>
                <View style={styles.info2}>
                  <Text style={styles.txt}>{language.CGV__HELP_04}</Text>
                </View>
              </View>
            </View>
            <View style={styles.whiteContainer}>

              <View style={styles.helpContainer}>
                <Touchable onPress={onPrimaryCustomerCall}>
                  <Text style={styles.infoTxt1}>{language.CGV__HELP_01}
                    <Text style={styles.footerTextRed}>{language.CGV__CALL}</Text>
                  </Text>
                </Touchable>
                <Text style={styles.infoTxt2}>{language.CGV__HELP_02} <Text style={styles.footerTextRed} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                <Text style={styles.infoTxt3}>{language.CGV__HELP_03}</Text>
              </View>
            </View>
            <View style={styles.buttonAgree}>
              <SinarmasButton onPress={handleSubmit} text={language.CGV__DONE} />
            </View>
          </View>
          :
          <View>
            <View style={styles.redContainer}>
              <View style={styles.logoContainer}>
                <Image source={LogoImage} style={styles.logoImage}/>
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.regCont}>
                <View>
                  <Text style={styles.successTxt}>{language.CGV__FAIL_01}</Text>
                </View>
                <View style={styles.checkContainer}>
                  <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.whiteText}>{language.CGV__NO_TRANS} {transRefNum}</Text>
              </View>
            </View>
            <View style={styles.greyLine2} />
            <View style={styles.whiteContainer}>
              <View style={styles.helpContainer}>
                <Touchable onPress={onPrimaryCustomerCall}>
                  <Text style={styles.infoTxt1}>{language.CGV__HELP_01}
                    <Text style={styles.footerTextRed}>{language.CGV__CALL}</Text>
                  </Text>
                </Touchable>
                <Text style={styles.infoTxt2}>{language.CGV__HELP_02} <Text style={styles.footerTextRed} onPress={this.openStoreURL}>bit.ly/simobiplus</Text></Text>
                <Text style={styles.infoTxt3}>{language.CGV__HELP_03}</Text>
              </View>
            </View>
            <View style={styles.buttonAgree}>
              <SinarmasButton onPress={handleSubmit} text={language.CGV__DONE} />
            </View>
          </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}


export default EmallCgvStatus;
