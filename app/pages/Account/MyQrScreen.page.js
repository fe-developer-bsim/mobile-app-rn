import React from 'react';
import PropTypes from 'prop-types';
import MyQrScreen from '../../components/Account/MyQrScreen.component.js';
import {connect} from 'react-redux';
import {validateRequiredFields} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney, getUnformattedAccountAmount, toTLVs, makeTlv, removeComma, getAllAccountsExcept} from '../../utils/transformer.util';
import * as actionCreators from '../../state/actions/index.actions.js';
import {goToShowQR} from '../../state/thunks/qrpayment.thunk';
import isEmpty from 'lodash/isEmpty';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'MyQRCPMForm',
  destroyOnUnmount: false,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['accountNo', 'amount']),
    };
    return {
      errors
    };
  },
  onSubmit: (values, dispatch, {toQrShow}) => {
    const params = {onSubmit: toQrShow, amount: 0, isOtp: false};
    dispatch(triggerAuthNavigate('lkd', 0, true, 'Auth', params));
  },
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.MyQRCPMForm.values', {}),
  accNo: result(state, 'form.MyQRCPMForm.values.accountNo.accountNumber', {}),
  savingAccounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft'),
  dataNewQR: result(state, 'generateCodeTag', {}),
  isVisible: result(state, 'usernameAvailability.isVisible', {})
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (data) => {
    dispatch(data);
  },
  changeAccount: (acc) => {
    dispatch(change('MyQRCPMForm', 'accountNo', acc));
  },
  goToShowQr: (data) => {
    dispatch(goToShowQR(data));
  },
  clearCPM: () => dispatch(actionCreators.saveQRTag63({data: [], dataQR: [], isNewQR: [], isGenerated: true})),
  clearGenerated: (data, dataQR, isNewQR, generated, countGenerated) => dispatch(actionCreators.saveQRTag63({data: data, dataQR: dataQR, isNewQR: isNewQR, isGenerated: generated, addGeneartedTotal: countGenerated})),
});

const DecoratedTdForm = reduxForm(formConfig)(MyQrScreen);

class MyQrScreenPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    accNo: PropTypes.string,
    savingAccounts: PropTypes.array,
    dispatch: PropTypes.func,
    changeAccount: PropTypes.func,
    dataNewQR: PropTypes.object,
    isVisible: PropTypes.object,
    toQrShow: PropTypes.func,
    goToShowQr: PropTypes.func,
    clearCPM: PropTypes.func,
    clearGenerated: PropTypes.func,
  }

  state = {
    qrVal: {},
    showQR: true,
    showPopupQR: false,
    showCountdown: 0,
  }

  componentWillMount = () => {
    const {changeAccount, savingAccounts, navigation, dataNewQR} = this.props;
    const isNewQR = result(dataNewQR, 'dataNewQR', false);
    const accNumber = isNewQR === true ? result(dataNewQR, 'dataQR', {}) : result(navigation, 'state.params.dataQR', {});
    const acc = isEmpty(accNumber) ? savingAccounts[0] : accNumber;
    const displayFirst = result(acc, 'accountNumber', '--') + ' • ' + result(acc, 'productType', '--') + ' • ' + result(acc, 'name', '--');
    changeAccount({...acc, 'display': displayFirst});
  }

  updateQRVal = (key) => (acc) => {
    this.setState({showQR: false});
    const {navigation, savingAccounts} = this.props;
    let data = result(navigation, 'state.params.data', {});
    let val = '';
    let idTag = '';
    let dataCpan = result(navigation, 'state.params.data.26', '');

    if (key === 'amount') {
      val = val.length > 0 ? removeComma(acc) : '';
      data['54'] = val;
    } else if (key === 'accNo') {
      val = result(acc, 'accountNumber', '');
      idTag = String(result(acc, 'id', ''));
      dataCpan['01'] = val;
      dataCpan['02'] = idTag;
      data['26'] = dataCpan;
    } else {
      val = result(savingAccounts[0], 'accountNumber', '');
      idTag = String(result(savingAccounts[0], 'id', ''));
      dataCpan['01'] = val;
      dataCpan['02'] = idTag;
      data['26'] = dataCpan;
    }

    const tlvRes = toTLVs(data);
    const hasil = makeTlv(tlvRes);
    this.setState({qrVal: hasil});
    this.setState({showQR: true});
  }

  showPopupQR = (data) => {
    const {dispatch} = this.props;
    this.setState({showPopupQR: true});

    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
      this.setState({showPopupQR: false});
    };
    const modalOptions = {
      onButton1Press: hideAlert,
      onClose: hideAlert,
      valueQR: data,
      showLoading: this.state.showLoading,
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'QR_CPM'}));
  }

  gotoQrShow = () => {
    const {goToShowQr, formValues} = this.props;
    const accountNumber = result(formValues, 'accountNo.accountNumber', '');
    const accId = result(formValues, 'accountNo.accId', '') || result(formValues, 'accountNo.id', '');
    const name = result(formValues, 'accountNo.name', '');
    const productType = result(formValues, 'accountNo.productType', '');
    const isNewQR = true;
    const data = {accountNumber, accId, name, productType, isNewQR};
    goToShowQr(data);
  }

  render () {
    const {navigation = {}, formValues = {}, savingAccounts = [], dataNewQR, isVisible, clearCPM, clearGenerated} = this.props;
    const availableBalance = getUnformattedAccountAmount(formValues['accountNo']);
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const isGenerated = result(dataNewQR, 'isGenerated', false);
    const data = isNewQR === true ? result(dataNewQR, 'data', '') : result(navigation, 'state.params.data', {});
    const filteredAcc = getAllAccountsExcept(savingAccounts);
    return <DecoratedTdForm
      navigation={navigation}
      savingAccounts={filteredAcc}
      availableBalance={availableBalance}
      updateQRVal={this.updateQRVal}
      thisState={this.state}
      formValues={formValues}
      showPopupQR={this.showPopupQR}
      data={data}
      isNewQR={isNewQR}
      isVisible={isVisible}
      toQrShow={this.gotoQrShow}
      isGenerated={isGenerated}
      dataNewQR={dataNewQR}
      clearCPM={clearCPM} 
      clearGenerated={clearGenerated} 
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQrScreenPage);
