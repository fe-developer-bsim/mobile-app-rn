import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EgiftPaymentStatus from '../../components/MerchantJourney/DigitalStorePaymentStatusKoperasi.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {shouldGiveFeedback} from '../../state/thunks/feedback.thunks';
import {setDirtyMiniStatement, clearPaymentStatus} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hideSpinner, saveAutoSave} from '../../state/actions/index.actions.js';
import moment from 'moment';
import {inquirySimasPoin, getDataOrderWithoutSpinner} from '../../state/thunks/common.thunks';
import {goDashboardDigitalStore} from '../../state/thunks/digitalStore.thunks';
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
    getAutoSaveChecklist: PropTypes.func,
    checked: PropTypes.bool,
    nav: PropTypes.object,
    saveAutoSaveFunc: PropTypes.func,
    isAutoSave: PropTypes.bool,
    isDigitalStore: PropTypes.bool,
    DigitalStore: PropTypes.bool,
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
    const {data, onClose, logoutFunc, fullName, saveAutoSaveFunc, isAutoSave, DigitalStore} = this.props;
    const date = moment().format('D MMM YYYY, hh:mm A');
    const {checked} = this.state;
    const isDigitalStore = true;
    return <EgiftPaymentStatus onClose={onClose} logoutFunc={logoutFunc} fullName={fullName} date={date} {...data} checked={checked} saveAutoSaveFunc={saveAutoSaveFunc} isAutoSave={isAutoSave} isDigitalStore={isDigitalStore} DigitalStore={DigitalStore}/>;
  }
}

const mapStateToProps = (state) => ({
  data: result(state, 'paymentStatus', {}),
  fullName: result(state, 'simasPoin.fullName', ''),
  isAutoSave: result(state, 'autoSave.isAutoSave', false),
  DigitalStore: result(state, 'autoSave.DigitalStore', false),
});

const mapDispatchToProps = (dispatch) => ({
  getAutoSaveChecklist: () => get(storageKeys['AUTO_SAVE_CHECKLIST']),
  saveAutoSaveFunc: (isAutoSave, checked) => dispatch(saveAutoSave(isAutoSave, checked)),
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(goDashboardDigitalStore());
    dispatch(clearPaymentStatus());
    dispatch(inquirySimasPoin());
    dispatch(shouldGiveFeedback());
    dispatch(getDataOrderWithoutSpinner());
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