import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {resendBillPayOTP} from '../../state/thunks/common.thunks';
import {reduxForm} from 'redux-form';
import {confirmBlockCreditCard as confirmBlockCreditCardThunk, requestBlockCreditCard as requestBlockCreditCardThunk} from '../../state/thunks/creditCardManage.thunks';
import noop from 'lodash/noop';
import CreditCardManage from '../../components/CreditCardManageJourney/CreditCardTrxManage.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'CreditCardManageForm',
};

const ConnectedForm = reduxForm(formConfig)(CreditCardManage);

class CreditCardManagePage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    confirmBlockCreditCard: PropTypes.func,
    requestBlockCreditCard: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    userMobileNumber: PropTypes.string,
    moveTo: PropTypes.func
  }

  static defaultProps = {
    transRefNum: ''
  }

  goToCreditCardOptionInput = (menu) => () => {
    const {navigation} = this.props;
    const account = result(navigation, 'state.params.selectedAccount');
    this.props.navigation.navigate('CreditCardManageInput', {account, ...menu});
  }

  render () {
    const {navigation = {}, confirmBlockCreditCard = noop, requestBlockCreditCard = noop, resendBillPayOTP,
      transRefNum, userId, userMobileNumber, moveTo} = this.props;
    const selectedAccount = result(navigation, 'state.params.selectedAccount');
    return (
      <ConnectedForm
        gotoCreditCardChangeLimit={this.gotoCreditCardChangeLimit} selectedAccount={selectedAccount}
        confirmBlockCreditCard={confirmBlockCreditCard} requestBlockCreditCard={requestBlockCreditCard}
        resendBillPayOTP={resendBillPayOTP}
        goToCreditCardOptionInput={this.goToCreditCardOptionInput}
        transRefNum={transRefNum}
        userId={userId}
        userMobileNumber={userMobileNumber}
        moveTo={moveTo}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum'),
  userId: result(state, 'user.profile.customer.id', 0),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', '')
});

const mapDispatchToProps = (dispatch) => ({
  confirmBlockCreditCard: () => dispatch(confirmBlockCreditCardThunk()),
  requestBlockCreditCard: (accountNumber) => dispatch(requestBlockCreditCardThunk(accountNumber)),
  resendBillPayOTP: () => dispatch(resendBillPayOTP('cc')),
  moveTo: (routeName, params) => dispatch(NavigationActions.navigate({routeName: routeName, params: {...params}}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardManagePage);
