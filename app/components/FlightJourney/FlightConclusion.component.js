import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './FlightConclusion.style';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import {amountRegex, generateFlightImage} from '../../utils/transformer.util';
import moment from 'moment';

class FlightSummaryComponnent extends Component {

  render () {

    const {codeOrigin, codeDestination, airportOrigin, airportDestination,
      cityOrigin, cityDestination, dayDepartdate, flightDataDetail1,
      passenger, txTravelContactDetailForm, flag, flightDataDetail2, dayArrivaldate} = this.props;

    const airlineName1 = result(flightDataDetail1, 'AirlineName', '');
    const departDate1 = result(flightDataDetail1, 'DepartDate', '');
    const departTime1 = result(flightDataDetail1, 'DepartTime', '');

    const arriveTime1 = result(flightDataDetail1, 'ArriveTime', '');
    const number1 = result(flightDataDetail1, 'Number', '');
    const classObject1 = result(flightDataDetail1, 'ClassObjects[0]', {});
    const category1 = result(classObject1, 'Category', '');
    const fare1 = result(flightDataDetail1, 'Fare', 0);
    const totalTransit1 = result(flightDataDetail1, 'TotalTransit', 0);
    const connectedObject1 = result(flightDataDetail1, 'ConnectingFlights', []);
    const categoryConnected1 = result(connectedObject1, 'ClassObjects[0].Category', '');
    const duration1 = result(flightDataDetail1, 'durationDisplay', '');
    const isConnecting1 = result(flightDataDetail1, 'IsConnecting', false);
  
    let transitFlights1 = [];
    if (connectedObject1 !== []) {
      forEach(connectedObject1, function (object) {
        transitFlights1.push(object);
      });
    }
    let transitDestination1 = [];
    filter(connectedObject1, function (value) {
      transitDestination1.push(result(value, 'Destination', ''));
    });
    
    const airlineName2 = result(flightDataDetail2, 'AirlineName', '');
    const departTime2 = result(flightDataDetail2, 'DepartTime', '');

    const arriveDate2 = result(flightDataDetail2, 'ArriveDate', '');
    const arriveTime2 = result(flightDataDetail2, 'ArriveTime', '');
    const number2 = result(flightDataDetail2, 'Number', '');
    const classObject2 = result(flightDataDetail2, 'ClassObjects[0]', {});
    const category2 = result(classObject2, 'Category', '');
    const fare2 = result(flightDataDetail2, 'Fare', 0);
    const totalTransit2 = result(flightDataDetail2, 'TotalTransit', 0);
    const connectedObject2 = result(flightDataDetail2, 'ConnectingFlights[0]', []);
    const categoryConnected2 = result(connectedObject2, 'ClassObjects[0].Category', '');
    const duration2 = result(flightDataDetail2, 'durationDisplay', '');
    const isConnecting2 = result(flightDataDetail2, 'IsConnecting', false);
    let transitFlights2 = [];

    if (connectedObject2 !== []) {
      forEach(connectedObject2, function (object) {
        transitFlights2.push(object);
      });
    }
    const totalPassenger = result(passenger, 'total');
    /* <View>
      {isConnecting1 === false ? (<Text> {airlineName1} </Text>)
        : result(connectedObject1[0], 'AirlineName', '') === result(connectedObject1[1], 'AirlineName', '') ? 
          <Text> {result(connectedObject1[0], 'AirlineName', '')}</Text> :
            <Text>{result(connectedObject1[0], 'AirlineName', '')}</Text> 
              + ' ' +
            <SimasIcon name='proceed' size={10}/>
              + ' ' +
        <Text>{result(connectedObject1[1], 'AirlineName', '')}</Text>}
    </View> */
    return (

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerContent} >
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.largeText}>{language.FLIGHT__SUMMARY}</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text>{language.FLIGHT__DEPARTURE}</Text>
              <View style={styles.containerDepart}>
                <View style={styles.upperTitleContainer}>
                  <View style={styles.flightIcon}>
                    <View style={styles.image}>
                      <Image source={airlineName1 ?  generateFlightImage(airlineName1) :
                        result(connectedObject1[0], 'AirlineName', '') === result(connectedObject1[1], 'AirlineName', '') ?
                          generateFlightImage(result(connectedObject1[0], 'AirlineName', '')) : generateFlightImage('Multi')} style={styles.icon} />
                    </View>
                    <View style={styles.flight}>
                     
