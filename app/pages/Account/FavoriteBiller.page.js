import React from 'react';
import PropTypes from 'prop-types';
import FavoriteBiller from '../../components/Account/FavoriteBiller.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {inquiryRecurringTransfer, setupFundTransfer} from '../../state/thunks/fundTransfer.thunks';
import {payByFav, saveFavorite, deleteFavorite, editFavorite, populateConfigData, saveFavoriteBank, triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {getFavBiller} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateSubscriberNo, validatePrefixBiller, validatePinCodeLength} from '../../utils/validator.util';
import {change} from 'redux-form';
import {getPayeeNameFavorite} from '../../state/thunks/fundTransfer.thunks';
import {language} from '../../config/language';
import {generatePayee} from '../../utils/transformer.util';
import {split, forEach, groupBy} from 'lodash';
import {wrapMethodInFunction} from '../../utils/transformer.util';

const formConfig = {
  form: 'FavoriteBillerForm',
  validate: (values) => {
    const biller = result(values, 'billerList', {});
    const subsriberNo = result(values, 'phone', '');
    const billerPrefix = result(biller, 'prefix', '');
    const subscriberNoValidation = result(biller, 'validation', '');
    const subscriberNoText = result(biller, 'billerPreferences.paymentSubscriberNoKey') || result(biller, 'billerPreferences.purchaseSubscriberNoKey', '');
    const errors = {
      phone: validateSubscriberNo(subsriberNo, subscriberNoValidation, subscriberNoText) || validatePrefixBiller(subsriberNo, billerPrefix),
      ...validateRequiredFields(values, ['phone', 'billerList', 'payeeAccNo', 'bank', 'payeeName'])
    };
    return {
      payeeAccNo: validatePinCodeLength(values.payeeAccNo),
      ...errors
    };
  },
  initialValues: {
    payeeName: '',
    payeeAccNo: '',
    bank: {},
    payeeNameDisabled: false
  },
};

const mapStateToProps = (state) => ({
  billerConfig: result(state, 'billerConfig', {}),
  billerFavorite: result(state, 'billerFavorite', {}),
  bankListData: result(state, 'valueBankList.bankList', []),
  favForm: result(state, 'form.FavoriteBillerForm.values', {}),
  originalName: result(state, 'form.addPayee.values.originalName', ''),
  billpayHistory: result(state, 'billpayHistory', {}),
  billerCodeNewNeedOTP: result(state, 'config.billerCodeNewNeedOTP', '')
});

const mapDispatchToProps = (dispatch) => ({
  inquiryRecurringTransfer: () => dispatch(inquiryRecurringTransfer()),
  goToBiller: (biller, subscriberNo, description, favBill, filterData) => () => dispatch(payByFav(biller, subscriberNo, description, favBill, filterData)),
  saveFavorite: (filterData) => dispatch(saveFavorite(filterData)),
  saveFavoriteBank: (payee) => dispatch(saveFavoriteBank(payee)),
  deleteFavorite: (data) => () => dispatch(deleteFavorite(data)),
  editFavorite: (data) => () => dispatch(editFavorite(data)),
  getFavBiller: () => dispatch(getFavBiller()),
  selectExistingPayee: (payee) => dispatch(setupFundTransfer(payee)),
  reloadHistory: () => dispatch(getFavBiller()),
  populateAppConfig: () => {
    dispatch(populateConfigData());
  },
  updatePayeeAccNo: (accNo) => {
    dispatch(change('FavoriteBillerForm', 'payeeAccNo', accNo));
  },
  setPayeeType: () => {
    dispatch(change('FavoriteBillerForm', 'payeeType', {label: language.TRANSFER__EMONEY, value: 'bank'}));
  },
  goToAddPayee: (bank) => {
    dispatch(change('FavoriteBillerForm', 'bank', bank));
    dispatch(getPayeeNameFavorite(bank));
  },
  triggerAuth: (params) => {
    dispatch(triggerAuthNavigate('favoriteBiller', null, false, 'Auth', params));
  },
});

const FavoriteBillers = reduxForm(formConfig)(FavoriteBiller);

class FavoriteBillerPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    billerConfig: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    goToBiller: PropTypes.func,
    saveFavorite: PropTypes.func,
    deleteFavorite: PropTypes.func,
    editFavorite: PropTypes.func,
    getFavBiller: PropTypes.func,
    billerFavorite: PropTypes.object,
    selectExistingPayee: PropTypes.func,
    bankListData: PropTypes.array,
    invalid: PropTypes.bool,
    reloadHistory: PropTypes.func,
    populateAppConfig: PropTypes.func,
    goToAddPayee: PropTypes.func,
    updatePayeeAccNo: PropTypes.func,
    setPayeeType: PropTypes.func,
    favForm: PropTypes.object,
    originalName: PropTypes.string,
    saveFavoriteBank: PropTypes.func,
    dispatch: PropTypes.func,
    billpayHistory: PropTypes.object,
    triggerAuth: PropTypes.func,
    billerCodeNewNeedOTP: PropTypes.string
  }

  state = {
    disabled: false
  }

  componentWillMount () {
    this.props.getFavBiller();
  }

  componentDidMount () {
    const {updatePayeeAccNo, favForm} = this.props;
    const payeeAccNo = result(favForm, 'payeeAccNo', '');
    payeeAccNo && updatePayeeAccNo(payeeAccNo);
    this.props.setPayeeType();
    this.props.populateAppConfig();
  }

  selectExistingPayee = (payee) => () => {
    this.setState({disabled: true});
    this.props.selectExistingPayee(payee);
    setTimeout(() => {
      this.setState({disabled: false});
    }, 2000);
  }

  saveFavoriteBank = () => {
    const {favForm, saveFavoriteBank} = this.props;
    const bank = result(favForm, 'bank', {});
    const payeeName = result(favForm, 'payeeName', '');
    const payeeAccNo = result(favForm, 'payeeAccNo', '');
    const payeeType = result(favForm, 'payeeType.value', 'bank');
    const accNo = (result(favForm, 'payeeType.value', 'emoney') !== 'emoney' ||  payeeAccNo.substring(0, 4) === '3808') ? payeeAccNo : result(bank, 'companyCode', '08') === '08' ? result(bank, 'prefixEmoney', '38') + payeeAccNo : result(bank, 'prefixEmoney', '38') + result(bank, 'companyCode', '08') + payeeAccNo;
    const ownEmoney = false;
    const payee = generatePayee(accNo, payeeName, bank, payeeType, ownEmoney);
    saveFavoriteBank(payee);
  }


  smsOTPBeforeFav = (filterData) => {
    const {saveFavorite, triggerAuth, favForm, billerCodeNewNeedOTP} = this.props;
    const params = {onSubmit: wrapMethodInFunction(saveFavorite, filterData), currentAmount: '0', isEasypin: false, shouldSendSmsOtp: true, isOtp: true};
    const billerOtp =  split(billerCodeNewNeedOTP, ',');
    const codeBillPay = result(favForm, 'billerList.billerPreferences.code', '');

    let isBillpayOtp = false;
    forEach(billerOtp, (value) => {
      if (codeBillPay === value) {
        isBillpayOtp = true;
      }
    });


    let sendSmsOtp;
    if (isBillpayOtp) {
      sendSmsOtp = true;
    } else {
      sendSmsOtp = false;
    }

    if (sendSmsOtp) {
      triggerAuth(params);
    } else {
      saveFavorite(filterData);
    }
  }

  render () {
    const {navigation, billerConfig, getFavBiller, billerFavorite, goToBiller,
      saveFavorite, deleteFavorite, editFavorite, bankListData, reloadHistory, goToAddPayee, favForm, originalName,
      dispatch} = this.props;
    const billerList = result(billerConfig, 'billerList', []);
    const isBank = groupBy(bankListData, (obj) => (result(obj, 'isBank', true)));
    const bankList = result(isBank, 'true', []);
    return <FavoriteBillers
      navigation={navigation}
      billerList={billerList}
      billerConfig={billerConfig}
      goToBiller={goToBiller}
      saveFavorite={saveFavorite}
      deleteFavorite={deleteFavorite}
      editFavorite={editFavorite}
      reloadFavorite={getFavBiller}
      billerFavorite={billerFavorite}
      goToPayee = {this.selectExistingPayee}
      bankList={bankList}
      reloadHistory={reloadHistory}
      goToAddPayee={goToAddPayee}
      favForm={favForm}
      originalName={originalName}
      saveFavoriteBank={this.saveFavoriteBank}
      dispatch={dispatch}
      smsOTPBeforeFav={this.smsOTPBeforeFav}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteBillerPage);
