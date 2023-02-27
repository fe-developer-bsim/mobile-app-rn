import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import AddNewParticipants, {fields} from '../../components/SplitBillJourney/AddNewParticipants.component.js';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateName, validatePhoneNumberSplitBill} from '../../utils/validator.util';
import {confirmSplitBillAddNew, goToYouBill, goToSplitBill} from '../../state/thunks/splitBill.thunks';
import Contacts from 'react-native-contacts';
import {map, result, sortBy, filter, size, isEmpty, upperFirst, uniqBy} from 'lodash';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import * as actionCreators from '../../state/actions/index.actions.js';
import {Toast} from '../../utils/RNHelpers.util';
import {language} from '../../config/language';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';
import {formatMobileNumberEmoney, getErrorMessage} from '../../utils/transformer.util';


let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

const formConfig = {
  form: 'SplitBillIndexForm2',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {selectedContacts, navConfirmation, dataTrx, validateStatus, isAddNewParticipants, formValuesConfirmation, valueSplitBillAddQR}) => {
    if (validateStatus) {
      dispatch(goToSplitBill(dataTrx, validateStatus));
    } else {
      const totalMember = selectedContacts.length;
      let validateMember;
      if (totalMember > 9) {
        validateMember = true;
      }
      dispatch(confirmSplitBillAddNew(selectedContacts, navConfirmation, isAddNewParticipants, formValuesConfirmation, validateMember, valueSplitBillAddQR));
    }
  },
};

const mapStateToProps = (state) => ({
  contacts: result(state, 'contacts', []),
  selectedContacts: result(state, 'saveListSelectedContacts', []),
  addContact: result(state, 'addContact', []),
  form: result(state, 'form.SplitBillIndexForm2.values'),
  getListSender: result(state, 'splitBillBySender', {}),
});
const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  dispatch,
  confirmSplitBillAuth: (selectedContact) => dispatch(confirmSplitBillAddNew(selectedContact)),
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  getYouBillData: () => {
    dispatch(goToYouBill());
  },
  setPhone: (name, phone) => {
    dispatch(change('SplitBillIndexForm2', fields.PHONE, phone));
  },
  setAlias: (name, givenName) => {
    dispatch(change('SplitBillIndexForm2', fields.ALIAS, givenName));
  },
});

const SplitBillIndexForm2 = reduxForm(formConfig)(AddNewParticipants);

class AddNewParticipantsPage extends React.Component {

