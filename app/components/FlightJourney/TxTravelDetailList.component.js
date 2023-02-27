import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TxTravelDetailList.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import Touchable from '../Touchable.component';
import {SinarmasButton} from '../FormComponents';
import {map, isEmpty, result, startCase} from 'lodash';
import {language} from '../../config/language';
import BackgroundTimer from 'react-native-background-timer';

class TxTravelDetailList extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    txTravelDetail: PropTypes.func,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    states: PropTypes.object,
    navigation: PropTypes.object,
    dataBook: PropTypes.array,
    isInternational: PropTypes.bool,
    showSpin: PropTypes.func,
  }

  state = {
    secondsRemaining: 0.1,
    disableClickEdit: false,
  }


  tick = (index, type, isInternational) => () => {
    const {txTravelDetail} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      txTravelDetail(index, type, isInternational);
    }
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  txTravelDetail = (index, type, isInternational) => () => {
    const {showSpin} = this.props;
    showSpin();
    this.interval = BackgroundTimer.setInterval(this.tick(index, type, isInternational), 1000);
  }

  renderListPassenger = (data, k) => {
    const {states, isInternational} = this.props;
    const type = result(data, 'type', '');
    const indexData = result(data, 'index', '');
    const stateFill = states.txTravelDetail;
    const defIndex = type !== 'contact' ? k + 1 : 99;
    const disable = result(stateFill, `${defIndex}` + '.disable', false);
    const checkEmpty = result(stateFill, `${defIndex}`, null);
    const formVal = result(stateFill, `${defIndex}` + '.formValues', {});

    const fullName = result(formVal, 'tittle.display', '-') + ' ' + result(formVal, 'firstName', '-') + ' ' + result(formVal, 'lastName', '-');
    const bod = moment(result(formVal, 'birthDate', '-')).format('DD MMM YYYY');
    const nationality = result(formVal, 'nationality', '-');
    const email = result(formVal, 'email', '-');
    const idNumber = result(formVal, 'idNumber', '-');
    const phone = result(formVal, 'phone', '-');
    const homePhone = result(formVal, 'homePhone', '-');
    const IdExpiry = moment(result(formVal, 'IdExpiry', '-')).format('DD MMM YYYY');

    const passportNumber = result(formVal, 'passportNumber', null);
    const passportExp = result(formVal, 'expiryPassport', '') ? moment(result(formVal, 'expiryPassport', '-')).format('DD MMM YYYY') : null;
    const coi = result(formVal, 'coi', null);

    return (
      <View key={k} >
        { (type !== 'contact') ?
          <View style={styles.touchableContainer}>
            <View>
              <View style={styles.viewPurposeTittle}>
                <Text style={styles.textPurposeTittle}>{startCase(type)} {indexData}</Text>
                <View>
                  <Touchable onPress={this.txTravelDetail(indexData, type, isInternational)} disabled={this.state.disableClickEdit}>
                    <Text style={styles.editButton}>{language.TX_TRAVEL_LIST_EDIT}</Text>
                  </Touchable>
                </View>
              </View>
              {disable ? <Text style={styles.textPurposeWarning}>{language.TX_TRAVEL_LIST_COMPLITE_INFO}</Text> : null}
              { !isEmpty(checkEmpty) ?
                <View style={styles.containerListPassenger}>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_FULL_NAME}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{fullName}</Text>
                    </View>
                  </View>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_DOB}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{bod}</Text>
                    </View>
                  </View>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_NATIONALITY}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{nationality}</Text>
                    </View>
                  </View>
                  { (type === 'adult') ?
                    <View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_IDNUMBER}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{idNumber}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_IDEXPIRY}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{IdExpiry}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_PHONE_NUMBER}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{phone}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_HOME_PHONE}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{homePhone}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_EMAIL}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{email}</Text>
                        </View>
                      </View>
                    </View>
                    : null}
                  {isInternational ?
                    <View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_PASS_NUMBER}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{passportNumber}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_COI}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{coi}</Text>
                        </View>
                      </View>
                      <View style={styles.showFormKey}>
                        <View style={styles.showFormTittle}>
                          <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_PASS_EXPIRY}</Text>
                        </View>
                        <View style={styles.showFormVal}>
                          <Text style={styles.formKeyText}>{passportExp}</Text>
                        </View>
                      </View>
                    </View>
                    : null}
                </View>
                : null }
            </View>
          </View> : null }
        <View style={styles.greyLine}/>
      </View>
    );
  }

  renderContactInfo = (data, k) => {
    const {states, isInternational} = this.props;
    const type = result(data, 'type', '');
    const indexData = result(data, 'index', '');
    const stateFill = states.txTravelDetail;
    const defIndex = 99;
    const disable = result(stateFill, `${defIndex}` + '.disable', false);
    const checkEmpty = result(stateFill, `${defIndex}`, null);
    const formVal = result(stateFill, `${defIndex}` + '.formValues', {});

    const fullName = result(formVal, 'tittle.display', '-') + ' ' + result(formVal, 'firstName', '-') + ' ' + result(formVal, 'lastName', '-');
    const email = result(formVal, 'email', '-');
    const phone = result(formVal, 'phone', '-');
    const homePhone = result(formVal, 'homePhone', '-');

    return (
      <View key={k} >
        { (type === 'contact') ?
          <View onPress={this.txTravelDetail(indexData, type, isInternational)} style={styles.touchableContainer}>
            <View>
              <View style={styles.viewPurposeTittle}>
                <Text style={styles.textPurposeTittle}>{language.TX_TRAVEL_LIST_CONTACT_INFO}</Text>
                <View>
                  <Touchable onPress={this.txTravelDetail(indexData, type, isInternational)} >
                    <Text style={styles.editButton}>{language.TX_TRAVEL_LIST_EDIT}</Text>
                  </Touchable>
                </View>
              </View>
              {disable ? <Text style={styles.textPurposeWarning}>{language.TX_TRAVEL_LIST_COMPLITE_INFO}</Text> : null}
              { !isEmpty(checkEmpty) ?
                <View style={styles.containerListPassenger}>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_FULL_NAME}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{fullName}</Text>
                    </View>
                  </View>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_PHONE_NUMBER}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{phone}</Text>
                    </View>
                  </View>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_HOME_PHONE}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{homePhone}</Text>
                    </View>
                  </View>
                  <View style={styles.showFormKey}>
                    <View style={styles.showFormTittle}>
                      <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_EMAIL}</Text>
                    </View>
                    <View style={styles.showFormVal}>
                      <Text style={styles.formKeyText}>{email}</Text>
                    </View>
                  </View>
                </View>
                : null }
            </View>
          </View> : null }
        <View style={styles.greyLine}/>
      </View>
    );
  }

  render () {
    const {handleSubmit, states, dataBook} = this.props;
    const stateFill = states.txTravelDetail;
    const dataBookLength = dataBook.length;
    const stateFillLength = map(stateFill, (v, k) => k).length;
    const fillDisable = map(stateFill, (v) => result(v, 'disable', '1') ? 1 : 0);
    const disableButton = (stateFillLength === dataBookLength) && (fillDisable.indexOf(1) < 0);

    return (
      <View style={styles.outerContainer}>
        <View style={styles.rowProgress}>
          <View style={styles.redLine}/>
          <View style={styles.darkGreyLine}/>
        </View>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.scrollContainer}>
          <View>
            <View style={styles.bgWhite}>
              <Text style={styles.textTitle}>{language.TX_TRAVEL_LIST_PASSENGER_DETAIL}</Text>
              <View style={styles.showFormTittleContact}>
                <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_VALID_PASSPORT}</Text>
              </View>
              <View style={styles.greyLine}/>
              {dataBook.map(this.renderListPassenger)}
            </View>
            <View style={styles.greyLinePadding}/>
            <View style={styles.bgWhite}>
              <Text style={styles.textTitle}>{language.TX_TRAVEL_LIST_CONTACT_DETAIL}</Text>
              <View style={styles.showFormTittleContact}>
                <Text style={styles.formKeyTextTittle}>{language.TX_TRAVEL_LIST_PURPOSE_RESCHEDULE}</Text>
              </View>
              {dataBook.map(this.renderContactInfo)}
              <View style={styles.greyLine}/>
            </View>
          </View>
          <View style={styles.btnConfirm}>
            <SinarmasButton onPress={handleSubmit} disabled={!disableButton}>
              <Text style={styles.buttonLargeTextStyle}>{language.TX_TRAVEL_BTN_CONTINUE}</Text>
            </SinarmasButton>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default TxTravelDetailList;
