import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './TravelInsurance.component.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import {getVarName, wrapMethodInFunction} from '../../utils/transformer.util';
import map from 'lodash/map';

class TravelInsuranceComponent extends Component {
  static propTypes = {
    getTravelInsurance: PropTypes.func,
    navParams: PropTypes.object,
    goDetailTravel: PropTypes.func,
  }

  render () {
    const {getTravelInsurance, navParams, goDetailTravel} = this.props;
    const travelType = result(navParams, 'travelType', {});
    const travelURI = result(navParams, 'travelURI', {});
    const premiURI = result(navParams, 'premiURI', '');
    const typeDisplay = result(navParams, 'typeDisplay', {});
    return (
      <ScrollView>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View>
          <View style={[styles.contentContainer, styles.border]}>
            <Text style={styles.pageTitle}>{language.INSURANCE_CHOOSE}</Text>
          </View>
        </View>
        {
          map(travelType, (object, key) => {
            const value = (typeof (object) === 'object' ? object.value : object);
            return (
              <View key={getVarName({travelType}) + key}>
                <View style={styles.content}>
                  <Touchable onPress={wrapMethodInFunction(getTravelInsurance, value)} style={styles.offerContainer}>
                    <View style={[styles.column, styles.detailContainer]}>
                      <View style={styles.contentContainer}> 
                        <Text style={styles.pageTitle}>{language.TRAVEL_INSURANCE__TITLE_PLAN} {value}</Text>
                        <Text style={styles.pageSubtitle}>{result(typeDisplay, value, '')}</Text>
                      </View>
                      <View style={styles.row}>
                        <Touchable onPress={wrapMethodInFunction(goDetailTravel, result(travelURI, value, ''))}>
                          <Text style={styles.pageSubtitleDetail}>{language.INSURANCE_VIEW_DETAIL}</Text>
                        </Touchable>
                        <Touchable onPress={wrapMethodInFunction(goDetailTravel, premiURI)}>
                          <Text style={styles.pageSubtitleDetail}>{language.INSURANCE_VIEW_PREMI}</Text>
                        </Touchable>
                      </View>
                    </View>
                    <View style={styles.arrowIconContainer}>
                      <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                    </View>
                  </Touchable>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }

}

export default TravelInsuranceComponent;