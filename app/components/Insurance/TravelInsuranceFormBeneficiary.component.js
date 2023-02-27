import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton, SinarmasInput, SinarmasPicker, SinarmasTncBox} from '../FormComponents';
import {Field} from 'redux-form';
import styles from './TravelInsuranceFormBeneficiary.component.styles';
import {getDropDownList, getVarName, recursiveMap, wrapMethodInFunction} from '../../utils/transformer.util';
import {language} from '../../config/language';
import InsuranceHeader from './InsuranceHeader.component';
import noop from 'lodash/noop';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';

class TravelAssuranceFormBeneficiary extends React.Component {
  static propTypes = {
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    navParams: PropTypes.object,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    custPage: PropTypes.func,
    dataDisplay: PropTypes.object,
    goToTnc: PropTypes.func,
  }

  state = {
    checked: false,
  }
  checkboxChange = () => {
    if (this.state.checked) {
      this.setState({checked: false});
    }  else {
      this.setState({checked: true});
    }
  }

  headerView = (text, key) => <Text style={styles.header} key={key}>{text}</Text>

  nameView = (text, key) => <Text style={styles.subHeader} key={key}>{text}</Text>

  customView = (object) => recursiveMap(object, this.nameView, 'name', ['function', 'header'], {function: noop, header: this.headerView}).map((object, key) => <View key={key}>{object}</View>)

  tncBody = (planType) => (<View style={styles.row}><Text style={styles.tncBodyStyle}>{language.TERMS_AND_CONDITION__AGREE1}</Text><Touchable onPress={wrapMethodInFunction(this.props.goToTnc, planType)}><Text style={styles.tncUnderline}>{language.TERMS_AND_CONDITION__AGREE2}</Text></Touchable></View>)
 
  render () {
    const {submitting, handleSubmit, invalid, navParams = {}, dataDisplay} = this.props;
    const planSelect = result(navParams, 'planSelect', '');
    const btnPress = (!(invalid || submitting));
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.barProggres} />
        <InsuranceHeader headerDisplay={dataDisplay} headerKey={getVarName({dataDisplay})} avoidedDisplay={['function']} customHeader={['insuredHeader']} customView={{insuredHeader: this.customView}}/>
        <View style={styles.container}>
          <Text style={styles.tittleHeader}>{language.TRAVEL_INSURANCE__BENEFICIARY}</Text>
          <Field
            name='BeneficiaryName'
            label={language.TRAVEL_INSURANCE__BENEFICIARY_NAME}
            placeholder={language.TRAVEL_INSURANCE__BENEFICIARY_NAME}
            disabled={false}
            component={SinarmasInput}
            keyboardType='default'
            maxLength={50}
          />
          <Field
            name='BeneficiaryRelationship'
            rightIcon='arrow'
            component={SinarmasPicker}
            placeholder={language.TRAVEL_INSURANCE__BENEFICIARY_RELATIONSHIP}
            labelKey='display'
            itemList={getDropDownList(navParams.relation)}
          />
          <Field
            name='BeneficiaryPercentage'
            label={language.TRAVEL_INSURANCE__BENEFICIARY_PERCENTAGE}
            placeholder={language.TRAVEL_INSURANCE__BENEFICIARY_PERCENTAGE}
            disabled={true}
            component={SinarmasInput}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.container}>
          <View style={styles.border}>
            <View style={styles.disclaimerContainer}>
              <SimasIcon name='input-error' style={styles.disclaimerIcon}/>
              <Text style={styles.disclaimerText}>{language.TRAVEL_INSURANCE__DISCLAIMER}</Text>
            </View>
          </View>
          <View style={styles.verticalPadding}/>
          <Field 
            name={'checkTnc'}
            fieldName={'checkTnc'}
            formName={'travelBeneficiary'}
            component={SinarmasTncBox}
            tnc={this.tncBody(planSelect)}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.buttonContinue}>
            <SinarmasButton disabled={!btnPress} onPress={handleSubmit} text={language.GENERIC__CONTINUE}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssuranceFormBeneficiary;
