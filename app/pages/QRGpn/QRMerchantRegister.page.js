import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import QRMerchantRegister from '../../components/QRGpn/QRMerchantRegister.component';
import {QRRegisterConfirmation} from '../../state/thunks/QRGpn.thunks';
import result from 'lodash/result';
import {getTransferPossibleShariaAccounts} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {validateRequiredFields, validateNumber, validatePostalCodeLength} from '../../utils/validator.util';

const formConfig = {
  form: 'QRMerchantRegister',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(QRRegisterConfirmation()),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['accountNo', 'merchantName', 'merchantPhone', 'merchantOwner', 'merchantAddress', 'merchantKelurahan', 'merchantKecamatan', 'merchantCity', 'merchantProv', 'postalCode', 'merchantKTP'])};
    return {
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleShariaAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRMerchantRegister.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (amount, params) => dispatch(triggerAuthNavigate('qrGPNRegister', amount, true, 'AuthDashboard', params)),
  setPasporWNA: () => {
    dispatch(change('QRMerchantRegister', 'merchantKTP', ''));
    dispatch(change('QRMerchantRegister', 'merchantPasporWNI', ''));
  },
  setPasporWNI: () => {
    dispatch(change('QRMerchantRegister', 'merchantPasporWNA', ''));
  },
  dispatch
});

const QRMerchantRegisterForm = reduxForm(formConfig)(QRMerchantRegister);

class QRMerchantRegisterPage extends React.Component {

  state = {
    wni: true,
    wna: false,
  }

  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantUserPage: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    setPasporWNI: PropTypes.string,
    setPasporWNA: PropTypes.string,
  };

  selectWNI = () => {
    const {setPasporWNI, dispatch} = this.props;
    dispatch(setPasporWNI);
    this.setState({wni: true, wna: false});
  }

  selectWNA = () => {
    const {setPasporWNA, dispatch} = this.props;
    dispatch(setPasporWNA);
    this.setState({wni: false, wna: true});
  }

  render () {
    const {wni, wna} = this.state;
    const {accounts, formValues, navigation = {}, QRMerchantUserPage} = this.props;
    return <QRMerchantRegisterForm navigation={navigation} wni={wni} wna={wna} selectWNI={this.selectWNI} selectWNA={this.selectWNA} QRMerchantUserPage={QRMerchantUserPage} accounts={accounts} formValues={formValues}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantRegisterPage);
