import {View, Text, ScrollView, Image, FlatList} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallTx.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter, diffTime, dateFormatter, listViewComparator} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import filter from 'lodash/filter';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import FlightList from './EmallTxDepart.component';
import FlightReturnList from './EmallTxReturn.component';
import map from 'lodash/map';
import sriwijaya from '../../assets/images/sriwijaya-air.png';
import lion from '../../assets/images/lion-air.png';
import kalstar from '../../assets/images/kalstar-aviation.png';
import jetstar from '../../assets/images/jetstar.png';
import garuda from '../../assets/images/garuda-indonesia.png';
import citilink from '../../assets/images/citilink.png';
import airasia from '../../assets/images/air-asia.png';
import wings from '../../assets/images/wings-air.png';
import nam from '../../assets/images/jnam.png';

class EmallTx extends React.Component {
  static propTypes = {
    simasPoin: PropTypes.object,
    getResult: PropTypes.func,
    navigation: PropTypes.object,
    getConfirmInfo: PropTypes.func,
    goLanding: PropTypes.func,
    goToRefundInfo: PropTypes.func,
    departureData: PropTypes.object,
    returnData: PropTypes.object,
    airportOrigin: PropTypes.string,
    airportDestination: PropTypes.string,
    cityOrigin: PropTypes.string,
    cityDestination: PropTypes.string,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
    profile: PropTypes.object,
  }
  comparator = listViewComparator

  renderListItem = ({item}) => (<FlightList {...item} />);
  renderListItem2 = ({item}) => (<FlightReturnList {...item} />);

  sendNavInfo = () => {
    const {navigation, getConfirmInfo, returnData} = this.props;
    const accData = result(navigation, 'state.params.accData', {});
    const emallData = result(navigation, 'state.params.emallData', {});
    const flightData = result(emallData, 'flightData', {});
    const reservData = result(emallData, 'reservData', {});
    let segments = result(flightData, 'Segments', []);
    const flightReturn = find(segments, {Num: '1', Seq: '0'});
    let segmentsReturn = filter(segments, {'Num': '1'});
    const connectingFlights2 = result(returnData, 'ConnectingFlights', {});
    const flightTransit2 = result(returnData, 'TotalTransit', 0);
    if (flightTransit2 === 0) {
      segmentsReturn[0] = {...flightReturn, 'AirlineName': result(returnData, 'AirlineName', ''), 'Category': result(returnData, 'ClassObjects.0.Category', '')};
    } else {
      forEach(connectingFlights2, (value, key) => {
        const segmentKey = result(segmentsReturn, `${key}`, {});
        segmentsReturn[key] = {...segmentKey, 'AirlineName': result(value, 'AirlineName', ''), 'Category': result(value, 'ClassObjects.0.Category', '')};
      });
    }
    getConfirmInfo(flightData, accData, reservData, segmentsReturn);
  }

  sendSeatData = () => {
    const {navigation, getResult, returnData} = this.props;
    const accData = result(navigation, 'state.params.accData', {});
    const emallData = result(navigation, 'state.params.emallData', {});
    const flightData = result(emallData, 'flightData', {});
    const reservData = result(navigation, 'state.params.reservData', {});
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    let segments = result(flightData, 'Segments', []);
    const flightReturn = find(segments, {Num: '1', Seq: '0'});
    let segmentsReturn = filter(segments, {'Num': '1'});
    const connectingFlights2 = result(returnData, 'ConnectingFlights', {});
    const flightTransit2 = result(returnData, 'TotalTransit', 0);
    if (flightTransit2 === 0) {
      segmentsReturn[0] = {...flightReturn, 'AirlineName': result(returnData, 'AirlineName', ''), 'Category': result(returnData, 'ClassObjects.0.Category', '')};
    } else {
      forEach(connectingFlights2, (value, key) => {
        const segmentKey = result(segmentsReturn, `${key}`, {});
        segmentsReturn[key] = {...segmentKey, 'AirlineName': result(value, 'AirlineName', ''), 'Category': result(value, 'ClassObjects.0.Category', '')};
      });
    }
    getResult(flightData, accData, reservData, isUseSimas, segmentsReturn);
  }

