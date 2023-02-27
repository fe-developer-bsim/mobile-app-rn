import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmallTx.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {diffTime} from '../../utils/transformer.util';
import sriwijaya from '../../assets/images/sriwijaya-air.png';
import lion from '../../assets/images/lion-air.png';
import kalstar from '../../assets/images/kalstar-aviation.png';
import jetstar from '../../assets/images/jetstar.png';
import garuda from '../../assets/images/garuda-indonesia.png';
import citilink from '../../assets/images/citilink.png';
import airasia from '../../assets/images/air-asia.png';
import wings from '../../assets/images/air-asia.png';
import nam from '../../assets/images/air-asia.png';

class FlightList extends React.Component {

  static propTypes = {
    Airline: PropTypes.string,
    AirlineName: PropTypes.string,
    ArriveDate: PropTypes.string,
    ArriveTime: PropTypes.string,
    ClassCode: PropTypes.string,
    ClassId: PropTypes.string,
    DepartDate: PropTypes.string,
    DepartTime: PropTypes.string,
    Destination: PropTypes.string,
    FlightId: PropTypes.string,
    FlightNumber: PropTypes.string,
    Num: PropTypes.string,
    Seq: PropTypes.string,
    Origin: PropTypes.string,
    getRefundInfo: PropTypes.func,
    Category: PropTypes.string,
  }

  render () {
    const {AirlineName, ArriveTime, DepartTime, FlightNumber, Num, Seq, Origin, Category} = this.props;
    const flightDuration = diffTime(DepartTime, ArriveTime);
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} style={styles.container}>
        { Num === '0' && Seq >= '1' ?
          <View style={styles.bgGrey}>
            <View style={styles.transitView}>
              <View style={styles.row}>
                <View>
                  <View style={styles.bottomleftWrapper}>
                    <View style={styles.transitBlock}/>
                    <View style={styles.transitCircle}/>
                    <View style={styles.transitBlock2}/>
                  </View>
                </View>
                <View style={[styles.wd80, styles.pv10]}>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <View style={styles.iconView}>
                        <Image source={ AirlineName === 'Lion' ? lion : AirlineName === 'Sriwijaya' ? sriwijaya
                          : AirlineName === 'Citilink' ? citilink : AirlineName === 'AirAsia' ? airasia
                            : AirlineName === 'Garuda' ? garuda : AirlineName === 'Jetstar' ? jetstar
                              : AirlineName === 'Kalstar' ? kalstar : AirlineName === 'Wings' ? wings
                                : AirlineName === 'NAM' ? nam : null } style={styles.imageFlight} />
                      </View>
                      <View>
                        <View><Text style={[styles.airlineTxt, styles.cgrey]}>{AirlineName}</Text></View>
                        <View><Text style={styles.typeTxt}>{Category}</Text></View>
                      </View>
                    </View>
                    <View style={styles.flNumberView}>
                      <Text style={[styles.flNumberTxt, styles.cgrey]}>{FlightNumber}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={[styles.wd80, styles.mv10]}>
                      <View style={styles.row2}>
                        <View style={styles.originView}>
                          <Text style={[styles.originTxt, styles.cgrey]}>{Origin}</Text>
                          <Text style={[styles.smallTxt, styles.cgrey]}>planeLocation</Text>
                        </View>
                        <View>
                          <Text style={styles.arriveTime}>{flightDuration}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.DepartTime}>
                    <Text style={[styles.departTimeTxt, styles.cgrey]}>{DepartTime}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          :
          null
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default FlightList;
