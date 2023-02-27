import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './PlanTravel.component.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import map from 'lodash/map';
import result from 'lodash/result';
import {PlanInsurancePrice, getVarName} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';

class InsuranceTravel extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    getTravelDetail: PropTypes.func,
    handleSubmit: PropTypes.func,
    isDisabled: PropTypes.bool,
    header: PropTypes.object,
    dataDisplay: PropTypes.object,
  }

  render () {
    const {getTravelDetail, navParams, dataDisplay} = this.props;
    const plans = result(navParams, plans, {});
    const Individu = result(navParams, 'Individu', []);
    const Family = result(navParams, 'Family', []); 
    const header = result(dataDisplay, 'planHeader.header', '');
    return (
      <ScrollView >
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View style={[styles.headerContainer, styles.padding]}>
          <Text style={styles.pageTitle}>{language.INSURANCE_PLAN_TRAVEL_TITTLE_TOP}</Text>
          {
            <Text style={styles.pageTitle}>{header}</Text>
          }
        </View>
        {map(Individu, (value, i) => (
          <View key={getVarName({Individu}) + i} style={styles.simasOption}>
            {(i < 1) ?
              <View>
                <View style={styles.borderGrey}>
                  <Text style={styles.borderText}>{header} {'-'} {language.TRAVEL_INSURANCE__INDIVIDUAL}</Text>
                </View>
                <View style={styles.subheaderPadding}/>
              </View>
              : null}
            <View style={styles.content}>
              <Touchable onPress={getTravelDetail(value)} style={styles.offerContainer}>
                <View style={[styles.detailContainer, styles.column, styles.contentContainer]}>
                  <Text style={styles.pageTitle}>{value.name}</Text>
                  <Text style={styles.pageSubtitle}>{PlanInsurancePrice(value.code)}</Text>
                </View>
                <View style={styles.arrowIconContainer}>
                  <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                </View>
              </Touchable>
            </View>
          </View>
        ))}

        {map(Family, (value, i) => (
          <View key={getVarName({Family}) + i}>
            {(i < 1) && (value.jenisPerjalanan === 'Overseas') ?
              <View>
                <View style={styles.subheaderPadding}/>
                <View style={styles.borderGrey}>
                  <Text style={styles.borderText}>{header} {'-'} {language.TRAVEL_INSURANCE__FAMILY}</Text>
                </View>
                <View style={styles.subheaderPadding}/>
              </View>
              : null}
            <View style={styles.content}>
              <Touchable onPress={getTravelDetail(value)} style={styles.offerContainer}>
                <View style={[styles.detailContainer, styles.column, styles.contentContainer]}>
                  <Text style={styles.pageTitle}>{value.name}</Text>
                  <Text style={styles.pageSubtitle}>{PlanInsurancePrice(value.code)}</Text>
                </View>
                <View style={styles.arrowIconContainer}>
                  <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                </View>
              </Touchable>
            </View>
          </View>
        ))}

      </ScrollView>
    );
  }
}

export default InsuranceTravel;