  state = {
    contacts: [],
    selectedContacts: [],
    phone: '',
    givenName: '',
    sortedContacts: [],
  }

  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    selectedContacts: PropTypes.object,
    contacts: PropTypes.array,
    form: PropTypes.object,
    getYouBillData: PropTypes.func,
    getListSender: PropTypes.object,
    setPhone: PropTypes.func,
    setAlias: PropTypes.func,
  };
  
  changeCheck = (selectContacts, paramsSelectedContacts) => () => {
    const {dispatch, contacts, getListSender, selectedContacts} = this.props;
    const userMobileNumber = result(getListSender, 'res.data.uMobileNumber');
    const phoneNumber = result(selectContacts, 'phoneNumbers.0.number');
    const isMobileNumber = validatePhoneNumberSplitBill(formatMobileNumberEmoney(phoneNumber));
    let validateMobileNumber;
    if (isMobileNumber) {
      validateMobileNumber = true;
    }
    let validateDuplicate;
    selectedContacts.map((value) => {
      const checkType = result(value, 'type', '');
      if (checkType === 'manual') {
        const mobileSelectedContacts = formatMobileNumberEmoney(result(value, 'phoneNumber', ''));
        if (mobileSelectedContacts === formatMobileNumberEmoney(phoneNumber)) {
          validateDuplicate = true;
        }
      } else {
        const recordIdString = result(selectContacts, 'recordID', '');
        const recordIdStringDuplicate = result(value, 'recordID', '');
        const mobileSelectedContacts = formatMobileNumberEmoney(result(value, 'phoneNumbers.0.number', ''));
        if (recordIdString !== recordIdStringDuplicate && mobileSelectedContacts === formatMobileNumberEmoney(phoneNumber)) {
          validateDuplicate = true;
        }
      }
    });
    let check = result(selectContacts, 'check', false);
    if (formatMobileNumberEmoney(phoneNumber) !== formatMobileNumberEmoney(userMobileNumber) && !validateDuplicate && !validateMobileNumber) {
      const recordIdString = result(selectContacts, 'recordID', '');
      const filterContact = filter(contacts, function (o) {
        const recordIdStringContact = result(o, 'recordID', ''); 
        return recordIdStringContact !== recordIdString; 
      });
      selectContacts.check = !check;
      this.selectedContact(paramsSelectedContacts);
      dispatch(actionCreators.saveContacts([...filterContact, selectContacts]));
    } else if (validateMobileNumber) {
      Toast.show(isMobileNumber);
    } else {
      Toast.show(language.SPLITBILL__DUPLICATE_CONTACT);
    }
  }

  selectedContact = () => {
    const {contacts, selectedContacts, dispatch} = this.props;
    let selected = [];
    map(contacts, (contact) => {
      const check = result(contact, 'check', false);
      if (check) {
        selected = [...selected, contact];
      }
    });
    const newSelected = selectedContacts.concat(selected);
    let newArray = [];
    map(newSelected, (value) => {
      const check = result(value, 'check', false);
      if (check) {
        newArray = newSelected.filter((item, index) => newSelected.indexOf(item) === index);
      }
    });
    let finallSelected = [];
    map(newArray, (contactArray) => {
      const check = result(contactArray, 'check', false);
      if (check) {
        finallSelected = [...finallSelected, contactArray];
      }
    });
    dispatch(actionCreators.saveListSelectedContacts(finallSelected));
    const validateMember10 = finallSelected.length;
    if (validateMember10 > 9) {
      Toast.show(getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT), Toast.LONG);
    }
  }

  permission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).
        then((status) => {
          if ([PermissionsAndroid.RESULTS.GRANTED, true].includes(status)) {
            this.getAllContact();
          } else {
            Toast.show(language.PERMISSION_ERROR__CONTACTS);
          }
        }).catch(() => {
          Toast.show(language.PERMISSION_ERROR__CONTACTS);
        });
    } else {
      Permissions.check('ios.permission.CONTACTS').then((response) => {
        if (response === 'granted') {
          this.getAllContact();
        } else {
          Permissions.request('ios.permission.CONTACTS').then((response) => {
            if (response === 'granted') {
              this.getAllContact();
            } else {
              Toast.show(language.PERMISSION_ERROR__CONTACTS);
              return Promise.resolve();
            }
          });
        }
      });
    }
  }

  getAllContact = () => {
    const {dispatch} = this.props;
    dispatch(actionCreators.showSpinner());
    Contacts.getAll((err, contacts) => {
      contacts.map((info) => {
        info.check = false;
        return contacts;
      });
      const sortedContacts = sortBy(contacts, 'givenName');
      const filterNoPhoneNumber = filter(sortedContacts, function (value) {
        const noPhoneNumber = result(value, 'phoneNumbers', []);
        return !isEmpty(noPhoneNumber); 
      });
      const dataContacts = uniqBy(filterNoPhoneNumber, 'phoneNumbers.0.number');
      dispatch(actionCreators.saveContacts(dataContacts));
      dispatch(actionCreators.hideSpinner());
    });
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('givenName' === typeField) {
      if (isEmpty(validateName(val))) {
        return true;
      } else {
        return false;
      }
    }
    if ('phone' === typeField) {
      if (isEmpty(validatePhoneNumberSplitBill(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  onChangePhoneField = (phone) => {
    this.setState({phone: phone});
  }
  
  onChangeAliasField = (givenName) => {
    this.setState({givenName: givenName});
  }

  addContactManually = (validateMember) => {
    const {dispatch, form, selectedContacts, getListSender, setPhone, setAlias} = this.props;
    const phoneNumber = result(form, 'phone', '');
    const givenName = result(form, 'givenName', '');
    const filterContact = filter(selectedContacts, function (o) {
      const type = result(o, 'type', 'phoneMemory'); 
      const phonecontact = result(o, 'phoneNumber', '');
      return type === 'manual' && phonecontact === phoneNumber; 
    });
    const userMobileNumber = result(getListSender, 'res.data.uMobileNumber');
    let validateDuplicate;
    selectedContacts.map((value) => {
      const mobileSelectedContacts = formatMobileNumberEmoney(result(value, 'phoneNumbers.0.number', ''));
      if (mobileSelectedContacts === formatMobileNumberEmoney(phoneNumber)) {
        validateDuplicate = true;
      }
    });
    if (size(filterContact) === 0) {
      const objPhone = {
        phoneNumber, 
        givenName,
        type: 'manual',
        check: true
      };
      if (formatMobileNumberEmoney(phoneNumber) !== formatMobileNumberEmoney(userMobileNumber)) {
        if (!validateDuplicate) {
          const selected = [...selectedContacts, objPhone];
          dispatch(actionCreators.saveListSelectedContacts(selected));
          setTimeout(() => {
            Toast.show((givenName + language.SPLITBILL__ADD_MEMBER_SUCCESS), Toast.LONG);
          }, 100);
        } else if (validateMember) {
          Toast.show(getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT), Toast.LONG);
        } else {
          Toast.show(language.SPLITBILL__DUPLICATE_CONTACT);
        }  
      } else {
        Toast.show(language.SPLITBILL__DUPLICATE_CONTACT);
      }
    } else {
      Toast.show(language.SPLITBILL__DUPLICATE_CONTACT);
    }
    setPhone('phone', '');
    setAlias('givenName', '');
  }

  deleting = (selectContacts) => () => {
    const {dispatch, contacts} = this.props;
    let check = result(selectContacts, 'check', false);
    const recordIdString = result(selectContacts, 'recordID', '');
    const filterContact = filter(contacts, function (o) {
      const recordIdStringContact = result(o, 'recordID', ''); 
      return recordIdStringContact !== recordIdString; 
    });
    selectContacts.check = !check;
    const typeManually = result(selectContacts, 'type', '');
    if (typeManually !== 'manual') {
      const deleteSelected = selectContacts;
      dispatch(actionCreators.saveContacts([...filterContact, deleteSelected]));
    } 
    this.selectedContactdelete(recordIdString);
  }
  
  selectedContactdelete = () => {
    const {contacts, dispatch, selectedContacts} = this.props;
    let selected = [];
    map(contacts, (contact) => {
      const check = result(contact, 'check', true);
      if (check) {
        selected = [...selected, contact];
      }
    });
    const newSelected = selectedContacts.concat(selected);
    let newArray = [];
    map(newSelected, (value) => {
      const check = result(value, 'check', true);
      if (check) {
        newArray = newSelected.filter((item, index) => newSelected.indexOf(item) === index);
      }
    });
    let finallSelected = [];
    map(newArray, (contactArray) => {
      const check = result(contactArray, 'check', true);
      if (check) {
        finallSelected = [...finallSelected, contactArray];
      }
    });
    dispatch(actionCreators.saveListSelectedContacts(finallSelected));

  }

  deleteAll = (sortingFilterAddNew) => () => {
    const {dispatch} = this.props;
    dispatch(actionCreators.clearListSelectedContacts());
    let newContactFilter = [];
    map(sortingFilterAddNew, (value) => {
      value.check = false;
      newContactFilter = [...newContactFilter, value];
    });
    dispatch(actionCreators.saveContacts(newContactFilter));
  }

  componentWillMount () {
    this.permission();
    this.props.getYouBillData();
  }
  updateSelectedContacts = (newContacts = []) => {
    this.setState({
      selectedContacts: newContacts
    });
    const {dispatch} = this.props;
    dispatch(actionCreators.saveListSelectedContacts(newContacts));
    
  }
  componentDidMount () {
    const {dispatch, navigation} = this.props;
    dispatch(actionCreators.clearSelectedContacts());
    const paramsSelectedContacts = result(navigation, 'state.params.select', []);
    if (!isEmpty(paramsSelectedContacts)) {
      dispatch(actionCreators.saveListSelectedContacts(paramsSelectedContacts));
    }
  }
  
  render () {
    const {phone, givenName} = this.state;
    const {accounts, formValues, navigation, contacts, selectedContacts, form, getListSender} = this.props;
    const paramsSelectedContacts = result(navigation, 'state.params.select', []);
    const isAddNewParticipants = result(navigation, 'state.params.isAddNewParticipants');
    const formValuesConfirmation = result(navigation, 'state.params.formValuesConfirmation', []);
    const valueSplitBillAddQR = result(navigation, 'state.params.valueSplitBillQR', []);
    const navConfirmation = result(navigation, 'state.params', []);
    const sortingContact = sortBy(contacts, 'displayName');
    sortingContact.map((value) => {
      value['displayName'] = upperFirst(result(value, 'displayName', ''));
    });
    const sortingSelectContact = sortBy(selectedContacts, 'displayName');
    const givenNameValue = result(form, 'givenName', '');
    const phoneValue = result(form, 'phone', '');
    const validateGivenName = isEmpty(givenNameValue);
    const IdentifyPhoneNumber = validatePhoneNumberSplitBill(phoneValue);
    const validatePhone = isEmpty(phoneValue);
    let phoneNotValid;
    if (IdentifyPhoneNumber && !validatePhone) {
      phoneNotValid = true;
    }
    const data = result(getListSender, 'res.data', '');
    const {InvoiceList = {}} = data;
    const getPending = filter(InvoiceList, {status: 'Pending'});
    const getPartiallyPaid = filter(InvoiceList, {status: 'Partially Paid'});
    const totalPending = getPending.length;
    const totalPartiallyPaid = getPartiallyPaid.length;
    let validateStatus;
    if (totalPending + totalPartiallyPaid >= 5) {
      validateStatus = true;
    }
    return <SplitBillIndexForm2 navConfirmation={navConfirmation} contacts={sortingContact} selectedContacts={sortingSelectContact} 
      changeCheck={this.changeCheck}  accounts={accounts} formValues={formValues} phone={phone} givenName={givenName} 
      onChangeAliasField={this.onChangeAliasField} onChangePhoneField={this.onChangePhoneField} addContact={this.addContactManually} 
      updateSelectedContacts={this.updateSelectedContacts} deleting={this.deleting} deleteAll={this.deleteAll} selectedRecord={this.state.selectedRecord}
      validateGivenName={validateGivenName} validatePhone={validatePhone} IdentifyPhoneNumber={IdentifyPhoneNumber} phoneNotValid={phoneNotValid}
      validateStatus={validateStatus} paramsSelectedContacts={paramsSelectedContacts} isAddNewParticipants={isAddNewParticipants} formValuesConfirmation={formValuesConfirmation}
      valueSplitBillAddQR={valueSplitBillAddQR} validationInput={this.validationInput}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewParticipantsPage);
