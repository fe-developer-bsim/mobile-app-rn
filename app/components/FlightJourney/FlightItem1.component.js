import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './FlightItem.style';
import Touchable from '../Touchable.component';
import filter from 'lodash/filter';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import result from 'lodash/result';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import {amountRegex, generateFlightImage} from '../../utils/transformer.util';
import moment from 'moment';

class FlightItem1 extends React.Component {
 
  render () {
    const {AirlineName, DepartTime, ArriveTime, DepartDate, ArriveDate, Origin, Destination, ClassObjects = [], userCategory,
      IsConnecting, IsMultiClass, ConnectingFlights = [], TotalTransit, Fare, nextPage, durationDisplay, getDetailFlights} = this.props;
    const flights = ClassObjects;
    const filteredFlights = filter(flights, function (o) { 
      return o.Seat > 0 && o.Category === userCategory; 
    });
    
    // transit / connecting flights

    const connectedFlights = ConnectingFlights[0];
    const connectedAirlineName = result(connectedFlights, 'AirlineName', '');
    const connectedObject1 = result(connectedFlights, 'ClassObjects[0]', []);

    const filteredConnectedFlight = forEach(ConnectingFlights, function (outer) {
      const filteredObject = filter(result(outer, 'ClassObjects', []), function (o) {
        if (o.Seat > 0 && o.Category === userCategory) 
          return outer;
        else if (o.Seat > 0 && flights.Category === userCategory)
          return outer;
        else return [];
      });
      return isEmpty(filteredObject) ? [] : filteredObject;
    });
    
    return (
      <View style={[styles.container]} >
        <View style={styles.detailsContainer}>
          <View>
            {IsConnecting === false && IsMultiClass === false ?
              filteredFlights.map((object, i) => (
                <Touchable onPress={nextPage} key={i}>
                  <View style={styles.itemContainer}>
                    <View style={styles.upperContainer}>
                      <View style={styles.image}>
                        <Image source={generateFlightImage(AirlineName)} style={styles.icon} />
                      </View>
                      <View style={styles.headerFlight}>
                        <Text style={styles.transactionHeading}>{AirlineName} {'\t'}</Text>
                        <Text>{object.Category}</Text>
                      </View>
                      <View style={styles.totalTime}>
                        <Text>{durationDisplay}</Text>
                      </View>
                    </View>

                    <View style={styles.middleContainer}>
                      <View style={styles.departTime}>
                        <Text>{' '}</Text>
                        <Text style={styles.textFare}>{DepartTime}</Text>
                        <Text style={styles.transactionDate}>{Origin}</Text>
                      </View>
                      <View style={styles.arrow}> 
                        <SimasIcon name='proceed' size={10}/>
                      </View>
                      <View style={styles.arrriveTime}>
                        <Text>{DepartDate !== ArriveDate ? moment(ArriveDate).format('DD MMM YYYY') : ' '}</Text>
                        <Text style={styles.textFare}>{ArriveTime}</Text>
                        <Text style={styles.transactionDate}>{Destination}</Text>
                      </View>
                      <View style={styles.fare}>
                        <Text style={styles.textFareDisplay}>Rp. {amountRegex(Fare)}</Text>
                        <Text style={styles.transactionDate}>/{language.FLIGHT__PAX}</Text>
                      </View>
                    </View>

                    <View style={styles.belowContainer}>
                      <View style={styles.transit}>
                        <Text>{TotalTransit === 0 ?  'Direct Flight' 
                          : TotalTransit === 1 ? TotalTransit + ' Transit' 
                            : TotalTransit > 1 ? TotalTransit + 'Transits' : '' } </Text>
                      </View>
                      <Touchable onPress={getDetailFlights}>
                        <View style={styles.detail}>
                          <Text style={styles.textDetail}>{language.FLIGHT__DETAIL}</Text>
                        </View>
                      </Touchable>
                    </View> 
                    
                  </View>
                </Touchable> 
              )) : IsConnecting === true && IsMultiClass === false ?
                filteredFlights.map((object, i) => (
                  <Touchable onPress={nextPage} key={i}>
                    <View style={styles.itemContainer}>
                      <View style={styles.upperContainer}>
                        <View style={styles.image}>
                          <Image source={AirlineName ? generateFlightImage(AirlineName) : generateFlightImage(connectedAirlineName)} style={styles.icon} />
                        </View>
                        <View style={styles.headerFlight}>
                          <Text style={styles.transactionHeading}>{AirlineName} {'\t'}</Text>
                          <Text>{object.Category}</Text>
                        </View>
                        <View style={styles.totalTime}>
                          <Text>{durationDisplay}</Text>
                        </View>
                      </View>

                      <View style={styles.middleContainer}>
                        <View style={styles.departTime}>
                          <Text>{' '}</Text>
                          <Text style={styles.textFare}>{DepartTime}</Text>
                          <Text style={styles.transactionDate}>{Origin}</Text>
                        </View>
                        <View style={styles.arrow}> 
                          <SimasIcon name='proceed' size={10}/>
                        </View>
                        <View style={styles.arrriveTime}>
                          <Text>{DepartDate !== ArriveDate ? moment(ArriveDate).format('DD MMM YYYY') : ' '}</Text>
                          <Text style={styles.textFare}>{ArriveTime}</Text>
                          <Text style={styles.transactionDate}>{Destination}</Text>
                        </View>
                        <View style={styles.fare}>
                          <Text style={styles.textFareDisplay}>Rp. {amountRegex(Fare)}</Text>
                          <Text style={styles.transactionDate}>/{language.FLIGHT__PAX}</Text>
                        </View>
                      </View>

                      <View style={styles.belowContainer}>
                        <View style={styles.transit}>
                          <Text>{TotalTransit === 0 ?  'Direct Flight' 
                            : TotalTransit === 1 ? TotalTransit + ' Transit' 
                              : TotalTransit > 1 ? TotalTransit + 'Transits' : '' } </Text>
                        </View>
                        <Touchable onPress={getDetailFlights}>
                          <View style={styles.detail}>
                            <Text style={styles.textDetail}>{language.FLIGHT__DETAIL}</Text>
                          </View>
                        </Touchable>
                      </View> 
                      
                    </View>
                  </Touchable>
                )) : IsConnecting === true && IsMultiClass === true ?
                  filteredConnectedFlight ? 
                    <Touchable onPress={nextPage}>
                      <View style={styles.itemContainer}>
                        <View style={styles.upperContainer}>
                          <View style={styles.image}>
                            <Image source={generateFlightImage(connectedAirlineName)} style={styles.icon} />
                          </View>
                          <View style={styles.headerFlight}>
                            <Text style={styles.transactionHeading}>{connectedAirlineName}</Text>
                            <Text>{connectedObject1.Category ? connectedObject1.Category : result(filteredFlights, 'ClassObjects[0].Category', '')}</Text>
                          </View>
                          <View style={styles.totalTime}>
                            <Text>{durationDisplay}</Text>
                          </View>
                        </View>

                        <View style={styles.middleContainer}>
                          <View style={styles.departTime}>
                            <Text>{' '}</Text>
                            <Text style={styles.textFare}>{DepartTime}</Text>
                            <Text style={styles.transactionDate}>{Origin}</Text>
                          </View>
                          <View style={styles.arrow}> 
                            <SimasIcon name='proceed' size={10}/>
                          </View>
                          <View style={styles.arrriveTime}>
                            <Text>{DepartDate !== ArriveDate ? moment(ArriveDate).format('DD MMM YYYY') : ' '}</Text>
                            <Text style={styles.textFare}>{ArriveTime} {'\t'}</Text>
                            <Text style={styles.transactionDate}>{Destination}</Text>
                          </View>
                          <View style={styles.fare}>
                            <Text style={styles.textFareDisplay}>Rp. {amountRegex(Fare)}</Text>
                            <Text style={styles.transactionDate}>/{language.FLIGHT__PAX}</Text>
                          </View>
                        </View>

                        <View style={styles.belowContainer}>
                          <View style={styles.transit}>
                            <Text>{TotalTransit === 0 ?  'Direct Flight' 
                              : TotalTransit === 1 ? TotalTransit + ' Transit' 
                                : TotalTransit > 1 ? TotalTransit + 'Transits' : '' }</Text>
                          </View>
                        
                          <Touchable onPress={getDetailFlights}>
                            <View style={styles.detail}>
                              <Text style={styles.textDetail}>{language.FLIGHT__DETAIL}</Text>
                            </View>
                          </Touchable>
                        </View> 
                        
                      </View>
                    </Touchable>
                    : <View/> 
                  : <View/>
            }
          </View>
        </View>
      </View>
    );
  } 
}

