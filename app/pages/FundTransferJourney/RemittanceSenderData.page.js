import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import RemittanceSenderData from '../../components/FundTransferJourney/RemittanceSenderData.component';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney, generatePayeeRemittance} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {getSenderRemittance, setupRemittanceTransfer} from '../../state/thunks/fundTransfer.thunks';
import {find} from 'lodash';

const formConfig = {
  form: 'formSenderData',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {formValues, navigation, payeeListRemittance}) => {
    const dataForm = result(navigation, 'state.params', {});
    // like existing
    const isExisting = result(dataForm, 'bankInformationData.isExisting', false);
    const payeeName = result(dataForm, 'recipientData.nameRecipient', '');
    const payeeAccNo = result(dataForm, 'recipientData.payeeAccNo', '');
    const bank = isExisting ? result(dataForm, 'bankInformationData.payee.bankName', '') : result(dataForm, 'bankInformationData.bankInformation.bankName', '');
    const payeeType = values.payeeType;
    const accNo = payeeAccNo;
    const payeeCurrency = result(dataForm, 'recipientData.currency.code', '');
    const ownEmoney = 'remmitance';
    const foundPayee = find(payeeListRemittance, {accountNumber: accNo});
    const payee = generatePayeeRemittance(accNo, payeeName, bank, payeeType, ownEmoney, payeeCurrency, dataForm, {senderData: formValues}, foundPayee);
    dispatch(setupRemittanceTransfer(payee));
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['nameSender', 'countrySender', 'stateSender', 'adressSender']),
    };
    return {
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.formSenderData.values', {}),
  provinceList: result(state, 'provinceList.4.name', ''),
  currentAddress: result(state, 'senderDataRemittance', {}),
  payeeList: result(state, 'payees', []),
  profile: result(state, 'user.profile', {}),
  payeeListRemittance: result(state, 'payeesRemittance', []),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  goBack: () => {
    dispatch(NavigationActions.back());
  },
  getSenderRemittance: () => {
    dispatch(getSenderRemittance());
  },
  setCountrytoClear: (currentCountry) => {
    dispatch(change('formSenderData', 'countrySender', currentCountry));
  },
  setCountrytoNull: () => {
    dispatch(change('formSenderData', 'countrySender', null));
  },
  setStatetoClear: (currentStateCity) => {
    dispatch(change('formSenderData', 'stateSender', currentStateCity));
  },
  setStatetoNull: () => {
    dispatch(change('formSenderData', 'stateSender', null));
  },
  setAddresstoClear: (currentAddressField) => {
    dispatch(change('formSenderData', 'adressSender', currentAddressField));
  },
  setAddresstoNull: () => {
    dispatch(change('formSenderData', 'adressSender', null));
  },
  setNameSender: (nameSender) => {
    dispatch(change('formSenderData', 'nameSender', nameSender));
  }
});

const RemittanceSenderDataForm = reduxForm(formConfig)(RemittanceSenderData);

class RemittanceSenderDataPage extends React.Component {

  componentDidMount () {
    const {profile, setNameSender} = this.props;
    const nameSender = result(profile, 'name', '');
    setNameSender(nameSender);
  }
  componentWillMount () {
    this.props.getSenderRemittance();
  }
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    toogleCheckbox: PropTypes.func,
    getSenderRemittance: PropTypes.func,
    provinceList: PropTypes.string,
    setCountrytoClear: PropTypes.func,
    setCountrytoNull: PropTypes.func,
    setStatetoClear: PropTypes.func,
    setStatetoNull: PropTypes.func,
    setAddresstoClear: PropTypes.func,
    setAddresstoNull: PropTypes.func,
    currentAddress: PropTypes.object,
    payeeList: PropTypes.array,
    profile: PropTypes.object,
    setNameSender: PropTypes.func,
    payeeListRemittance: PropTypes.array
  };

  state = {
    checked: false,
    disable: false
  }

  toogleCheckbox = (checked) => {
    const {setCountrytoClear, setCountrytoNull, setStatetoClear, setStatetoNull, setAddresstoClear, setAddresstoNull, currentAddress} = this.props;
    const currentCountry = result(currentAddress, 'currentCountry', 'Indonesia');
    const currentStateCity = result(currentAddress, 'currentCity', '');
    const currentAddressField = result(currentAddress, 'currentAddress', '');
    this.setState({checked, disable: checked});
    checked ? setCountrytoClear(currentCountry) : setCountrytoNull();
    checked ? setStatetoClear(currentStateCity) : setStatetoNull();
    checked ? setAddresstoClear(currentAddressField) : setAddresstoNull();
  }

  render () {
    const {accounts, formValues, navigation = {}, goBack, payeeList, payeeListRemittance} = this.props;
    return <RemittanceSenderDataForm navigation={navigation}
      accounts={accounts} formValues={formValues} goBack={goBack}
      checked={this.state.checked} toogleCheckbox={this.toogleCheckbox}
      payeeList={payeeList} payeeListRemittance={payeeListRemittance}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceSenderDataPage);
