import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SourceAccount from '../../components/BIFast/SelectProxyBIFast.component';
import {getTransferPossibleAccountsBIFast} from '../../utils/transformer.util';
import {updateBalances} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';
import {inquirySimasPoin} from '../../state/thunks/common.thunks';
import {get, storageKeys} from '../../utils/storage.util';
import {confirmEmallSimas} from '../../state/thunks/onboarding.thunks';
import * as actionCreators from '../../state/actions/index.actions';

const mapStateToProps = (state, props) => ({
  simasPoin: result(state, 'simasPoin', {}),
  simasConfig: result(state, 'config.CGVConfig', {}),
  newSof: result(state, 'newSourceofFund'),
  accountsTransfer: getTransferPossibleAccountsBIFast(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.isValas', {})),
});

const mapDispatchToProps = (dispatch) => ({
  goBack: () => {
    dispatch(NavigationActions.back());
  },
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  },
  updateBalances: () => dispatch(updateBalances()),
  goLanding: () => dispatch(toLandingEmall()),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  checkNew: () => get(storageKeys['NEW_SOF']).
    then((res) => {
      dispatch(actionCreators.saveNewSof(res));
    }),
  getUseSimas: (isUseSimas, emallData, simasPoin) => dispatch(confirmEmallSimas(isUseSimas, emallData, simasPoin)),
});

class SourceAccountPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accountsTransfer: PropTypes.array,
    getConfirmation: PropTypes.func,
    updateBalances: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    simasPoin: PropTypes.object,
    simasConfig: PropTypes.object,
    inquirySimasPoin: PropTypes.func,
    getUseSimas: PropTypes.func,
    checkNew: PropTypes.func,
    newSof: PropTypes.bool,
    goBack: PropTypes.func,

  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };

  componentDidMount () {
    this.props.inquirySimasPoin();
    this.props.checkNew();
  }

  render () {
    const {navigation, accountsTransfer, goLanding, getUseSimas, simasPoin, simasConfig, newSof, goBack} = this.props;
    return <SourceAccount navigation={navigation} accountsTransfer={accountsTransfer}
      getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh}
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner} goLanding={goLanding}
      getUseSimas={getUseSimas} simasPoin={simasPoin} simasConfig={simasConfig} newSof={newSof} goBack={goBack}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);