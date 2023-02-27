import React from 'react';
import PropTypes from 'prop-types';
import QrTcico from '../../components/Account/QrTcico.component.js';
import {connect} from 'react-redux';
import {validateRequiredFields} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import result from 'lodash/result';
import {getTransferPossibleAccountsNoEmoney, getUnformattedAccountAmount, toTLVs, makeTlv, removeComma, getAllAccountsExcept} from '../../utils/transformer.util';
import * as actionCreators from '../../state/actions/index.actions.js';
import {goToShowQRTcico} from '../../state/thunks/qrpayment.thunk';

const formConfig = {
  form: 'MyQRTcicoForm',
  destroyOnUnmount: true,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['accountNo', 'amount']),
    };
    return {
      errors
    };
  },
  onSubmit: (values, dispatch, {tagQrTTS}) => {
    const accountNo = result(values, 'accountNo', {});
    const accountNumber = result(values, 'accountNo.accountNumber', '');
    const accIdfromVal = result(values, 'accountNo.id', 0);
    const accIdOther = result(values, 'accountNo.accId', 0);
    const accId = accIdfromVal <= 0 ? accIdOther : accIdfromVal;
    const name = result(values, 'accountNo.name', '');
    const productType = result(values, 'accountNo.productType', '');
    const transferMethod = result(values, 'transferMethod.type', '');
    const amount = result(values, 'amount', '');
    const isNewQR = true;
    const type = transferMethod === '' ? 'CDPT' : '';
    const data = {accountNumber, accId, name, productType, isNewQR, accountNo, transferMethod, amount};
    const isNewGenerated = true;
    dispatch(goToShowQRTcico(tagQrTTS, data, '', type, isNewGenerated));
  },
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.MyQRTcicoForm.values', {}),
  accNo: result(state, 'form.MyQRTcicoForm.values.accountNo.accountNumber', {}),
  savingAccounts: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft'),
  dataNewQR: result(state, 'generateCodeTag', {}),
  isVisible: result(state, 'usernameAvailability.isVisible', {}),
  tagQrTTS: result(state, 'generateQRTTSTag', {}),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (data) => {
    dispatch(data);
  },
  changeAccount: (acc) => {
    dispatch(change('MyQRTcicoForm', 'accountNo', acc));
  },
});

const DecoratedTdForm = reduxForm(formConfig)(QrTcico);

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
    tagQrTTS: PropTypes.object,
  }

  state = {
    qrVal: {},
    showQR: true,
    showPopupQR: false,
    showCountdown: 0,
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
      isTcico: true
    };
    dispatch(actionCreators.showSinarmasAlert({...modalOptions, image: 'QR'}));
  }

  render () {
    const {navigation = {}, formValues = {}, savingAccounts = [], dataNewQR, isVisible, tagQrTTS} = this.props;
    const filteredAccount = getAllAccountsExcept(savingAccounts);
    const availableBalance = getUnformattedAccountAmount(formValues['accountNo']);
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const data = isNewQR === true ? result(dataNewQR, 'data', '') : result(navigation, 'state.params.data', {});
    return <DecoratedTdForm
      navigation={navigation}
      savingAccounts={filteredAccount}
      availableBalance={availableBalance}
      updateQRVal={this.updateQRVal}
      thisState={this.state}
      formValues={formValues}
      showPopupQR={this.showPopupQR}
      data={data}
      isNewQR={isNewQR}
      isVisible={isVisible}
      tagQrTTS={tagQrTTS}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQrScreenPage);
