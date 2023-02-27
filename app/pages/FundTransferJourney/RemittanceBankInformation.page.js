import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import RemittanceBankInformation from '../../components/FundTransferJourney/RemittanceBankInformation.component';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';

const formConfig = {
  form: 'formBankInformation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const swiftCode = result(navigation, 'state.params.bankInformation.swiftCode', '');
    const bankName = result(navigation, 'state.params.bankInformation.bankName', '');
    const country = result(navigation, 'state.params.bankInformation.country', '');
    const bankValue = {swiftCode, bankName, country};
    dispatch(NavigationActions.navigate({routeName: 'RemittanceRecipientData', params: {bankInformation: bankValue}}));
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.formBankInformation.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  setSwiftCode: (name, swiftCode) => {
    dispatch(change('formBankInformation', 'swiftCode', swiftCode));
  },
  setBankName: (name, bankName) => {
    dispatch(change('formBankInformation', 'bankName', bankName));
  },
  setCountry: (name, country) => {
    dispatch(change('formBankInformation', 'country', country));
  },
  goBack: () => {
    dispatch(NavigationActions.back());
  }
});

const RemittanceBankInformationForm = reduxForm(formConfig)(RemittanceBankInformation);

class RemittanceBankInformationPage extends React.Component {

  componentDidMount () {
    const {setSwiftCode, setBankName, setCountry, navigation} = this.props;
    const swiftCode = result(navigation, 'state.params.bankInformation.swiftCode', '');
    const bankName = result(navigation, 'state.params.bankInformation.bankName', '');
    const country = result(navigation, 'state.params.bankInformation.country', '');
    setSwiftCode('swiftCode', swiftCode);
    setBankName('bankName', bankName);
    setCountry('country', country);
  }
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    dispatch: PropTypes.func,
    setSwiftCode: PropTypes.func,
    setBankName: PropTypes.func,
    setCountry: PropTypes.func,
    goBack: PropTypes.func,
  };


  render () {
    const {accounts, formValues, navigation = {}, goBack} = this.props;
    return <RemittanceBankInformationForm navigation={navigation} accounts={accounts} formValues={formValues}
      goBack={goBack}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceBankInformationPage);
