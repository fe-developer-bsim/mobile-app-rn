import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EgiftSrcAcc from '../../components/Egift/EgiftSrcAcc.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {getLandingEgift} from '../../state/thunks/dashboard.thunks';
import {updateBalances, inquirySimasPoin} from '../../state/thunks/common.thunks';
import {getEmail} from '../../state/thunks/egift.thunks';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),  
  simasPoin: result(state, 'simasPoin', {}),
  egiftCart: result(state, 'egiftCart', []),
});

const mapDispatchToProps = (dispatch) => ({
  updateBalances: () => dispatch(updateBalances()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  goLanding: () => dispatch(getLandingEgift()),
  chooseEmail: () => dispatch(getEmail()),
});


class EgiftSrcAccPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    getBalanceEmoney: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    getUseSimas: PropTypes.func,
    simasPoin: PropTypes.object,
    egiftCart: PropTypes.array,
    chooseEmail: PropTypes.func,
  };

  render () {
    const {navigation, accounts, getConfirmation, getBalanceEmoney, goLanding, getUseSimas, simasPoin, egiftCart, chooseEmail} = this.props;
    return <EgiftSrcAcc navigation={navigation} accounts={accounts} getConfirmation={getConfirmation} onDashboardRefresh={this._onDashboardRefresh} getBalanceEmoney={getBalanceEmoney} loadBalancesWithSpinner={this.props.loadBalancesWithSpinner}
      goLanding={goLanding} getUseSimas={getUseSimas} simasPoin={simasPoin} egiftCart={egiftCart} chooseEmail={chooseEmail} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EgiftSrcAccPage);
