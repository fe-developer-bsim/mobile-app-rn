import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallTxInfo.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import result from 'lodash/result';
import {currencyFormatter} from '../../utils/transformer.util';
import map from 'lodash/map';
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
import SimasIcon from '../../assets/fonts/SimasIcon';

class EmallTxInfo extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
  }

  render () {
    const {navigation, fareDepart, fareReturn} = this.props;
    const flightData = result(navigation, 'state.params.flightData', {});
    const segmentsReturn = result(navigation, 'state.params.segmentsReturn', {});
    const segments = result(flightData, 'Segments', []);

    const segmentsDeparture = filter(segments, {'Num': '0'});
    const flightDeparture = find(segments, {Num: '0', Seq: '0'});
    const FlightNumber = result(flightDeparture, 'FlightNumber', '');
    const AirlineName = result(flightDeparture, 'AirlineName', '');
    const Category = result(flightDeparture, 'Category', '');
    const lengthDeparture = segmentsDeparture.length;

    const flightReturned = find(segmentsReturn, {Num: '1', Seq: '0'});
    const AirlineNameReturn = result(flightReturned, 'AirlineName', '');
    const CategoryReturn = result(flightReturned, 'Category', '');
    const FlightNumberReturn = result(flightReturned, 'FlightNumber', '');
    const lengthReturn = segmentsReturn.length;

    const priceInfo1 = result(fareDepart, 'Details', []);
    const totalPrice1 = result(fareDepart, 'Total', '');

    const priceInfo2 = result(fareReturn, 'Details', []);
    const totalPrice2 = result(fareReturn, 'Total', '');

    // SET TRANSIT NAME
    const flightTransit = result(segments, 'TotalTransit', 0);
    const departTrans1 = find(segments, {Num: '0', Seq: '1'});
    const airlineNameTrans1 = result(departTrans1, 'AirlineName', '');
    const departTrans2 = find(segments, {Num: '0', Seq: '2'});
    const airlineNameTrans2 = result(departTrans2, 'AirlineName', '');
    const returnTrans1 = find(segments, {Num: '1', Seq: '1'});
    const airlineNameReturnTrans1 = result(returnTrans1, 'AirlineName', '');
    const returnTrans2 = find(segments, {Num: '1', Seq: '2'});
    const airlineNameReturnTrans2 = result(returnTrans2, 'AirlineName', '');

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
        <View>
          <View style={styles.titleBuy}>
            <Text style={styles.textBuy}>Price detail</Text>
          </View>
          <View>
            <View>
              <Text style={styles.depreturn}>Departure</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.row, styles.mv5]}>
                <View style={styles.iconView}>
                  <Image source={lengthDeparture > 1 ? airlineTransit : airlineNameDepart} style={styles.imageFlight} />
                </View>
                <View>
                  { flightTransit === 0 ?
                    <View><Text style={styles.airlineTxt}>{AirlineName}</Text></View>
                    : flightData === 1 ?
                      <View style={styles.row2}>
                        <Text style={styles.airlineTxt}>{AirlineName}</Text>
                        <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                        <Text style={styles.airlineTxt}>{airlineNameTrans1}</Text>
                      </View>
                      : flightData === 2 ?
                        <View style={styles.row2}>
                          <Text style={styles.airlineTxt}>{AirlineName}</Text>
                          <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                          <Text style={styles.airlineTxt}>{airlineNameTrans1}</Text>
                          <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                          <Text style={styles.airlineTxt}>{airlineNameTrans2}</Text>
                        </View>
                        :
                        null
                  }
                  <View><Text style={styles.typeTxt}>{Category}</Text></View>
                </View>
              </View>
              <View style={styles.flNumberView}>
                <Text style={styles.flNumberTxt}>{FlightNumber}</Text>
              </View>
            </View>
            <View>
              {map(priceInfo1, (value, k) => {
                const dataInfo = result(value, 'Text', '');
                const priceInfo = result(value, 'Amount', '');
                return (
                  <View key={k} style={styles.row}>
                    <View style={styles.leftPart2}><Text style={styles.rowItemLeft}>{dataInfo}</Text></View>
                    <View style={styles.rightPart2}><Text style={styles.rightItemHeader}>{language.CGV__RP} {currencyFormatter(priceInfo)}</Text></View>
                  </View>
                );
              })
              }
            </View>
          </View>


          { flightReturned !== undefined ?
            <View>
              <View style={styles.greyLine} />
              <View>
                <Text style={styles.depreturn}>Return</Text>
              </View>
              <View style={styles.row}>
                <View style={[styles.row, styles.mv5]}>
                  <View style={styles.iconView}>
                    <Image source={lengthReturn > 1 ? airlineTransit : airlineNameReturn} style={styles.imageFlight} />
                  </View>
                  <View>
                    <View>
                      { flightTransit === 0 ?
                        <View><Text style={styles.airlineTxt}>{AirlineName}</Text></View>
                        : flightData === 1 ?
                          <View style={styles.row2}>
                            <Text style={styles.airlineTxt}>{AirlineName}</Text>
                            <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                            <Text style={styles.airlineTxt}>{airlineNameReturnTrans1}</Text>
                          </View>
                          : flightData === 2 ?
                            <View style={styles.row2}>
                              <Text style={styles.airlineTxt}>{AirlineName}</Text>
                              <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                              <Text style={styles.airlineTxt}>{airlineNameReturnTrans1}</Text>
                              <SimasIcon name={'proceed'} size={10} style={styles.proceedIcon}/>
                              <Text style={styles.airlineTxt}>{airlineNameReturnTrans2}</Text>
                            </View>
                            :
                            null
                      }  
                    </View>
                    <View><Text style={styles.typeTxt}>{CategoryReturn}</Text></View>
                  </View>
                </View>
                <View style={styles.flNumberView}>
                  <Text style={styles.flNumberTxt}>{FlightNumberReturn}</Text>
                </View>
              </View>
              <View>
                {map(priceInfo2, (value, k) => {
                  const dataInfo = result(value, 'Text', '');
                  const priceInfo = result(value, 'Amount', '');
                  return (
                    <View key={k} style={styles.row}>
                      <View style={styles.leftPart2}><Text style={styles.rowItemLeft}>{dataInfo}</Text></View>
                      <View style={styles.rightPart2}><Text style={styles.rightItemHeader}>{language.CGV__RP} {currencyFormatter(priceInfo)}</Text></View>
                    </View>
                  );
                }
                )}
              </View>
            </View>
            :
            null
          }

          <View style={styles.greyLine} />
          <View style={styles.row}>
            <Text style={styles.leftPart3}>{language.CGV__TOTAL}</Text>
            <Text style={styles.rightPart3}>{language.CGV__RP} {currencyFormatter(totalPrice1 + totalPrice2)}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmallTxInfo;
