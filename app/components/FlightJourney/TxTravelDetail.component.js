import {View, Text, Keyboard} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TxTravelDetail.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Field} from 'redux-form';
import {SinarmasInput, SinarmasButton, SinarmasPickerLine, DatePicker, CheckBox} from '../FormComponents';
import {txTravelTittle, formatFieldAccount} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {result, startCase} from 'lodash';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import {change} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';
import {filterObjectsPasseger} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

class TxTravelDetail extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    saveDetail: PropTypes.func,
    navigation: PropTypes.object,
    destroyTxTravelDetail: PropTypes.func,
    submitting: PropTypes.bool,
    isContact: PropTypes.bool,
    initialValues: PropTypes.object,
    listPassenger: PropTypes.object,
    dispatch: PropTypes.func,
    ToTravelHistory: PropTypes.func,
    goToCountryIso: PropTypes.func,
    showSpin: PropTypes.func,
    hideSpin: PropTypes.func,
  }

  state = {
    showList: false,
    firstNameText: '',
    secondsRemaining2: 1,
    blurName: false,
  }

  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    const {destroyTxTravelDetail} = this.props;
    destroyTxTravelDetail();
    this.keyboardDidHideListener.remove();
    BackgroundTimer.clearInterval(this.interval);
    BackgroundTimer.clearInterval(this.interval2);
  }

  _keyboardDidHide=() => {
    this.setState({showList: false});
  }

  onSubmitData = () => {
    const {saveDetail, disabled, invalid, handleSubmit, navigation} = this.props;
    const tipe = result(navigation, 'state.params.type', '');
    const disable = disabled || invalid;
    handleSubmit();
    saveDetail(disable, tipe);
  }

  onFocusName = () => (b) => {
    b.length >= 1 ?
      this.setState({
        showList: true,
        firstNameText: b,
        blurName: true,
      })
      :
      this.setState({
        showList: false,
        firstNameText: b,
        blurName: false,
      });
  }

  onBlurName = () => () => {
    this.setState({
      showList: false,
    });
  }

  tick2 = (tipe) => () => {
    const {goToCountryIso, hideSpin} = this.props;
    this.setState({secondsRemaining2: this.state.secondsRemaining2 - 1});
    if (this.state.secondsRemaining2 <= 0) {
      goToCountryIso(tipe);
      BackgroundTimer.clearInterval(this.interval2);
      hideSpin();
      this.setState({secondsRemaining2: 1});
    }
  }

  onPressNationality = (tipe) => () => {
    const {showSpin} = this.props;
    showSpin();
    this.interval2 = BackgroundTimer.setInterval(this.tick2(tipe), 1000);
  }

  onSelectList = (data2) => {
    this.onBlurName();
    const {dispatch, navigation} = this.props;
    dispatch(actionCreators.showSpinner());
    const today = new Date();
    const newBd = result(data2, 'birthDate', '') ?  new Date(result(data2, 'birthDate', today)) : today;
    const newIdExp = result(data2, 'IdExpiry', '') ?  new Date(result(data2, 'IdExpiry', today)) : today;
    const newPassExp = result(data2, 'expiryPassport', '') ?  new Date(result(data2, 'expiryPassport', today)) : today;
    const isInternational = result(navigation, 'state.params.isInternational', '');
    dispatch(change('txTravelDetail', 'passengerId', String(result(data2, 'id', ''))));
    dispatch(change('txTravelDetail', 'tittle', {'name': startCase(result(data2, 'title', '')), 'display': startCase(result(data2, 'title', ''))}));
    dispatch(change('txTravelDetail', 'firstName', result(data2, 'firstName', '')));
    dispatch(change('txTravelDetail', 'lastName', result(data2, 'lastName', '')));
    dispatch(change('txTravelDetail', 'birthDate', newBd));
    dispatch(change('txTravelDetail', 'nationality', result(data2, 'nationality', '')));
    dispatch(change('txTravelDetail', 'phone', String(result(data2, 'mobilePhone', ''))));
    dispatch(change('txTravelDetail', 'homePhone', String(result(data2, 'homePhone', ''))));
    dispatch(change('txTravelDetail', 'email', result(data2, 'email', '')));
    dispatch(change('txTravelDetail', 'idNumber', String(result(data2, 'IdNumber', ''))));
    dispatch(change('txTravelDetail', 'IdExpiry', newIdExp));
    if (isInternational) {
      dispatch(change('txTravelDetail', 'passportNumber', String(result(data2, 'passportNumber', ''))));
      dispatch(change('txTravelDetail', 'coi', result(data2, 'coi', '')));
      dispatch(change('txTravelDetail', 'expiryPassport', newPassExp));
    }
    dispatch(actionCreators.hideSpinner());
    Keyboard.dismiss();
  };


  render () {
    const {navigation, invalid, submitting, isContact, initialValues, listPassenger, ToTravelHistory} = this.props;
    const tipe = result(navigation, 'state.params.type', '');
    const subTittle = tipe === 'contact' ? 'Contact detail' : startCase(result(navigation, 'state.params.type', '') + ' ' + result(navigation, 'state.params.index', ''));
    const today = new Date();
    const isInternational = result(navigation, 'state.params.isInternational', '');
    const setAsContact = result(initialValues, 'setAsContact', false);
    const listRecent = result(listPassenger, 'data.result', []);
    const listLength = filterObjectsPasseger(listRecent, this.state.firstNameText).length;
    const showHistory = false;
    let minDateBD = moment(today).format('YYYY-MM-DD');
    const initialTime = new Date(); 
    return (
      <View style={styles.containerWhite}>
        <KeyboardAwareScrollView style={styles.scrollWhite} keyboardShouldPersistTaps='handled' keyboardDismissMode={'on-drag'}>
          <View>
            <View style={styles.bgWhite}>
              <View>
                <View style={styles.showView}>
                  <View style={styles.tittleRow}>
                    <Text style={styles.textSubTittleLeft}>{subTittle}</Text>
                    {showHistory ?
                      <View>
                        <Touchable onPress={ToTravelHistory(tipe)}><Text style={styles.textSubTittleRight}>History</Text></Touchable>
                      </View>
                      : null }
                  </View>
                  <Field
                    name='tittle'
                    rightIcon='arrow'
                    component={SinarmasPickerLine}
                    placeholder={language.TX_TRAVEL_SELECT_TITTLE}
                    labelText={language.TX_TRAVEL_SELECT_TITTLE}
                    labelKey='display'
                    itemList={txTravelTittle()}
                  />
                </View>
                <Field
                  name='firstName'
                  label={language.TX_TRAVEL_FIRST_NAME}
                  placeholder={language.TX_TRAVEL_FIRST_NAME}
                  component={SinarmasInput}
                  maxLength={20}
                  onInputChange={this.onFocusName()}
                  whenBlur={this.onBlurName()}
                />
                {(listLength > 0) && (tipe !== 'contact') && (this.state.showList) && (this.state.blurName) ?
                  <View style={this.state.showList ? styles.qiuckPickListStyle : styles.qiuckPickListStyleHide}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' bounces={false}>
                      <QuickPickList
                        listOfItems={filterObjectsPasseger(listRecent, this.state.firstNameText)}
                        onSelect={this.onSelectList}
                        textKey='firstName'
                        listType='search'
                        style={styles.qiuckPickListScroll}
                      />
                    </KeyboardAwareScrollView>
                  </View>
                  : null
                }

                <View style={styles.showView}>
                  <Field
                    name='lastName'
                    label={language.TX_TRAVEL_LAST_NAME}
                    placeholder={language.TX_TRAVEL_LAST_NAME}
                    component={SinarmasInput}
                    maxLength={20}
                    whenFocus={this.onBlurName()}
                  />
                  { (tipe !== 'contact') ?
                    <View>
                      <Field
                        name='birthDate'
                        component={DatePicker}
                        label={language.TX_TRAVEL_SELECT_BIRTH_DATE}
                        placeholder={language.TX_TRAVEL_SELECT_BIRTH_DATE}
                        maximumDate={minDateBD}
                        errorType={'birthDate'}
                        date={initialTime} 
                      />
                      <View style={styles.pressCountryIso}>
                        <Touchable onPress={this.onPressNationality('nationality')}>
                          <Field
                            name='nationality'
                            label={language.TX_TRAVEL_NATIONALITY}
                            placeholder={language.TX_TRAVEL_NATIONALITY}
                            component={SinarmasInput}
                            disabled={true}
                          />
                        </Touchable>
                      </View>
                    </View> : <View/>}

                  { (tipe === 'adult') ?
                    <View>
                      <Field
                        name='idNumber'
                        label={language.TX_TRAVEL_ID_NUMBER}
                        placeholder={language.TX_TRAVEL_ID_NUMBER}
                        component={SinarmasInput}
                        keyboardType='numeric'
                        format={formatFieldAccount}
                        maxLength={16}
                        whenFocus={this.onBlurName()}
                      />
                      <Field
                        name='IdExpiry'
                        component={DatePicker}
                        label={language.TX_TRAVEL_EXPIRY_ID}
                        placeholder={language.TX_TRAVEL_EXPIRY_ID}
                        date={initialTime} 
                      />
                    </View> : <View/>}

                  { (tipe === 'adult') || (tipe === 'contact') ?
                    <View>
                      <Field
                        name='phone'
                        label={language.TX_TRAVEL_PHONE_NUMBER}
                        placeholder={language.TX_TRAVEL_PHONE_NUMBER}
                        component={SinarmasInput}
                        keyboardType='numeric'
                        format={formatFieldAccount}
                        maxLength={20}
                      />
                      <Field
                        name='homePhone'
                        label={language.TX_TRAVEL_HOME_PHONE}
                        placeholder={language.TX_TRAVEL_HOME_PHONE}
                        component={SinarmasInput}
                        keyboardType='numeric'
                        format={formatFieldAccount}
                        maxLength={20}
                      />
                      <Field
                        name='email'
                        label={language.TX_TRAVEL_EMAIL}
                        placeholder={language.TX_TRAVEL_EMAIL}
                        component={SinarmasInput}
                      />
                    </View> : <View/>}
                </View>
              </View>
              <View style={styles.showView}>
                { isInternational ?
                  <View>
                    <View style={styles.formField}>
                      <View style={styles.formFieldRow}>
                        <Field
                          name='passportNumber'
                          label={language.TX_TRAVEL_PASSPORT_NUMBER}
                          placeholder={language.TX_TRAVEL_PASSPORT_NUMBER}
                          component={SinarmasInput}
                          maxLength={20}
                        />
                      </View>
                      <View style={styles.formFieldRow}>
                        <View style={styles.pressCountryIso}>
                          <Touchable onPress={this.onPressNationality('coi')}>
                            <Field
                              name='coi'
                              label={language.TX_TRAVEL_COI}
                              placeholder={language.TX_TRAVEL_COI}
                              component={SinarmasInput}
                              disabled={true}
                            />
                          </Touchable>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Field
                        name='expiryPassport'
                        component={DatePicker}
                        label={language.TX_TRAVEL_EXPIRY_PASSPORT_DATE}
                        placeholder={language.TX_TRAVEL_EXPIRY_PASSPORT_DATE}
                        minimumDate={today}
                        date={initialTime} 
                      />
                    </View>
                  </View>
                  : null }
              </View>

              <View style={styles.showView}>
                { tipe === 'adult' ?
                  <View style={styles.rowCheckBox}>
                    <View style={styles.checkboxField}>
                      <View>
                        <Field
                          name='setAsContact'
                          label=''
                          component={CheckBox}
                          disabled={setAsContact ? false : isContact}
                        />
                      </View>
                    </View>
                    <Text style={styles.labelCheckBox}>{language.TX_TRAVEL_SET_AS_CONTACT}</Text>

                  </View>
                  : null }
                <View>
                  <Text style={styles.labelPurpose}>{language.TX_TRAVEL_PURPOSE_RESCHEDULE}</Text>
                </View>

              </View>
            </View>
            <View style={styles.showView}>
              <View style={styles.btnConfirm}>
                <View>
                  <SinarmasButton disabled={invalid || submitting} onPress={this.onSubmitData} text={language.TX_TRAVEL_BTN_SAVE}/>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default TxTravelDetail;
