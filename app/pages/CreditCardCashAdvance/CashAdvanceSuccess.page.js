import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {result} from 'lodash';
import CashAdvanceSuccess from '../../components/CreditCardCashAdvance/CashAdvanceSuccess.component';
import {refreshStorageNew} from '../../state/thunks/common.thunks';
import {hidePaymentModal} from '../../state/actions/index.actions.js';
import {NavigationActions} from 'react-navigation';


class CashAdvanceSuccessPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    selectedAccount: PropTypes.object,
    ccDetail: PropTypes.object,
    onClose: PropTypes.func,
    accountList: PropTypes.object,
    returnToDash: PropTypes.func,
    options: PropTypes.object,
  };

  render () {
    const {navigation, accountList, formValues, selectedAccount, onClose, returnToDash, options} = this.props;
    const ccDetail = result(navigation, 'state.params.CCDetail');
    return (
      <CashAdvanceSuccess onClose={onClose} accountList={accountList}
        formValues={formValues} selectedAccount={selectedAccount} ccDetail={ccDetail} navigation={navigation}
        returnToDash={returnToDash} {...options}/>
    );
  }
}

const mapStateToProps = (state) =>   ({
  appConfig: result(state, 'config', {}),
  options: result(state, 'paymentModal', {}),
});

const mapDispatchToProps = (dispatch) => ({
  returnToDash: () => {
    dispatch(refreshStorageNew());
    dispatch(hidePaymentModal());
    dispatch(NavigationActions.back());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(CashAdvanceSuccessPage);
