import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './Insurance.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import noop from 'lodash/noop';

class Insurance extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getPACreate: PropTypes.func,
    goDetailPA: PropTypes.func,
    goOnDetailPA: PropTypes.func,
    getTravelInsuranceCreate: PropTypes.func,
    TravelInsuranceFlag: PropTypes.func,
    PAFlag: PropTypes.func,
  }
  
  render () {
    const {getPACreate, goOnDetailPA, getTravelInsuranceCreate, PAFlag = noop, TravelInsuranceFlag = noop} = this.props;
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
          (PAFlag()) ? 
            <View>
              <View style={styles.content}>
                <Touchable onPress={getPACreate} style={[styles.offerContainer]}>
                  <View style={[styles.detailContainer, styles.column]}>
                    <View style={styles.contentContainer}>
                      <Text style={styles.pageTitle}>{language.INSURANCE_PA}{'\n'}{language.INSURANCE_PA_BY}</Text>
                      <Text style={styles.pageSubtitle}>{language.INSURANCE_PA_SUB}</Text>
                    </View>
                    <Touchable onPress={goOnDetailPA}>
                      <Text style={styles.pageSubtitleDetail}>{language.INSURANCE_VIEW_DETAIL}</Text>
                    </Touchable>
                  </View>
                  <View style={styles.arrowIconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                  </View>
                </Touchable>
              </View>
            </View>
            :
            null
        }
        {
          (TravelInsuranceFlag()) ? 
            <View>
              <View style={styles.content}>
                <Touchable onPress={getTravelInsuranceCreate} style={styles.offerContainer}>
                  <View style={[styles.detailContainer, styles.column]}>
                    <View style={styles.contentContainer}> 
                      <Text style={styles.pageTitle}>{language.TRAVEL_INSURANCE__SIMASNET_TRAVEL_OPTION}{'\n'}{language.TRAVEL_INSURANCE__SIMASNET_TRAVEL_OPTION_BY}</Text>
                      <Text style={styles.pageSubtitle}>{language.TRAVEL_INSURANCE__SIMASNET_TRAVEL_OPTION_SUBHEADER}</Text>
                    </View>
                  </View>
                  <View style={styles.arrowIconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                  </View>
                </Touchable>
              </View>
            </View>
            :
            null  
        }
      </ScrollView>
    );
  }
}

export default Insurance;
