import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EgiftPaymentStatus from '../../components/Egift/EgiftPaymentStatus.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {setDirtyMiniStatement, clearPaymentStatus, saveAutoSave} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hideSpinner} from '../../state/actions/index.actions.js';
import moment from 'moment';
import {inquirySimasPoin, getDataOrderWithoutSpinner} from '../../state/thunks/common.thunks';
import {goDashboard} from '../../state/thunks/dashboard.thunks';
import {updateUserAfterBillpay} from '../../state/thunks/genericBill.thunks';
import isEmpty from 'lodash/result';
import {storageKeys, set, get} from '../../utils/storage.util';

class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
    fullName: PropTypes.string,
    hideSpinner: PropTypes.func,
    transRefNum: PropTypes.string,
    isLogin: PropTypes.bool,
    onCloseLogin: PropTypes.func,
    getAutoSaveChecklist: PropTypes.func,
    checked: PropTypes.bool,
    nav: PropTypes.object,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    isGenericBiller: PropTypes.bool,
    billPay: PropTypes.bool,
    inquiryLuckyDipCoupon: PropTypes.func,
  };

  state = {
    checked: false
  }

  componentWillMount () {
    const {getAutoSaveChecklist} = this.props;
    set(storageKeys['AUTO_SAVE_CHECKLIST'], true);
    getAutoSaveChecklist().then((res) => {
      this.setState({
        checked: res,
      });
    });
  }

  componentDidMount () {
    setTimeout(() => {
      this.props.hideSpinner();
    }, 2000);
  }

  render () {
    const {data, onClose, logoutFunc, fullName, isLogin, onCloseLogin, saveAutoSaveFunc, isAutoSave, billPay, inquiryLuckyDipCoupon} = this.props;
    const date = moment().format('D MMM YYYY, hh:mm A');
    const {checked} = this.state;
    const isGenericBiller = 'yes';
    return <EgiftPaymentStatus onClose={onClose} logoutFunc={logoutFunc} fullName={fullName} date={date} isLogin={isLogin} onCloseLogin={onCloseLogin} {...data} checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} isGenericBiller={isGenericBiller} billPay={billPay} inquiryLuckyDipCoupon={inquiryLuckyDipCoupon}/>;
  }
}

const mapStateToProps = (state) => ({
  data: result(state, 'paymentStatus', {}),
  fullName: result(state, 'simasPoin.fullName', ''),
  isLogin: !isEmpty(result(state, 'user', {})),
  isAutoSave: result(state, 'autoSave.isAutoSave', false),
  billPay: result(state, 'autoSave.billPay', false),
});

const mapDispatchToProps = (dispatch) => ({
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
  inquiryLuckyDipCoupon: () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipMainPage', params: {pathRoute: 'AccountMenu'}}));
  },
  onClose: () => {
    dispatch(updateUserAfterBillpay());
    dispatch(setDirtyMiniStatement(true));
    dispatch(goDashboard());
    dispatch(clearPaymentStatus());
    dispatch(inquirySimasPoin());
    dispatch(shouldGiveFeedback());
  },
  onCloseLogin: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(goDashboard());
    dispatch(clearPaymentStatus());
    dispatch(inquirySimasPoin());
    dispatch(shouldGiveFeedback());
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    setTimeout(() => {
      dispatch(logout());
      dispatch(getDataOrderWithoutSpinner());
    }, 0);
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  }
});

const connectedEgiftPaymentStatus = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedEgiftPaymentStatus;
