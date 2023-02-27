import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardManageConfirmation from '../../components/CreditCardManageJourney/CreditCardManageConfirmation.component';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {
  confirmCreditCardOption as confirmCreditCardOptionThunk,
  requestCreditCardOption as requestCreditCardOptionThunk,
  confirmCreditCardChangeLimit as confirmCreditCardChangeLimitThunk,
  requestCreditCardChangeLimit as requestCreditCardChangeLimitThunk
} from '../../state/thunks/creditCardManage.thunks';
import {resendBillPayOTP} from '../../state/thunks/common.thunks';
import noop from 'lodash/noop';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'CreditCardManageConfirmationForm',
};

const ConnectedForm = reduxForm(formConfig)(CreditCardManageConfirmation);

class CreditCardManageInputPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmCreditCardOption: PropTypes.func,
    requestCreditCardOption: PropTypes.func,
    isConnected: PropTypes.bool,
    resendOTP: PropTypes.func,
    confirmCreditCardChangeLimit: PropTypes.func,
    requestCreditCardChangeLimit: PropTypes.func,
    transRefNum: PropTypes.string,
    userMobileNumber: PropTypes.string,
    moveTo: PropTypes.func
  }

  render () {
    const {
      confirmCreditCardOption = noop,
      requestCreditCardOption = noop,
      navigation,
      isConnected,
      resendOTP = noop,
      confirmCreditCardChangeLimit = noop,
      requestCreditCardChangeLimit = noop,
      transRefNum,
      userMobileNumber,
      moveTo,
    } = this.props;    
    const dataMerged = {...result(navigation, 'state.params.values'), ...result(navigation, 'state.params.data')};
    return (
      <ConnectedForm
        confirmCreditCardOption={confirmCreditCardOption}
        requestCreditCardOption={requestCreditCardOption}
        isConnected={isConnected}
        valuesData={dataMerged}
        resendOTP={resendOTP}
        confirmCreditCardChangeLimit={confirmCreditCardChangeLimit}
        requestCreditCardChangeLimit={requestCreditCardChangeLimit}
        transRefNum={transRefNum}
        userMobileNumber={userMobileNumber}
        moveTo={moveTo}/>
    );
  }
}

const mapStateToProps = (state) => ({
  isConnected: result(state, 'networkStatus.isConnected', true),
  transRefNum: state.transRefNum,
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
});

const mapDispatchToProps = (dispatch) => ({
  confirmCreditCardOption: () => dispatch(confirmCreditCardOptionThunk()),
  requestCreditCardOption: (request) => dispatch(requestCreditCardOptionThunk(request)),
  resendOTP: () => dispatch(resendBillPayOTP('cc')),
  confirmCreditCardChangeLimit: () => dispatch(confirmCreditCardChangeLimitThunk()),
  requestCreditCardChangeLimit: (request) => dispatch(requestCreditCardChangeLimitThunk(request)),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardManageInputPage);
