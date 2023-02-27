import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import styles from './TravelInsuranceFormResult.component.styles';
import result from 'lodash/result';
import map from 'lodash/map';
import {getVarName, wrapMethodInFunction} from '../../utils/transformer.util';
import SuccessHeader from './SuccessHeader.component';

class TravelAssuranceFormResult extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    confirmPA: PropTypes.func,
    dataDisplay: PropTypes.object,
    backHome: PropTypes.func,
  }

  render () {
    const {navParams, handleSubmit} = this.props;
    const successStatus = result(navParams, 'status', '') === 200;
    const dataDisplay = result(navParams, 'dataDisplay', {});
    const insuranceName = result(dataDisplay, 'insurancePlan', '');
    const insuranceType = result(dataDisplay, 'insuranceType', '');
    const dataDisplayHeader = result(navParams, 'dataDisplayHeader', {});
    const error = result(navParams, 'error', {});
    const transRefNum = result(navParams, 'NoRef', '');
    return (
      <ScrollView>
        <View style={styles.container}>
          <SuccessHeader transRefNum={transRefNum} 
            textType={language.TRAVEL_INSURANCE__YOUR_REGISTRATION}
            text={`${language.TRAVEL_INSURANCE__SUCCESS_REGISTRATION1} ${insuranceName} ${language.TRAVEL_INSURANCE__SUCCESS_REGISTRATION2} ${insuranceType} ${language.TRAVEL_INSURANCE__SUCCESS_REGISTRATION3} ${(successStatus) ? language.TRAVEL_INSURANCE__SUCCESS_REGISTRATION_SUCCESS : language.TRAVEL_INSURANCE__SUCCESS_REGISTRATION_FAILURE}`}
            status={successStatus ? 'success' : 'fail'}/>
          <View>
            <View style={styles.container}>
              {successStatus ? 
                <View style={styles.textContainer}>
                  {map(dataDisplay, (object, key) => (
                    <View style={styles.textPadding} key={getVarName({dataDisplay}) + key}>
                      <Text style={[styles.textHeader]}>{result(dataDisplayHeader, key, key)}</Text>
                      <Text style={[styles.textSubheader]}>{object}</Text>
                    </View>
                  ))}
                </View>
                :
                map(error, (object, key) => (
                  <View style={styles.textPadding} key={getVarName({error}) + key}>
                    <Text style={[styles.textHeader]}>{result(dataDisplayHeader, key, key)}</Text>
                    <Text style={[styles.textSubheader]}>{object}</Text>
                  </View>
                ))
              }
            </View>
            <View style={styles.buttonContainer} >
              <SinarmasButton onPress={wrapMethodInFunction(handleSubmit, successStatus)} text={successStatus ? language.INSURANCE_PA_NEXT_PAY : language.BUTTON__BACK_TO_HOME}/>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TravelAssuranceFormResult;
