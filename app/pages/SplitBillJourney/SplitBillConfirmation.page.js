/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import SplitBillConfirmationComponent, {fields} from '../../components/SplitBillJourney/SplitBillConfirmation.component';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateNumber, validateAlphanumeric, validateMaxBalanceEmoney} from '../../utils/validator.util';
import {generateStatementReceipt, popupSplitBillConfirmation, popupSplitBillConfirmationEqual} from '../../state/thunks/splitBill.thunks';
import {isEmpty, result, sortBy, upperFirst, startsWith} from 'lodash';
import {getTransferPossibleAccounts, removeDot, currencyFormatter, formatMobileNumberEmoney, getErrorMessage} from '../../utils/transformer.util';
import ImagePicker from 'react-native-image-picker';
import {Toast} from '../../utils/RNHelpers.util.js';
import {hideSpinner, saveNewParticipants} from '../../state/actions/index.actions.js';
import {NavigationActions} from 'react-navigation';
import {refreshStorageNew} from '../../state/thunks/common.thunks';
import {getBalanceEmoneyBeforeLogin} from '../../state/thunks/onboarding.thunks';
import {language} from '../../config/language';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {Platform} from 'react-native';

const formConfig = {
  form: 'SplitBillConfirmation',
  destroyOnUnmount: true,
  validate: (values, props) => {
    const allAccount = result(props, 'balanceEmoney', '');
    let filteredAccounts = [];
    allAccount.forEach((account) => {
      const accountType = result(account, 'accountType', '');
      if (accountType === 'emoneyAccount') {
        filteredAccounts.push(account);
      }
    });
    const balanceEmoney = result(filteredAccounts, '0.balances.availableBalance', '');
    const amountBefore = result(values, 'amount', '');
    const amount = removeDot(amountBefore);
    let errors = {
      ...validateRequiredFields(values, [fields.AMOUNT, fields.DESCRIPTION, fields.DESTINATION_ACCOUNT, fields.MEMBER]),
    };
    return {
      ...errors,
      errorBalance: validateMaxBalanceEmoney(amount, balanceEmoney),
    };
  }
};

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.SplitBillConfirmation.values', {}),
  addNewParticipantsValue: result(state, 'saveListSelectedContacts', []),
  selectedContacts: !isEmpty(result(state, 'saveListSelectedContacts', [])) ? result(state, 'saveListSelectedContacts', []) : result(state, 'selectedContacts', []),
  balanceEmoney: result(state, 'accounts', ''),
  getListSender: result(state, 'splitBillBySender', {}),
  getValueBillNew: result(state, 'saveValueBillNew', []),
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (splitbill, params) => dispatch(triggerAuthNavigate(splitbill, null, false, 'AuthDashboard', params)),
  goCreateSplitBillEqual: (formValues, total, newContact, finalImage) => {
    dispatch(popupSplitBillConfirmationEqual(formValues, total, newContact, finalImage));
  },
  goCreateSplitBill: (formValues, billIndex, finalImage) => {
    dispatch(popupSplitBillConfirmation(formValues, billIndex, finalImage));
  },
  changeAccount: (accounts) => {
    dispatch(change('SplitBillConfirmation', fields.DESTINATION_ACCOUNT, accounts));
  },
  changeReceiptBill: (namePhoto, base64Photo) => {
    dispatch(change('SplitBillConfirmation', fields.RECEIPT, namePhoto));
    dispatch(change('SplitBillConfirmation', 'base64Receipt', base64Photo));
  },
  fillOwnBill: () => {
    dispatch(change('SplitBillConfirmation', 'member', '0'));
  },
  goBackAddParticipant: (selectedContactAddNew, isAddNewParticipants, formValuesConfirmation, valueSplitBillQR) => {
    dispatch(saveNewParticipants('ADD_NEW'));
    dispatch(NavigationActions.navigate({routeName: 'AddNewParticipants', params: {select: selectedContactAddNew, isAddNewParticipants: isAddNewParticipants, formValuesConfirmation, valueSplitBillQR: valueSplitBillQR}}));
  },
  hideSpinner: () => dispatch(hideSpinner()),
  setImageData: (data) => dispatch(generateStatementReceipt(result(data, 'fieldName', ''), result(data, 'stringData', ''))),
  getBalanceEmoney: () => {
    dispatch(refreshStorageNew());
  },
  setAmount: (amount) => {
    dispatch(change('SplitBillConfirmation', fields.AMOUNT, amount));
  },
  updateEmoneyBalance: () => dispatch(getBalanceEmoneyBeforeLogin()),
});