FlightItem1.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  credit: PropTypes.bool,
  AirlineName: PropTypes.string,
  DepartDate: PropTypes.string,
  AirlineImageUrl: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.bool,
  ClassObjects: PropTypes.array,
  Destination: PropTypes.string,
  Origin: PropTypes.string,
  DepartTime: PropTypes.string,
  ArriveTime: PropTypes.string,
  getDetailFlightsState: PropTypes.func,
  getDetailFlights: PropTypes.func,
  userCategory: PropTypes.string,
  Id: PropTypes.string,
  Fare: PropTypes.number,
  Tax: PropTypes.number,
  FlightId: PropTypes.string,
  filteredFlights: PropTypes.string,
  Airline: PropTypes.number,
  Number: PropTypes.string,
  ArriveDate: PropTypes.string,
  IsConnecting: PropTypes.bool,
  connectedFlights: PropTypes.array,
  ConnectingFlights: PropTypes.array,
  TotalTransit: PropTypes.number,
  IsMultiClass: PropTypes.bool,
  getInternational: PropTypes.bool,
  nextPage: PropTypes.func,
  flag: PropTypes.string,
  gotoSummary: PropTypes.func,
  onNextPage: PropTypes.func,
  durationDisplay: PropTypes.string,
};
export default FlightItem1;