                      <Text style={styles.bold}>{isConnecting1 === false ? airlineName1 : 
                        result(connectedObject1[0], 'AirlineName', '') === result(connectedObject1[1], 'AirlineName', '') ? 
                          result(connectedObject1[0], 'AirlineName', '') : 
                          result(connectedObject1[0], 'AirlineName', '') + ' -> ' + 
                        result(connectedObject1[1], 'AirlineName', '')}</Text>
                      <Text>{category1 ? category1 : categoryConnected1}</Text>
                    </View>
                  </View>
                  <View style={styles.number}>
                    <Text style={styles.bold}>{number1}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.date}>
                    <Text style={styles.bold}>{dayDepartdate}</Text>
                    <Text style={styles.bold}>{',\t'}</Text>
                    <Text style={styles.bold}>{moment(departDate1).format('DD MMM YYYY')}</Text>
                  </View>
                  <View style={styles.duration}>
                    <Text>{duration1}</Text>
                  </View>
                </View>
                <View style={styles.detailView}>
                  <View style={styles.detail}>
                    <Text style={styles.largeText}>{codeOrigin}</Text>
                    <Text style={styles.timesText}>{airportOrigin},</Text>
                    <Text style={styles.timesText}>{cityOrigin}</Text>
                    <Text style={styles.timesText}>{departTime1}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <SimasIcon name='proceed' size={10}/>
                  </View>
                  <View style={styles.detail}>
                    <Text style={styles.largeText}>{codeDestination}</Text>
                    <Text style={styles.timesText}>{airportDestination},</Text>
                    <Text style={styles.timesText}>{cityDestination}</Text>
                    <Text style={styles.timesText}>{arriveTime1}</Text>
                  </View>
                </View>
                <View style={styles.column}>
                  <View>
                    <Text>
                      <Text>{totalTransit1 === 0 ? 'Direct Flight' :
                        totalTransit1 + 'Transits '}
                      </Text>
                      <Text>{totalTransit1 === 1 ?
                        result(transitFlights1[0], 'Destination', '') : totalTransit1 === 2 ?
                          result(transitFlights1[0], 'Destination', '') + ', ' +
                        result(transitFlights1[1], 'Destination', '') : ''}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.contentPassenger}>
                    <Text>{totalPassenger} {language.FLIGHT__PAX}</Text>
                    <View style={styles.infoPrice}>
                      <Text style={styles.largeText}>Rp. {amountRegex(fare1)}</Text>
                      <Text>/ {language.FLIGHT__PAX}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {
              flag === 'twoWay' ?
                <View style={styles.contentContainer}>
                  <Text>{language.FLIGHT__ARRIVAL}</Text>
                  <View style={styles.containerDepart}>
                    <View style={styles.upperTitleContainer}>
                      <View style={styles.flightIcon}>
                        <View style={styles.image}>
                          <Image source={
                            airlineName2 ? generateFlightImage(airlineName2) : 
                              result(connectedObject2[0], 'AirlineName', '') === result(connectedObject2[1], 'AirlineName', '') ?
                                generateFlightImage(result(connectedObject2[0], 'AirlineName', '')) : generateFlightImage('Multi')} style={styles.icon} />
                        </View>
                        <View style={styles.flight}>
                          <Text style={styles.bold}>{isConnecting2 === false ? airlineName2 : 
                            result(connectedObject2[0], 'AirlineName', '') === result(connectedObject2[1], 'AirlineName', '') ? 
                              result(connectedObject2[0], 'AirlineName', '') : 
                              result(connectedObject2[0], 'AirlineName', '') + ' -> ' + result(connectedObject2[1], 'AirlineName', '')}</Text>
                          <Text>{category2 ? category2 : categoryConnected2}</Text>
                        </View>
                      </View>
                      <View style={styles.number}>
                        <Text style={styles.bold}>{number2}</Text>
                      </View>
                    </View>
                    <View style={styles.rowContainer}>
                      <View style={styles.date}>
                        <Text style={styles.bold}>{dayArrivaldate}</Text>
                        <Text style={styles.bold}>{',\t'}</Text>
                        <Text style={styles.bold}>{moment(arriveDate2).format('DD MMM YYYY')}</Text>
                      </View>
                      <View style={styles.duration}>
                        <Text>{duration2}</Text>
                      </View>
                    </View>
                    <View style={styles.detailView}>
                      <View style={styles.detail}>
                        <Text style={styles.largeText}>{codeDestination}</Text>
                        <Text style={styles.timesText}>{airportDestination},</Text>
                        <Text style={styles.timesText}>{cityDestination}</Text>
                        <Text style={styles.timesText}>{departTime2}</Text>
                      </View>
                      <View style={styles.iconContainer}>
                        <SimasIcon name='proceed' size={10}/>
                      </View>
                      <View style={styles.detail}>
                        <Text style={styles.largeText}>{codeOrigin}</Text>
                        <Text style={styles.timesText}>{airportOrigin},</Text>
                        <Text style={styles.timesText}>{cityOrigin}</Text>
                        <Text style={styles.timesText}>{arriveTime2}</Text>
                      </View>
                    </View>
                    <View style={styles.column}>
                      <View>
                        <Text>
                          <Text>{totalTransit2 === 0 ? 'Direct Flight' :
                            totalTransit2 + 'Transits '}
                          </Text>
                          <Text>{totalTransit2 === 1 ?
                            result(transitFlights2[0], 'Destination', '') : totalTransit2 === 2 ? 
                              result(transitFlights2[0], 'Destination', '') + ', ' + result(transitFlights2[1], 'Destination', '') : ''
                          }
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.contentPassenger}>
                        <Text>{totalPassenger} {language.FLIGHT__PAX}</Text>
                        <View style={styles.infoPrice}>
                          <Text style={styles.largeText}>{fare2}</Text>
                          <Text>/ {language.FLIGHT__PAX}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                : <View/>
            }
          </View>
        </ScrollView>
        <View style={styles.bottomWrapper}>
          <View style={styles.buttonNext}>
            <SinarmasButton onPress={txTravelContactDetailForm}>
              <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }

}

FlightSummaryComponnent.propTypes = {
  handleSubmit: PropTypes.func,
  validateBeforeSubmit: PropTypes.func,
  navParams: PropTypes.array,
  onItemPress: PropTypes.func,
  codeOrigin: PropTypes.string,
  codeDestination: PropTypes.string,
  adult: PropTypes.string,
  child: PropTypes.string,
  infant: PropTypes.string,
  detail: PropTypes.array,
  flightData: PropTypes.object,
  airportOrigin: PropTypes.string,
  airportDestination: PropTypes.string,
  cityOrigin: PropTypes.string,
  cityDestination: PropTypes.string,
  category1: PropTypes.string,
  category2: PropTypes.string,
  departDate: PropTypes.string,
  dayDepartdate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  flightDataDetail1: PropTypes.object,
  passenger: PropTypes.object,
  txTravelContactDetailForm: PropTypes.func,
  departDateDisplay: PropTypes.string,
  flag: PropTypes.string,
  flightDataDetail2: PropTypes.object,
  dayArrivaldate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  arrivalDateDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

};

export default FlightSummaryComponnent;
