import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from './TravelInsuranceForm.component.styles';

class TravelAssurance extends React.Component {
  static propTypes = {
    invalid: PropTypes.bool,
    stepDetail: PropTypes.func,
  }

  render () {
    const {stepDetail} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.bar_proggres} />
        <View>
          <Text style={styles.tittle_header}>{language.TRAVEL_DOMESTIC_ASSURANCE_TITTLE}</Text>
        </View>
        <View>
          <Text style={styles.sub_tittle}>Simasnet Travel Dalam Negeri</Text>
        </View>
        <View style={styles.container}>
          <Touchable style={styles.radio} onPress={stepDetail}>
            <Text style={styles.radio_tittle}>Domestic Plan A</Text>
            <Text style={styles.radio_sub_tittle}>Jaminan Sampai dengan Rp.50.000.000</Text>
          </Touchable>
          <Touchable style={styles.radio}>
            <Text style={styles.radio_tittle}>Domestic Plan B</Text>
            <Text style={styles.radio_sub_tittle}>Jaminan Sampai dengan Rp.100.000.000</Text>
          </Touchable>
          <Touchable style={styles.radio}>
            <Text style={styles.radio_tittle}>Domestic Plan C</Text>
            <Text style={styles.radio_sub_tittle}>Jaminan Sampai dengan Rp.200.000.000</Text>
          </Touchable>
          <Touchable style={styles.radio}>
            <Text style={styles.radio_tittle}>Domestic Plan D</Text>
            <Text style={styles.radio_sub_tittle}>Jaminan Sampai dengan Rp.400.000.000</Text>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssurance;
