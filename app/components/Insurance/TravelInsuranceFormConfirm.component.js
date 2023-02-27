import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import styles from './TravelInsuranceFormConfirm.component.styles';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import map from 'lodash/map';
import result from 'lodash/result';
import isNaN from 'lodash/isNaN';
import {getVarName, isEmptyOrNull, recursiveMap} from '../../utils/transformer.util';

class TravelAssuranceFormConfirm extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    TravelResult: PropTypes.func,
    party: PropTypes.object,
    dataDisplay: PropTypes.object,
    headerDisplay: PropTypes.object,
  }

  displayInfo = (partyInfo, elementHeader, key = '') =>   isEmptyOrNull(partyInfo) ? 
    null 
    :
    (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.tittleHeader}>{language.GENERIC__PARTY}</Text>
        </View>
        {
          map(partyInfo, (object, keys) => (
            (isEmptyOrNull(result(elementHeader, keys, ''))) ? 
              null
              :
              <View key={key + keys}>
                <Text style={[styles.header, styles.bold]}>{result(elementHeader, keys, '')}</Text>
                <Text style={styles.subHeader}>{(typeof (object) === 'object') ? object.display : object}</Text>
              </View>
          ))
        }
      </View>
    )

  render () {
    const {dataDisplay, party, headerDisplay, ...reduxFormProps} = this.props;
    const {handleSubmit = noop, invalid = false} = reduxFormProps;
    const planHeader = result(dataDisplay, 'planHeader', {});
    const travelHeader = result(dataDisplay, 'travelHeader', {});
    const planDisplay = result(headerDisplay, 'planDisplay', {});
    const beneficiaryDisplay = result(headerDisplay, 'beneficiaryDisplay', {});
    const customerDisplay = result(headerDisplay, 'customerDisplay', {});
    const BeneficiaryDetail = result(party, 'Beneficiary', {});
    const insured = result(party, 'Insured', {});
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.barProggres} />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={[styles.tittleHeader, styles.bold]}>{language.TRAVEL_INSURANCE__CONFIRM_DETAILS}</Text>
          </View>
          {
            map(planHeader, (object, k) => (typeof (object) === 'function' ? 
              null :
              <View key={getVarName({planHeader}) + k}>
                <Text style={[styles.header, styles.bold]}>{result(planDisplay, k, '')}</Text>
                <Text style={styles.subHeader}>{object}</Text>
              </View>
            ))}
          <View key={getVarName({travelHeader})}>
            <Text style={[styles.header, styles.bold]}>{result(travelHeader, 'header', '')}</Text>
            {
              recursiveMap(result(travelHeader, 'subHeader', ''), (text, key) => <Text style={styles.subHeader} key={key}>{text}</Text>)
            }
          </View>
        </View>
        <View style={styles.rowGrey}/>      
        <View style={styles.container}>
          {
            this.displayInfo(insured, customerDisplay, language.GENERIC__INSURED)
          }
        </View>
        <View style={styles.rowGrey}/>
        {
          map(party, (object, key) => (isNaN(parseInt(key))) ? 
            null
            :
            <View>
              <View style={styles.container}>
                {
                  this.displayInfo(object, customerDisplay, key)
                }
              </View>
              <View style={styles.rowGrey}/>      
            </View>            
          )
        }
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.tittleHeader}>{language.TRAVEL_INSURANCE__BENEFICIARY}</Text>
          </View>
          {
            map(BeneficiaryDetail, (object, k) => (
              <View key={getVarName({BeneficiaryDetail}) + k}>
                <Text style={[styles.header, styles.bold]}>{result(beneficiaryDisplay, k, '')}</Text>
                <Text style={styles.subHeader}>{typeof (object) === 'object' ? object.display : object}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.container}>
          <View style={styles.buttonContinue} >
            <SinarmasButton onPress={handleSubmit} disabled={invalid} text={language.TRAVEL_INSURANCE__CREATE_INSURANCE}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssuranceFormConfirm;
