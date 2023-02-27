import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import RemittanceRecipientData from '../../components/FundTransferJourney/RemittanceRecipientData.component';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateInputAccNoRemittance} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {isEmpty} from 'lodash';
import {getCurrencyPurpose} from '../../state/thunks/fundTransfer.thunks';

const formConfig = {
  form: 'formRecipientData',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {formValues, navigation}) => {
    const bankInformation = result(navigation, 'state.params');
    dispatch(NavigationActions.navigate({routeName: 'RemittanceSenderData', params: {bankInformationData: bankInformation, recipientData: formValues}}));
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['payeeAccNo', 'currency', 'nameRecipient', 'countryRecipient', 'stateRecipient', 
        'adressRecipient', 'descriptionRecipient', 'purposeListRecipient']),
    };
    return {
      payeeAccNo: validateInputAccNoRemittance(values.payeeAccNo),
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.formRecipientData.values', {}),
  getCurrency: result(state, 'currencyPurposeRemittance.currency', []),
  getPurpose: result(state, 'currencyPurposeRemittance.purpose', []),
  profile: result(state, 'user.profile', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  getCurrencyRemittance: () => dispatch(getCurrencyPurpose()),
  goBack: () => {
    dispatch(NavigationActions.back());
  },
  setCountry: (currentCountry) => {
    dispatch(change('formRecipientData', 'countryRecipient', currentCountry));
  },
  setNameFill: (nameRecipientFill) => {
    dispatch(change('formRecipientData', 'nameRecipient', nameRecipientFill));
  },
  setAccNumber: (accNumberFill) => {
    dispatch(change('formRecipientData', 'payeeAccNo', accNumberFill));
  }
});

const RemittanceRecipientDataForm = reduxForm(formConfig)(RemittanceRecipientData);

class RemittanceRecipientDataPage extends React.Component {

  componentDidMount () {
    const {navigation, setCountry, setNameFill, profile, setAccNumber} = this.props;
    this.props.getCurrencyRemittance();
    const isExisting = result(navigation, 'state.params.isExisting', '') === true;
    const dataPayee = isExisting ? result(navigation, 'state.params.payee', {}) : result(navigation, 'state.params.bankInformation', {});
    const currentCountry = result(dataPayee, 'country', '');
    const nameRecipientFill = result(profile, 'name', '');
    const nameRecipientExisting = result(dataPayee, 'receiverName', '');
    const accNumberFill = result(dataPayee, 'accountNumber', '');
    setCountry(currentCountry);
    if (currentCountry === 'INDONESIA') {
      setNameFill(nameRecipientFill);
    } else {
      setNameFill(nameRecipientExisting);
    }
    isExisting ? setAccNumber(accNumberFill) : null;
  }
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    dispatch: PropTypes.func,
    getCurrency: PropTypes.array,
    getCurrencyRemittance: PropTypes.func,
    goBack: PropTypes.func,
    getPurpose: PropTypes.array,
    setCountry: PropTypes.func,
    setNameFill: PropTypes.func,
    profile: PropTypes.object,
    setAccNumber: PropTypes.func
  };

  goToBack= () => {
    this.props.goBack();
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('payeeAccNo' === typeField) {
      if (isEmpty(validateInputAccNoRemittance(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {accounts, formValues, navigation = {}, getCurrency, getPurpose} = this.props;
    const isEmptyPayeeAccNo = isEmpty(result(formValues, 'payeeAccNo', ''));
    const isEmptyCurrency = isEmpty(result(formValues, 'currency', []));
    const isEmptyNameRecipient = isEmpty(result(formValues, 'nameRecipient', ''));
    const isEmptyCountryRecipient = isEmpty(result(formValues, 'countryRecipient', ''));
    const isEmptyStateRecipient = isEmpty(result(formValues, 'stateRecipient', ''));
    const isEmptyAdressRecipient = isEmpty(result(formValues, 'adressRecipient', ''));
    const isEmptyPurposeRecipient = isEmpty(result(formValues, 'purposeListRecipient', []));
    const isEmptydescriptionRecipient = isEmpty(result(formValues, 'descriptionRecipient', ''));
    const requireField = isEmptyPayeeAccNo || isEmptyCurrency || isEmptyNameRecipient || isEmptyCountryRecipient || isEmptyStateRecipient || isEmptyAdressRecipient || isEmptyPurposeRecipient || isEmptydescriptionRecipient;
    return <RemittanceRecipientDataForm navigation={navigation} accounts={accounts} formValues={formValues}
      currencyList={getCurrency} goBack={this.goToBack} requireField={requireField} purposeList={getPurpose} validationInput={this.validationInput()}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceRecipientDataPage);