  render () {
    
    const {navigation, goLanding, departureData, returnData, airportOrigin, airportDestination, cityOrigin, cityDestination, fareDepart, fareReturn, profile, simasPoin} = this.props;
    const isUseSimas = result(navigation, 'state.params.isUseSimas', '');
    const accData = result(navigation, 'state.params.accData', {});
    const emallData = result(navigation, 'state.params.emallData', {});
    const flightData = result(emallData, 'flightData', {});
    const name = result(profile, 'name', '');
    const totalPoin = result(simasPoin, 'simasPoin.data.total_point', '');
    const totalDepart = result(fareDepart, 'Total', '');
    const totalReturn = result(fareReturn, 'Total', '');
    let segments = result(flightData, 'Segments', []);

    // FLIGHT DEPARTURE
    const flightDeparture = find(segments, {Num: '0', Seq: '0'});
    const arriveTime = result(flightDeparture, 'ArriveTime', '');
    const departTime = result(flightDeparture, 'DepartTime', '');
    const departDate = result(flightDeparture, 'DepartDate', '');
    const departDateFormatted = dateFormatter(departDate, 'dddd, D MMMM YYYY');
    const Num = result(flightDeparture, 'Num', '');
    const Seq = result(flightDeparture, 'Seq', '');
    const FlightNumber = result(flightDeparture, 'FlightNumber', '');
    const Origin = result(flightDeparture, 'Origin', '');
    const flightDuration = diffTime(departTime, arriveTime);

    // JOIN AIRLINE NAME AND CATEGORY DEPART
    const connectingFlights = result(departureData, 'ConnectingFlights', {});
    const flightTransit = result(departureData, 'TotalTransit', 0);
    if (flightTransit === 0) {
      const segmentKey = result(segments, '0', {});
      segments[0] = {...segmentKey, 'AirlineName': result(departureData, 'AirlineName', ''), 'Category': result(departureData, 'ClassObjects.0.Category', '')};
    } else {
      forEach(connectingFlights, (value, key) => {
        const segmentKey = result(segments, `${key}`, {});
        segments[key] = {...segmentKey, 'AirlineName': result(value, 'AirlineName', ''), 'Category': result(value, 'ClassObjects.0.Category', '')};
      });
    }
    const AirlineName = result(segments, '0.AirlineName', '');
    const Category = result(segments, '0.Category', '');

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
    const lastArriveDate = result(lastDepartFlight, '0.ArriveDate', '');
    const lastArriveDateFormatted = dateFormatter(lastArriveDate, 'dddd, D MMMM YYYY');
    const lastDestination = result(lastDepartFlight, '0.Destination', '');
    const lastArriveTime = result(lastDepartFlight, '0.ArriveTime', '');
    const flightTotalDuration = diffTime(departTime, lastArriveTime);
    

    // FLIGHT RETURN
    const flightReturn = find(segments, {Num: '1', Seq: '0'});
    const returnDepartTime = result(flightReturn, 'DepartTime', '');
    const returnDepartDate = result(flightReturn, 'DepartDate', '');
    const returnDepartDateFormatted = dateFormatter(returnDepartDate, 'dddd, D MMMM YYYY');
    
    // JOIN AIRLINE NAME AND CATEGORY RETURN
    let segmentsReturn = filter(segments, {'Num': '1'});
    const connectingFlights2 = result(returnData, 'ConnectingFlights', {});
    const flightTransit2 = result(returnData, 'TotalTransit', 0);
    if (flightTransit2 === 0) {
      segmentsReturn[0] = {...flightReturn, 'AirlineName': result(returnData, 'AirlineName', ''), 'Category': result(returnData, 'ClassObjects.0.Category', '')};
    } else {
      forEach(connectingFlights2, (value, key) => {
        const segmentKey = result(segmentsReturn, `${key}`, {});
        segmentsReturn[key] = {...segmentKey, 'AirlineName': result(value, 'AirlineName', ''), 'Category': result(value, 'ClassObjects.0.Category', '')};
      });
    }
    const flightReturned = find(segmentsReturn, {Num: '1', Seq: '0'});
    const NumReturn = result(flightReturned, 'Num', '');
    const SeqReturn = result(flightReturned, 'Seq', '');
    const AirlineNameReturn = result(flightReturned, 'AirlineName', '');
    const CategoryReturn = result(flightReturned, 'Category', '');
    const FlightNumberReturn = result(flightReturned, 'FlightNumber', '');
    const OriginReturn = result(flightReturned, 'Origin', '');
    const flightDurationReturn = result(flightReturned, 'flightDuration', '');

    // SET THE LAST RETURN IF THERE IS A TRANSIT TRIP
    let returnFlight = [];
    forEach(filter(segments, {'Num': '1'}), (value) => {
      returnFlight = [...returnFlight, value];
    });
    const infoReturnFlight = returnFlight.length;
    let lastReturnFlight = [];
    let j = 0;
    forEach(returnFlight, (value) => {
      j++;
      if (j === infoReturnFlight) {
        lastReturnFlight = [...lastReturnFlight, value];
      }
    });
    const lastReturnArriveDate = result(lastReturnFlight, '0.ArriveDate', '');
    const lastReturnArriveDateFormatted = dateFormatter(lastReturnArriveDate, 'dddd, D MMMM YYYY');
    const lastReturnDestination = result(lastReturnFlight, '0.Destination', '');
    const lastReturnArriveTime = result(lastReturnFlight, '0.ArriveTime', '');
    const returnFlightTotalDuration = diffTime(returnDepartTime, lastReturnArriveTime);
    
    // CONTACT
    const contact = result(flightData, 'Contact', {});
    const contactEmail = result(contact, 'Email', '');
    const contactFirstName = result(contact, 'FirstName', '');
    const contactHomePhone = result(contact, 'HomePhone', '');
    const contactLastName = result(contact, 'LastName', '');
    const contactMobilePhone = result(contact, 'MobilePhone', '');
    const contactTitle = result(contact, 'Title', '');

    // PASSENGER
    const passengers = result(flightData, 'Passengers', []);
    const productType = result(accData, 'productType', '');
    const nameAccount = result(accData, 'name', '');
    const accountNumber = result(accData, 'accountNumber', '');
    const availableBalance = result(accData, 'balances.availableBalance', '');
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
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
          <View style={styles.bgWhite}>
            <View style={[styles.mh20]}>
              <View style={styles.row}>
                <Text style={styles.titleTxt}>{language.FLIGHT__YOUR_FLIGHT}</Text>
                <Touchable onPress={goLanding}>
                  <View style={styles.buttonTxt}>
                    <Text>{language.FLIGHT__CANCELLATION}</Text>
                  </View>
                </Touchable>
              </View>
            </View>

            <View style={[styles.mh20, styles.mb20]}>
              <View style={styles.depturnView}>
                <Text style={styles.depturnTxt}>{language.FLIGHT__DEPART}</Text>
              </View>
              <View style={styles.row}>
                <View><Text style={styles.departTxt}>{departDateFormatted}</Text></View>
                <View><Text style={styles.arriveTime}>{flightTotalDuration}</Text></View>
              </View>
            </View>

            { Num === '0' && Seq === '0' ?
              <View style={styles.flightView}>
                <View style={styles.row}>
                  <View>
                    <View style={styles.bottomleftWrapper}>
                      <View style={styles.circle}/>
                      <View style={styles.block}/>
                    </View>
                  </View>
                  <View style={styles.wd80}>
                    <View style={styles.row}>
                      <View style={styles.row}>
                        <View style={styles.iconView}>
                          <Image source={airlineNameDepart} style={styles.imageFlight} />
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
                    <View>
                      <View style={[styles.wd80, styles.mv10]}>
                        <View style={styles.row2}>
                          <View style={styles.originView}>
                            <Text style={styles.originTxt}>{Origin}</Text>
                            <Text style={styles.smallTxt}>{airportOrigin}</Text>
                            <Text style={styles.smallTxt}>{cityOrigin}</Text>
                          </View>
                          <View>
                            <Text style={styles.arriveTime}>{flightDuration}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.DepartTime}>
                      <Text style={styles.departTimeTxt}>{departTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
              :
              null  
            }

            <View>
              <FlatList enableEmptySections data={segments} renderItem={this.renderListItem}/>
            </View>
          
            <View style={styles.arrivedView}>
              <View style={styles.row2}>
                <View>
                  <View style={styles.bottomleftWrapper}>
                    <View style={styles.arrivedCircle}/>
                    <View style={styles.arrivedBlock}/>
                    <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                  </View>
                </View>
                <View style={[styles.wd80, styles.pv15, styles.mb10]}>
                  <View style={styles.originView}>
                    <Text style={styles.smallTxt}>{lastArriveDateFormatted}</Text>
                    <View style={styles.mv5}>
                      <Text style={styles.originTxt}>{lastDestination}</Text>
                      <Text style={styles.smallTxt}>{airportDestination}</Text>
                      <Text style={styles.smallTxt}>{cityDestination}</Text>
                    </View>
                  </View>
                  <View style={styles.DepartTime}>
                    <Text style={styles.departTimeTxt}>{lastArriveTime}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          { flightReturn !== undefined ?
            <View>
              <View style={styles.greyLine2} />
              <View style={styles.bgWhite}>
                <View style={[styles.mh20, styles.mv20]}>
                  <View style={styles.depturnView}>
                    <Text style={styles.depturnTxt}>{language.FLIGHT__ARRIVAL}</Text>
                  </View>
                  <View style={styles.row}>
                    <View><Text style={styles.departTxt}>{returnDepartDateFormatted}</Text></View>
                    <View><Text style={styles.arriveTime}>{returnFlightTotalDuration}</Text></View>
                  </View>
                </View>
                
                { NumReturn === '1' && SeqReturn === '0' ?
                  <View style={styles.flightView}>
                    <View style={styles.row}>
                      <View>
                        <View style={styles.bottomleftWrapper}>
                          <View style={styles.circle}/>
                          <View style={styles.block}/>
                        </View>
                      </View>
                      <View style={styles.wd80}>
                        <View style={styles.row}>
                          <View style={styles.row}>
                            <View style={styles.iconView}>
                              <Image source={airlineNameReturn} style={styles.imageFlight} />
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
                        <View>
                          <View style={[styles.wd80, styles.mv10]}>
                            <View style={styles.row2}>
                              <View style={styles.originView}>
                                <Text style={styles.originTxt}>{OriginReturn}</Text>
                                <Text style={styles.smallTxt}>{airportDestination}</Text>
                                <Text style={styles.smallTxt}>{cityDestination}</Text>
                              </View>
                              <View>
                                <Text style={styles.arriveTime}>{flightDurationReturn}</Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.DepartTime}>
                          <Text style={styles.departTimeTxt}>{returnDepartTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  :
                  null
                }

                <View>
                  <FlatList enableEmptySections data={segmentsReturn} renderItem={this.renderListItem2}/>
                </View>

                <View style={styles.transitView}>
                  <View style={styles.row2}>
                    <View>
                      <View style={styles.bottomleftWrapper}>
                        <View style={styles.arrivedCircle}/>
                        <View style={styles.arrivedBlock}/>
                        <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                      </View>
                    </View>
                    <View style={[styles.wd80, styles.pv15, styles.mb10]}>
                      <View style={styles.originView}>
                        <Text style={styles.smallTxt}>{lastReturnArriveDateFormatted}</Text>
                        <Text style={styles.originTxt}>{lastReturnDestination}</Text>
                        <Text style={styles.smallTxt}>{airportOrigin}</Text>
                        <Text style={styles.smallTxt}>{cityOrigin}</Text>
                      </View>
                      <View style={styles.DepartTime}>
                        <Text style={styles.departTimeTxt}>{lastReturnArriveTime}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            :
            null
          }

          <View style={styles.greyLine2} />

          <View style={styles.bgWhite}>
            <View style={styles.contactView}>
              <View>
                <Text style={styles.depturnTxt}>{language.FLIGHT__CONTACT}</Text>
              </View>
              <View style={styles.mv5}>
                <Text>{contactTitle} {contactFirstName} {contactLastName}</Text>
                <Text>{contactMobilePhone}</Text>
                <Text>{contactHomePhone}</Text>
                <Text>{contactEmail}</Text>
              </View>
              <View>
                <Text style={[styles.smallTxt, styles.greyTxt]}>{language.FLIGHT__CONTACT_DETAILS}</Text>
              </View>
            </View>
          </View>

          <View style={styles.greyLine2} />

          <View style={styles.bgWhite}>
            <View style={styles.passengerView}>
              <View>
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

          <View style={styles.greyLine} />

          <View style={[styles.bgWhite, styles.passengerView]}>
            { isUseSimas === 'yes' ?
              <View>
                <Text style={styles.amountHead1}>{language.FLIGHT__SIMAS_POIN} - {name}</Text>
                <Text style={styles.amountHead2}>{language.FLIGHT__AVAIL_BALANCE2} - {currencyFormatter(totalPoin)} {language.FLIGHT__POIN}</Text>
              </View>
              :
              <View>
                <Text style={styles.amountHead1}>{productType} - {nameAccount} - {accountNumber}</Text>
                <Text style={styles.amountHead2}>{language.FLIGHT__AVAIL_BALANCE} {currencyFormatter(availableBalance)}</Text>
              </View>
            }
            <View style={styles.greyLine2} />
            <Touchable onPress={this.sendNavInfo}>
              <View style={styles.row}>
                <Text style={styles.amountTxt2}>{language.FLIGHT__PRICE}</Text>
                <View style={styles.amountTxt4View}>
                  <Text style={styles.amountTxt3}>{language.FLIGHT__RP} {currencyFormatter(totalDepart + totalReturn)}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <SimasIcon name={'more-menu'} size={15} style={styles.cardIcon}/>
                </View>
              </View>
            </Touchable>
          </View>

        </ScrollView>
        <View style={styles.greyLine2} />
        <View style={styles.buttonContainer}>
          <View>
            <Text>{language.FLIGHT__TOTAL}</Text>
            <Text>{language.FLIGHT__RP} {currencyFormatter(totalDepart + totalReturn)}</Text>
          </View>
          <SinarmasButton style={styles.button2} onPress={this.sendSeatData} text={language.FLIGHT__PAY} />
        </View>
      </View>
    );
  }
}

export default EmallTx;

