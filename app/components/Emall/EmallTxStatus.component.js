import {View, Image, Text, Linking} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallTxStatus.styles';
import LogoImage from '../../assets/images/simobiplus.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Toast} from '../../utils/RNHelpers.util';
import forEach from 'lodash/forEach';
import Touchable from '../Touchable.component';
import {currencyFormatter, diffTime, dateFormatter} from '../../utils/transformer.util';
import filter from 'lodash/filter';
import find from 'lodash/find';
import sriwijaya from '../../assets/images/sriwijaya-air.png';
import lion from '../../assets/images/lion-air.png';
import kalstar from '../../assets/images/kalstar-aviation.png';
import jetstar from '../../assets/images/jetstar.png';
import garuda from '../../assets/images/garuda-indonesia.png';
import citilink from '../../assets/images/citilink.png';
import airasia from '../../assets/images/air-asia.png';
import wings from '../../assets/images/wings-air.png';
import nam from '../../assets/images/jnam.png';
import airlineTransit from '../../assets/images/multi-flight.png';
import map from 'lodash/map';

class EmallTxStatus extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    date: PropTypes.string,
    transRefNum: PropTypes.string,
    onPrimaryCustomerCall: PropTypes.func,
    toDashboard: PropTypes.func,
    airportOrigin: PropTypes.string,
    airportDestination: PropTypes.string,
    cityOrigin: PropTypes.string,
    cityDestination: PropTypes.string,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
    profile: PropTypes.object,
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
    const {handleSubmit, navigation, date, transRefNum, onPrimaryCustomerCall, toDashboard, airportOrigin, airportDestination, cityOrigin, cityDestination, fareDepart, fareReturn, profile} = this.props;
    const successData = 'success';
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    const name = result(profile, 'name', '');
    const flightData = result(navigation, 'state.params.flightData', {});
    const accData = result(navigation, 'state.params.accData', {});
    const totalDepart = result(fareDepart, 'Total', '');
    const totalReturn = result(fareReturn, 'Total', '');

    // FLIGHT DEPART
    let segments = result(flightData, 'Segments', []);
    const segmentsDeparture = filter(segments, {'Num': '0'});
    const flightDeparture = find(segments, {Num: '0', Seq: '0'});
    const departTime = result(flightDeparture, 'DepartTime', '');
    const departDate = result(flightDeparture, 'DepartDate', '');
    const departDateFormatted = dateFormatter(departDate, 'dddd, D MMMM YYYY');
    const FlightNumber = result(flightDeparture, 'FlightNumber', '');
    const flightTransit = result(segments, 'TotalTransit', 0);
    const AirlineName = result(flightDeparture, 'AirlineName', '');
    const Category = result(flightDeparture, 'Category', '');
    const Origin = result(flightDeparture, 'Origin', '');
    // SET TRANSIT NAME
    const departTrans1 = find(segments, {Num: '0', Seq: '1'});
    const originTrans1 = result(departTrans1, 'Origin', '');
    const departTrans2 = find(segments, {Num: '0', Seq: '2'});
    const originTrans2 = result(departTrans2, 'Origin', '');
    const returnTrans1 = find(segments, {Num: '1', Seq: '1'});
    const originReturnTrans1 = result(returnTrans1, 'Origin', '');
    const returnTrans2 = find(segments, {Num: '1', Seq: '2'});
    const originReturnTrans2 = result(returnTrans2, 'Origin', '');


    // SET THE LAST DEPART IF THERE IS A TRANSIT TRIP
    let departFlight = [];
    forEach(filter(segments, {'Num': '0'}), (value) => {
      departFlight = [...departFlight, value];
    });
    const infoDepartFlight = departFlight.length;
    let lastDepartFlight = [];
    let i = 0;
    forEach(departFlight, (value) => {
      i++;
      if (i === infoDepartFlight) {
        lastDepartFlight = [...lastDepartFlight, value];
      }
    });
    const lastDestination = result(lastDepartFlight, '0.Destination', '');
    const lastArriveTime = result(lastDepartFlight, '0.ArriveTime', '');
    const flightTotalDuration = diffTime(departTime, lastArriveTime);
    const lengthDeparture = segmentsDeparture.length;

    // FLIGHT RETURN
    const segmentsReturn = result(navigation, 'state.params.segmentsReturn', {});
    const flightReturn = find(segmentsReturn, {Num: '1', Seq: '0'});
    const AirlineNameReturn = result(flightReturn, 'AirlineName', '');
    const CategoryReturn = result(flightReturn, 'Category', '');
    const FlightNumberReturn = result(flightReturn, 'FlightNumber', '');
    const OriginReturn = result(flightReturn, 'Origin', '');

    // PASSENGER
    const passengers = result(flightData, 'Passengers', []);
    const productType = result(accData, 'productType', '');
    const nameAccount = result(accData, 'name', '');
    const accountNumber = result(accData, 'accountNumber', '');

    const airlineNameDepart = AirlineName === 'Lion' ? lion : AirlineName === 'Sriwijaya' ? sriwijaya
      : AirlineName === 'Citilink' ? citilink : AirlineName === 'AirAsia' ? airasia
        : AirlineName === 'Garuda' ? garuda : AirlineName === 'Jetstar' ? jetstar
          : AirlineName === 'Kalstar' ? kalstar : AirlineName === 'Wings' ? wings
            : AirlineName === 'NAM' ? nam : null;
    const airlineNameReturn = AirlineNameReturn === 'Lion' ? lion : AirlineNameReturn === 'Sriwijaya' ? sriwijaya
      : AirlineNameReturn === 'Citilink' ? citilink : AirlineNameReturn === 'AirAsia' ? airasia
        : AirlineNameReturn === 'Garuda' ? garuda : AirlineNameReturn === 'Jetstar' ? jetstar
          : AirlineNameReturn === 'Kalstar' ? kalstar : AirlineNameReturn === 'Wings' ? wings
            : AirlineNameReturn === 'NAM' ? nam : null;
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
                  <Text style={styles.successTxt}>{language.FLIGHT__TRANS_SUCCEED}</Text>
                  <Text style={styles.successTxt2}>{language.FLIGHT__TRANS_SUCCEED2}</Text>
                </View>
                <View style={styles.checkContainer}>
                  <SimasIcon name={'success-circle'} size={50} style={styles.plusIcon}/>
                </View>
              </View>
              <View style={styles.info}>
                <Text style={styles.whiteText}>{language.FLIGHT__TRANS_NUMBER} {transRefNum}</Text>
              </View>
            </View>

            <View style={styles.greyLine2} />

            <View style={styles.whiteContainer}>
              <View>
                <Text style={styles.receiptTxt}>{language.FLIGHT__RECEIPT}</Text>
              </View>
              <View style={styles.greyLine} />
              <View style={[styles.row]}>
                <Text style={styles.purchaseTxt}>{language.FLIGHT__TICKET_PURCHASE}</Text>
                <Text style={styles.priceTxt}>{language.FLIGHT__RP} {currencyFormatter(totalDepart + totalReturn)}</Text>
              </View>
              <View style={styles.greyLine} />
              { isUseSimas === 'yes' ?
                <View>
                  <Text style={styles.sourceTxt}>{language.FLIGHT__SOURCE_ACC} - {language.FLIGHT__SIMAS_POIN}, {name}</Text>
                </View>
                :
                <View>
                  <Text style={styles.sourceTxt}>{language.FLIGHT__SOURCE_ACC} - {productType}, {accountNumber}, {nameAccount}</Text>
                </View>
              }
            </View>

            <View style={styles.greyLine2} />

            <View style={[styles.whiteContainer, styles.deptView]}>
              <View style={[styles.mh20, styles.mb20]}>
                <View style={styles.depturnView}>
                  <Text style={styles.depturnTxt}>{language.FLIGHT__DEPART}</Text>
                </View>
                <View style={styles.row}>
                  <View><Text style={styles.departTxt}>{departDateFormatted}</Text></View>
                  <View><Text style={styles.arriveTime}>{flightTotalDuration}</Text></View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.row, styles.mv10]}>
                  <View style={styles.iconView}>
                    <Image source={lengthDeparture > 1 ? airlineTransit : airlineNameDepart} style={styles.imageFlight} />
                  </View>
                  <View>
                    <View><Text style={styles.airlineTxt}>{AirlineName}</Text></View>
                    <View><Text style={styles.typeTxt}>{Category}</Text></View>
                  </View>
                </View>
                <View style={styles.flNumberView}>
                  <Text style={styles.flNumberTxt}>{FlightNumber}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.wd40}>
                  <Text style={styles.originTxt}>{Origin}</Text>
                  <Text style={styles.locTxt}>{airportOrigin}, </Text>
                  <Text style={styles.locTxt}>{cityOrigin}</Text>
                  <Text style={styles.dtimeTxt}>{departTime}</Text>
                </View>
                <View style={styles.wd10}>
                  <SimasIcon name={'arrow-red'} size={25} style={styles.proceedIcon}/>
                </View>
                <View style={styles.wd50}>
                  <Text style={styles.originTxt}>{lastDestination}</Text>
                  <Text style={styles.locTxt}>{airportDestination}, </Text>
                  <Text style={styles.locTxt}>{cityDestination}</Text>
                  <Text style={styles.dtimeTxt}>{lastArriveTime}</Text>
                </View>
              </View>
              <View>
                { flightTransit === 0 ?
                  <Text style={styles.directTxt}>{language.FLIGHT__DIRECT_FLIGHT}</Text>
                  : flightTransit === 1 ?
                    <Text style={styles.directTxt}>{language.FLIGHT__1TRANSITS} {originTrans1}</Text>
                    : flightTransit === 2 ?
                      <Text style={styles.directTxt}>{language.FLIGHT__2TRANSITS} {originTrans1}, {originTrans2}</Text>
                      :
                      null
                }
              </View>
            </View>


            { flightReturn !== undefined ?
              <View>
                <View style={styles.greyLine2} />
                <View style={[styles.whiteContainer, styles.deptView]}>
                  <View style={[styles.mh20, styles.mb20]}>
                    <View style={styles.depturnView}>
                      <Text style={styles.depturnTxt}>{language.FLIGHT__ARRIVAL}</Text>
                    </View>
                    <View style={styles.row}>
                      <View><Text style={styles.departTxt}>{departDateFormatted}</Text></View>
                      <View><Text style={styles.arriveTime}>{flightTotalDuration}</Text></View>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={[styles.row, styles.mv10]}>
                      <View style={styles.iconView}>
                        <Image source={lengthDeparture > 1 ? airlineTransit : airlineNameReturn} style={styles.imageFlight} />
                      </View>
                      <View>
                        <View><Text style={styles.airlineTxt}>{AirlineNameReturn}</Text></View>
                        <View><Text style={styles.typeTxt}>{CategoryReturn}</Text></View>
                      </View>
                    </View>
                    <View style={styles.flNumberView}>
                      <Text style={styles.flNumberTxt}>{FlightNumberReturn}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.wd40}>
                      <Text style={styles.originTxt}>{OriginReturn}</Text>
                      <Text style={styles.locTxt}>{airportOrigin}</Text>
                      <Text style={styles.locTxt}>{cityOrigin}</Text>
                      <Text style={styles.dtimeTxt}>{departTime}</Text>
                    </View>
                    <View style={styles.wd10}>
                      <SimasIcon name={'arrow-red'} size={25} style={styles.proceedIcon}/>
                    </View>
                    <View style={styles.wd50}>
                      <Text style={styles.originTxt}>{lastDestination}</Text>
                      <Text style={styles.locTxt}>{airportDestination}</Text>
                      <Text style={styles.locTxt}>{cityDestination}</Text>
                      <Text style={styles.dtimeTxt}>{lastArriveTime}</Text>
                    </View>
                  </View>
                  <View>
                    { flightTransit === 0 ?
                      <Text>{language.FLIGHT__DIRECT_FLIGHT}</Text>
                      : flightTransit === 1 ?
                        <Text>{language.FLIGHT__1TRANSITS} {originReturnTrans1}</Text>
                        : flightTransit === 2 ?
                          <Text>{language.FLIGHT__2TRANSITS} {originReturnTrans1}, {originReturnTrans2}</Text>
                          :
                          null
                    }
                  </View>
                </View>
              </View>
              :
              null
            }
            <View style={styles.greyLine2} />

            <View style={styles.whiteContainer}>
              <View style={styles.passengerView}>
                <View style={styles.depturnView}>
                  <Text style={styles.depturnTxt}>{language.FLIGHT__PASSENGERS}</Text>
                </View>
                <View>
                  {map(passengers, (value, k) => {
                    const Name = result(value, 'Title', '') + ' ' + result(value, 'FirstName', '') + ' ' + result(value, 'LastName', '');
                    const Type = result(value, 'Type', '');
                    const TypeName = Type === '1' ? 'Adult' : Type === '2' ? 'Child' : Type === '3' ? 'Afilant' : 'Infant';
                    return (
                      <View key={k}  style={styles.mv5}>
                        <View style={styles.halfWidth}><Text style={styles.rowItemLeft}>{Name}</Text></View>
                        <View style={styles.halfWidth}><Text style={styles.rightItemHeader}>{TypeName}</Text></View>
                      </View>
                    );
                  }
                  )}
                </View>
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
              <SinarmasButton onPress={toDashboard} text={language.CGV__DONE} />
            </View>
          </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}


export default EmallTxStatus;