const SplitBillConfirmationForm = reduxForm(formConfig)(SplitBillConfirmationComponent);

class SplitBillConfirmationPage extends React.Component {

  state = {
    contacts: [],
    selectedContacts: [],
    amount: '',
    member: '',
    receiptBill: {},
    billIndex: [],
    imageData: {},
    pathImage: '',
    finalImage: ''
  }

  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    selectedContacts: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    changeAccount: PropTypes.func,
    selectInput: PropTypes.func,
    setImageData: PropTypes.func,
    popupSplitBillConfirmation: PropTypes.func,
    goBackAddParticipant: PropTypes.func,
    goCreateSplitBill: PropTypes.func,
    changeReceiptBill: PropTypes.func,
    goCreateSplitBillEqual: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    balanceEmoney: PropTypes.string,
    getListSender: PropTypes.object,
    setAmount: PropTypes.func,
    setAmountAddNew: PropTypes.func,
    setDestinationAcc: PropTypes.func,
    setDescription: PropTypes.func,
    setReceipt: PropTypes.func,
    cif: PropTypes.string,
    updateEmoneyBalance: PropTypes.func,
    getValueBillNew: PropTypes.array,
    fillOwnBill: PropTypes.func,
    imageData: PropTypes.object
  };

  resizeImageEqual = () => {
    const {imageData} = this.state;
    const path = Platform.OS === 'ios' ? result(imageData, 'uri', '') : result(imageData, 'path', '');    const maxWidth = 1000;
    const maxHeight = 1000;
    const compressFormat = 'JPEG';
    const quality = 100;
    const rotation = 0;
    if (!isEmpty(imageData)) {
      ImageResizer.createResizedImage(path, maxWidth, maxHeight, compressFormat, quality, rotation).then((response) => {
        const imagePath = Platform.OS === 'ios' ? result(response, 'uri', '') : result(response, 'path', '');
        RNFS.readFile(imagePath, 'base64').
          then((res) => {
            this.createBillEqual(res);
          });
      }).catch(() => {
      });
    } else {
      this.createBillEqual();
    }
    
  }

  createBillEqual = (finalImage) => {
    const {formValues, goCreateSplitBillEqual, navigation, getListSender} = this.props;
    const amount = result(formValues, 'amount', '');
    const hasil = removeDot(amount);
    const data = result(getListSender, 'res.data', '');
    const displayNameBefore = result(data, 'uName', '');
    const displayName = upperFirst(displayNameBefore.toLowerCase());
    const number = result(data, 'uMobileNumber', '');
    const phoneNumbers = [{number}];
    const userAccount = {displayName, phoneNumbers};
    const selectedContactsBefore = result(navigation, 'state.params.contacts', {});
    const selectedContacts = [...selectedContactsBefore, userAccount];
    const total1 = hasil / selectedContacts.length;
    const total = currencyFormatter(total1);
    let Nama = '';
    let mobileNumber = '';
    let newContact = [];
    selectedContacts.forEach((element) => {
      const type = result(element, 'type', '');
      if (type === 'manual') {
        const NamaBefore = result(element, 'givenName', '');
        Nama = upperFirst(NamaBefore);
        mobileNumber = formatMobileNumberEmoney(result(element, 'phoneNumber', ''));
        const newContactBefore = [...newContact, {Nama, mobileNumber}];
        newContact = sortBy(newContactBefore, 'Nama');
      } else {
        Nama = result(element, 'displayName', '');
        mobileNumber = formatMobileNumberEmoney(result(element, 'phoneNumbers.0.number', ''));
        const newContactBefore = [...newContact, {Nama, mobileNumber}];
        newContact = sortBy(newContactBefore, 'Nama');
      }
    });
    goCreateSplitBillEqual(formValues, total, newContact, finalImage);
  }
  
  resizeImageAmount = (billIndex) => {
    const {imageData} = this.state;
    const path = Platform.OS === 'ios' ? result(imageData, 'uri', '') : result(imageData, 'path', '');    
    const maxWidth = 1000;
    const maxHeight = 1000;
    const compressFormat = 'JPEG';
    const quality = 100;
    const rotation = 0;
    if (!isEmpty(imageData)) {
      ImageResizer.createResizedImage(path, maxWidth, maxHeight, compressFormat, quality, rotation).then((response) => {
        const imagePath = Platform.OS === 'ios' ? result(response, 'uri', '') : result(response, 'path', '');
        RNFS.readFile(imagePath, 'base64').
          then((res) => {
            this.createBill(billIndex, res);
          });
      }).catch(() => {
      });
    } else {
      this.createBill(billIndex);
    }
    
  }

  createBill = (billIndex, finalImage) => {
    const {formValues, goCreateSplitBill} = this.props;
    goCreateSplitBill(formValues, billIndex, finalImage);
  }
  
  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('description' === typeField) {
      if (isEmpty(validateAlphanumeric(val))) {
        return true;
      } else {
        return false;
      }
    }  
  }

  onChangeMemberField = (member) => {
    this.setState({member: member});
  }
  componentWillMount () {
    this.props.getBalanceEmoney();
  }

  selectInput = () => () => {
    const {changeReceiptBill} = this.props;
    ImagePicker.showImagePicker({}, (response) => {
      const isError = response.hasOwnProperty('error');
      if (isError) {
        Toast.show('Go to settings, allow Simobi+ to access device camera', Toast.LONG);
      }  else if (response.didCancel) {
        return Promise.resolve();
      } else {
        changeReceiptBill(result(response, 'fileName', '') ? result(response, 'fileName', '') : result(response, 'uri', ''), result(response, 'data', ''));
        this.setState({imageData: response});
      }
    });
  }
  addNewParticipants = (validateMember) => () => {
    const {goBackAddParticipant, navigation, formValues} = this.props;
    const selectedContactAddNew = result(navigation, 'state.params.contacts', {});
    const isAddNewParticipants = true;
    const formValuesConfirmation = formValues;
    const navQRforSplitBill = result(navigation, 'state.params', {});
    const valueSplitBillQR = result(navQRforSplitBill, 'valueBillPay.isFromQrPayment');
    if (validateMember) {
      Toast.show(getErrorMessage(language.SPLITBILL_LIMIT_SELECTED_CONTACT__ALERT), Toast.LONG);
      goBackAddParticipant(selectedContactAddNew, isAddNewParticipants, formValuesConfirmation, valueSplitBillQR);
    } else {
      goBackAddParticipant(selectedContactAddNew, isAddNewParticipants, formValuesConfirmation, valueSplitBillQR);
    }
  }

  componentDidMount () {
    const {navigation, setAmount} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const splitBillAmount = result(navParams, 'valueBillPay.amount', '');
    const isSplitBill = result(navParams, 'valueBillPay.isSplitBill', '');
    const amount = splitBillAmount !== null ? splitBillAmount : null;
    const favAmount = amount === null ? '' : amount.toString();
    if (isSplitBill) {
      setAmount(favAmount);
    }
  }

  render () {
    const {accounts, formValues, navigation = {}, balanceEmoney, getListSender, dispatch, getValueBillNew, cif, fillOwnBill, updateEmoneyBalance} = this.props;
    const {member, receiptBill} = this.state;
    const amount = result(formValues, 'amount', '');
    const data = result(getListSender, 'res.data', '');
    const givenNameBefore = result(data, 'uName', '');
    const displayName = upperFirst(givenNameBefore.toLowerCase());
    const number = result(data, 'uMobileNumber', '');
    const phoneNumbers = [{number}];
    const userAccount = {displayName, phoneNumbers, user: 'user'};
    const hasil = removeDot(amount);
    const selectedContactsBefore = result(navigation, 'state.params.contacts', {});
    selectedContactsBefore.map((value) => {
      const typeContact = result(value, 'type', '');
      if (typeContact === 'manual') {
        value['displayName'] = upperFirst(result(value, 'givenName', ''));
      }
    });
    const selectedContactsSort = [...selectedContactsBefore, userAccount];
    const selectedContacts = sortBy(selectedContactsSort, 'displayName');
    const total = hasil / selectedContacts.length;
    const isEmptyDescription = isEmpty(result(formValues, 'description', ''));
    const isEmptyDestinationAcc = isEmpty(result(formValues, 'destinationAccount', ''));
    const errors = hasil < 10000 && !isEmpty(hasil);
    const errorsMax = hasil > 10000000;
    const destinationAccount = result(formValues, 'destinationAccount.accountType', '');
    let filteredAccounts = [];
    balanceEmoney.forEach((account) => {
      const accountType = result(account, 'accountType', '');
      if (accountType === 'emoneyAccount') {
        filteredAccounts.push(account);
      }
    });
    const balanceEmoneyValidate = result(filteredAccounts, '0.balances.availableBalance', '');
    const amountEmoney = removeDot(amount);
    let errorBalance;
    if (destinationAccount === 'emoneyAccount') {
      const valueAmount = parseFloat(amountEmoney);
      const valueEmoney = parseFloat(balanceEmoneyValidate);
      const isValidBalance = valueAmount + valueEmoney;
      const isKyc = !startsWith(cif, 'NK');
      if (isKyc === false) {
        if (isValidBalance > 2000000) {
          errorBalance = true;
        }
      } else {
        if (isValidBalance > 10000000) {
          errorBalance = true;
        }
      }
    }
    const valueBillPay = result(navigation, 'state.params.valueBillPay', '');
    const valueSplitBillQR = result(valueBillPay, 'isFromQrPayment');
    const valueSplitBillAddQR = result(valueBillPay, 'valueSplitBillQR');
    const {imageData} = this.state;
    return <SplitBillConfirmationForm navigation={navigation} selectedContacts={selectedContacts} formValues={formValues} accounts={accounts} validationInput={this.validationInput} 
      amount={amount} total={total} onChangeMemberField={this.onChangeMemberField} member={member} selectInput={this.selectInput}
      receiptBill={receiptBill} addNewParticipants={this.addNewParticipants} fillOwnBill={fillOwnBill} imageData={imageData}
      goCreateSplitBill={this.goCreateSplitBill} createBill={this.resizeImageAmount} updateEmoneyBalance={updateEmoneyBalance}
      indexBill={this.state.indexBill} createBillEqual={this.resizeImageEqual} errors={errors} isEmptyDescription={isEmptyDescription}
      hasilTotal={hasil} balanceEmoney={balanceEmoney} dispatch={dispatch} errorsMax={errorsMax} errorBalance={errorBalance} isEmptyDestinationAcc={isEmptyDestinationAcc}
      dataUser={userAccount} valueBillPay={valueBillPay} getValueBillNew={getValueBillNew} cif={cif} valueSplitBillQR={valueSplitBillQR} valueSplitBillAddQR={valueSplitBillAddQR}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitBillConfirmationPage);
