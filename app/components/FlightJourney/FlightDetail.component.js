import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './FlightDetail.style';
import result from 'lodash/result';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getDayName, amountRegex, generateFlightImage} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import moment from 'moment';

class FlightDetail extends Component {
 
  render () {
   
    const {detail = [], codeOrigin, codeDestination, flightData,
      airportOrigin, airportDestination, cityOrigin, cityDestination, 
      category, flag, fullDepart, fullArrive} = this.props;
    const airlineName = result(flightData, 'AirlineName', '');
    const departDate = result(flightData, 'DepartDate', '');
    const departTime = result(flightData, 'DepartTime', '');
    const arrivalDate = result(flightData, 'ArriveDate', '');
    const arrivalTime = result(flightData, 'ArriveTime', '');
    const number = result(flightData, 'Number', '');
    const totalTransit = result(flightData, 'TotalTransit', 0);
    const day = getDayName(departDate);
    const connectedFlight = result(flightData, 'ConnectingFlights', []);
    const duration = result(flightData, 'durationDisplay', 0);
    const departDateFull = result(flightData, 'fullDepart', '');
    const departDateDisplay = moment(departDateFull).format('DD MMM YYYY');
    const connectedAirlineName = result(connectedFlight[0], 'AirlineName', '');
    

    let index = 0;
    let transitView = [];

    while (index < totalTransit) {
      index++;
      transitView.push(
        <View style={styles.mainTransit} key={index}>
          <View style={styles.wrapper}>
            <View style={styles.blockShort}/>
            <SimasIcon style={styles.radioStyle1} name={'bullet'} size={10}/>
            <View style={styles.blockLongTransit}/>
          </View>
          <View style={styles.transitContainer}>
            <View style={styles.transitTitle}>
              <View style={styles.rowContainer}>
                <View style={styles.image}>
                  <Image source={generateFlightImage(result(connectedFlight[index], 'AirlineName', ''))} style={styles.icon} />
                </View>
                <View style={styles.flight}>
                  <Text style={styles.bold}>{result(connectedFlight[index], 'AirlineName', '')}</Text>
                  <Text>{category}</Text>
                </View>
              </View>
              <View style={styles.number}>
                <Text style={styles.bold}>{result(connectedFlight[index], 'Number', '')}</Text>
              </View>
            </View>
            <View style={styles.transitDate}>
              <Text>{getDayName(result(connectedFlight[index], 'DepartDate', ''))}</Text>
              <Text>{',\t'}</Text>
              <Text>{moment(result(connectedFlight[index], 'DepartDate', '')).format('DD MMM YYYY')}</Text>
            </View>
            <View style={styles.transitCity}>
              <Text style={styles.timesText}>{result(connectedFlight[index], 'Origin', '')}</Text>
              <Text style={styles.timesText}>{result(connectedFlight[index], 'DepartTime', '')}</Text>
            </View>
            <View style={styles.transitDuration}/>
          </View>
            
        </View>
      );
    }

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraHeight={120}>
      
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.titleInformation}>
              <Text>{language.FLIGHT__DEPARTURE}</Text>
            </View>
            <View style={styles.dateContainer}>
              <View style={styles.date}>
                <Text style={styles.bold}>{day}</Text>
                <Text style={styles.bold}>{',\t'}</Text>
                <Text style={styles.bold}>{departDateDisplay}</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.bold}>{duration}</Text>
              </View>
            </View>
          </View>

          <View style={styles.upperContainer}>
            <View style={styles.upperWrapper}>
              <SimasIcon style={styles.radioStyle} name={'radio-selected'} size={10}/>
              <View style={styles.blockLong}/>
            </View>
            <View style={styles.topContainer}>
              <View style={styles.upperTitleContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.image}>
                    <Image source={airlineName ? generateFlightImage(airlineName) : generateFlightImage(connectedAirlineName)} style={styles.icon} />
                  </View>
                  <View style={styles.flight}>
                    <Text style={styles.bold}>{airlineName ? airlineName : connectedAirlineName}</Text>
                    <Text>{category}</Text>
                  </View>
                </View>
                <View style={styles.number}>
                  <Text style={styles.bold}>{totalTransit === 0 ? number : result(connectedFlight[0], 'Number', '')}</Text>
                </View>
              </View>

              <View style={styles.detailView}>
                <View style={styles.wrapper} />
                <View style={styles.detail}>
                  <Text style={styles.largeText}>{codeOrigin}</Text>
                  <Text style={styles.timesText}>{airportOrigin},</Text>
                  <Text style={styles.timesText}>{cityOrigin}</Text>
                  <Text style={styles.timesText}>{departTime}</Text>
                </View>
              </View>
            </View>
            
          </View>
        
          {
            flag === 'connecting' && totalTransit > 0 && connectedFlight.length >= 1  ?
              transitView
              : flag === 'direct' && totalTransit === 0 ? 
                <View/> 
                : <View/>
          }
          <View style={styles.contentContainer}>
            <View style={styles.detailView}>
              <View style={styles.bottomWrapper}>
                <View style={styles.blockShort}/>
                <SimasIcon style={styles.arrowDownStyle} name={'arrow'} size={10}/>
              </View>
              <View style={styles.bottomDetail}>
                <Text style={styles.timesText}>{fullDepart === fullArrive ? ' ' : getDayName(arrivalDate) + ' ' + moment(arrivalDate).format('DD MMM YYYY')}</Text>
                <Text style={styles.largeText}>{codeDestination}</Text>
                <Text style={styles.timesText}>{airportDestination},</Text>
                <Text style={styles.timesText}>{cityDestination}</Text>
                <Text style={styles.timesText}>{arrivalTime}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.footerContainer}>
            <View style={styles.rowFooter}>
              <Text style={styles.timesText}>{language.FLIGHT__PRICE_INFO} </Text>
              <Text style={styles.greenText}>{language.FLIGHT__TAX_INCLUDE} {'\n'}</Text>
            </View>
            {detail.map((data, i) => (
              <View key={i} style={styles.infoPrice}>
                <Text style={styles.timesText}>{data.Text}</Text>
                <Text style={styles.timesText}>Rp.{'\t'} {amountRegex(data.Amount)}</Text>
              </View>
            ))
            }
          </View>
        </View>
        
      </KeyboardAwareScrollView>
    );
  }

}

FlightDetail.propTypes = {
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
  category: PropTypes.string,
  flag: PropTypes.string,
  totalTransit: PropTypes.number,
  fullDepart: PropTypes.string,
  fullArrive: PropTypes.string
};

export default FlightDetail;
