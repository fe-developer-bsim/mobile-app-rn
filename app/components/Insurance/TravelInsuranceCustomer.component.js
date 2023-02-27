import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import styles from './TravelInsuranceCustomer.component.style';
import Warning from './onePersonFamilyWarning.component';
import {wrapMethodInFunction, cutOffDisplayStr, isEmptyOrNull, getVarName} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';
import InsuranceHeader from './InsuranceHeader.component';

class TravelAssuranceCustomerComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    addPartySize: PropTypes.func,
    party: PropTypes.object,
    editDetail: PropTypes.func,
    displayFormat: PropTypes.object,
    hiddenDisplay: PropTypes.object,
    isFull: PropTypes.bool,
    deleteParty: PropTypes.func,
    dataDisplay: PropTypes.object,
    isFilled: PropTypes.bool,
    tooFew: PropTypes.bool,
    showWarning: PropTypes.func,
  }

  hideModal = () => this.setState({modalVisible: false})

  showModal = () => this.setState({modalVisible: true})

  render () {
    const {invalid, submitting, handleSubmit = noop, addPartySize, party, editDetail, isFull, deleteParty, dataDisplay, isFilled, tooFew, showWarning} = this.props;
    
    const insured = result(party, 'Insured', {});
    const iconSize = 26;
    const displayVal = {HandPhone: language.FORM__HANDPHONE, CustName: language.GENERIC__NAME, InsuredIdNo: language.TRAVEL_INSURANCE__ID_NO, Gender: language.FORM__GENDER, DateOfBirth: language.FORM__DATE_OF_BIRTH, Status: language.FORM__STATUS, PhoneNo: language.FORM__HOME_PHONE, Email: language.FORM__EMAIL, CustAddress: language.FORM__ADDRESS, City: language.FORM__CITY, ZipCode: language.FORM__ZIP_CODE};
    const statusVal = {Spouse: language.GENERIC__ADULT, Child: language.GENERIC__CHILD};
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View style={styles.barStep}>
          <View style={styles.partOne}/>
          <View style={styles.partTwo}/>
        </View>
        <InsuranceHeader headerDisplay={dataDisplay} headerKey={getVarName({dataDisplay})} avoidedDisplay={['function']} customHeader={['insuredHeader']} customView={{insuredHeader: null}}/>
        <Warning onPress={addPartySize} modalVisible={this.state.modalVisible} hideModal={this.hideModal}/>
        <View>
          {
            <View>
              <View style={styles.container}>
                <Text style={styles.titleHeader}>{language.GENERIC__INSURED}</Text>
                {
                  map(insured, (object, index) => (
                    (index === 'IsInsuredFlag' || index === 'Completed' || index === 'IdType' || index === 'isFilled' || isEmptyOrNull(object)) ? 
                      null :
                      <View style={styles.rowContainer} key={getVarName({insured}) + index}>
                        <View style={styles.leftRowContainer}>
                          <Text style={[styles.header]}>{result(displayVal, `${index}`, index)}</Text>
                        </View>
                        <View style={styles.rightRowContainer}>
                          <Text style={styles.subHeader}>{(typeof (object) === 'object') ? cutOffDisplayStr(object.display) : cutOffDisplayStr(object)}</Text>
                        </View>
                      </View>
                  ))
                }
                <View style={styles.buttonContainer}>
                  <Touchable onPress={wrapMethodInFunction(editDetail, language.GENERIC__INSURED)}>
                    <SimasIcon name={'edit'} size={iconSize} style={styles.icon}/>
                  </Touchable>
                </View>
              </View>
              <View style={styles.rowGrey}/>
            </View>
          }
          {
            map(party, (object, index) => (
              (isNaN(parseInt(index))) ? 
                null :
                <View key={getVarName({party}) + index}>
                  <View style={styles.container}>
                    <Text style={styles.titleHeader}>{result(statusVal, result(object, 'Status.code', language.GENERIC__ADULT), language.GENERIC__ADULT)} {index}</Text>
                    {
                      map(object, (value, key) => (
                        (key === 'IsInsuredFlag' || index === 'Completed' || key === 'IdType' || key === 'isFilled' || isEmptyOrNull(value)) ? 
                          null :
                          <View style={styles.rowContainer} key={getVarName({party}) + index + key}>
                            <View style={styles.leftRowContainer}>
                              <Text style={styles.header}>{result(displayVal, `${key}`, key)}</Text>
                            </View>
                            <View style={styles.rightRowContainer}>
                              <Text style={styles.subHeader}>{(typeof (value) === 'object') ? cutOffDisplayStr(value.display) : cutOffDisplayStr(value)}</Text>
                            </View>
                          </View>
                      ))
                    }
                    <View style={styles.buttonContainer}>
                      <View style={styles.iconGap}>
                        <Touchable onPress={wrapMethodInFunction(editDetail, index)}>
                          <View style={styles.iconContainer}>
                            <SimasIcon name={'edit'} size={iconSize} style={styles.icon}/>
                          </View>
                        </Touchable>
                      </View>
                      <Touchable onPress={wrapMethodInFunction(deleteParty, index)}>
                        <View style={styles.iconContainer}>
                          <SimasIcon name={'trash'} size={iconSize} style={styles.icon}/>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                  <View style={styles.rowGrey}/>
                </View>
            ))
          }
        </View>
        {(isFull) ? 
          null :
          <Touchable onPress={addPartySize}>
            <View style={[styles.row, styles.containerAdd]}>
              <Text style={styles.addText}>{language.TRAVEL_INSURANCE_ADD_PARTY}</Text>
              <View style={styles.iconContainer}>
                <SimasIcon name={'Plus'} size={iconSize} style={styles.icon}/>
              </View>
            </View>
          </Touchable>
        }
        <View style={styles.container}>
          <View style={styles.buttonContinue}>
            <SinarmasButton disabled={invalid || submitting || !isFilled} onPress={wrapMethodInFunction(showWarning, tooFew, handleSubmit, this.showModal)} text={language.GENERIC__CONTINUE}/>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default TravelAssuranceCustomerComponent;
