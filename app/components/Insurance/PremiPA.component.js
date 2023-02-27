import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './PremiPA.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import map from 'lodash/map';
import SimasIcon from '../../assets/fonts/SimasIcon';

class InsurancePA extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.array,
    getPremiPA: PropTypes.func,
    handleSubmit: PropTypes.func,
    isDisabled: PropTypes.bool,
  }

  render () {
    const {getPremiPA, navParams} = this.props;
    return (

      <ScrollView>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.content}>
          <View style={styles.contentContainerPremi}>
            <Text style={styles.pageTitle}>{language.INSURANCE_PLAN}</Text>
            <Text style={styles.pageTitle}>{language.INSURANCE_PA_PLAN}</Text>
          </View>
        </View>
        <View style={styles.rowGreyTitle}>
          <View style={styles.contentBar}>
            <Text>{language.INSURANCE_PA}</Text>
          </View>
        </View>
        <View style={styles.contentContainerPremi}>
          {
            map(navParams, (value, i) => (
              
              <View key={i} style={styles.contentContainerPremi}>

                <View style={styles.content}>
                  <Touchable onPress={getPremiPA(value)} style={styles.row}>
                    <View>
                      <Text style={styles.pageSubtitle}>{value.name}</Text>
                      {value.code === '150000' ? <Text style={styles.pageSubtitle}>{language.INSURANCE_PA_PREMI_50}</Text>
                        : <Text style={styles.pageSubtitle}>{language.INSURANCE_PA_PREMI_25}</Text>}
                    </View>
                    <View style={styles.arrowIconContainer}>
                      <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                    </View>
                  </Touchable>
                </View>
                <View style={styles.rowGrey}/>
              </View>
              
            ))}
        </View>
      </ScrollView>
    );
  }
}

export default InsurancePA;
