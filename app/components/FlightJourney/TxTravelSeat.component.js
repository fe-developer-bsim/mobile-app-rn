import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TxTravelSeat.styles';
import {SinarmasButton, CheckBox} from '../FormComponents';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';


class TxTravelSeat extends React.Component {
  static propTypes = {
    toPolicies: PropTypes.func,
    showAlert: PropTypes.func,
  }

  state = {
    showAlert: false
  }

  checkInsurance = () => {
    const {showAlert} = this.props;
    const alert = this.state.showAlert;
    alert ? showAlert : null;
  }

  changeBox = () => {
    const showAlert = this.state.showAlert;
    this.setState({showAlert: !showAlert});
  }

  render () {
    const {toPolicies} = this.props;
    return (
      <View>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContainer} extraHeight={120}>
          <View>
            <View style={styles.redLine}/>
            <View style={styles.bgWhite}>
              <Text style={styles.textTitle}>{language.FLIGHT__TITLE_INSURANCE}</Text>
              <View style={styles.rowCheckBox}>
                <View style={styles.checkboxField}>
                  <CheckBox name='insurance' onChange={this.changeBox} label='' checkboxStyle={styles.checkBoxStyle}/>
                  <View>
                    <Text style={styles.labelCheckBox}>{language.FLIGHT__INSURANCE_LABEL}</Text>
                    <Text style={styles.labelPax}>Rp {language.FLIGHT__INSURANCE_PRICE}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.textPurpose}>{language.FLIGHT__INFORMATION}</Text>
              <Touchable onPress={toPolicies}>
                <Text style={styles.textTnc}>{language.FLIGHT__TERM_CONDITION}</Text>
              </Touchable>
              <View style={styles.paddingButton}/>
            </View>
          </View>
          <View style={styles.btnConfirm}>
            <SinarmasButton onpress={this.checkInsurance}>
              <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TxTravelSeat;
