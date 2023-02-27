import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SourceAccount from '../../components/GenerateCodeJourney/SourceMerchant.component';
import {populateBillerData} from '../../state/thunks/common.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {change} from 'redux-form';

const mapStateToProps = (state) => ({
  billerLKD: result(state, 'billerConfig.billerLKD', []), 
});

const mapDispatchToProps = (dispatch) => ({
  getConfirmation: (formName, fieldName, values) => {
    dispatch(change(formName, fieldName, values));
    dispatch(NavigationActions.back());
  },
  populateBillerData: () => dispatch(populateBillerData()),
  goLanding: () => dispatch(toLandingEmall()),
});

class SourceAccountPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accountsBiller: PropTypes.array,
    accountsTransfer: PropTypes.array,
    getConfirmation: PropTypes.func,
    getPayday: PropTypes.func,
    loadBalancesWithSpinner: PropTypes.func,
    goLanding: PropTypes.func,
    populateBillerData: PropTypes.func,
    billerConfig: PropTypes.object,
    billerLKD: PropTypes.object
  };

  selectAccount = (values) => {
    const {navigation, getConfirmation} = this.props;
    const formName = result(navigation, 'state.params.formName', '');
    const fieldName = result(navigation, 'state.params.fieldName', '');
    getConfirmation(formName, fieldName, values);
  };
  componentWillMount () {
  }
  render () {
    const {navigation, accountsBiller, accountsTransfer, goLanding, populateBillerData, billerLKD} = this.props;
    return <SourceAccount navigation={navigation} accountsBiller={accountsBiller} accountsTransfer={accountsTransfer} 
      getConfirmation={this.selectAccount} onDashboardRefresh={this._onDashboardRefresh} 
      loadBalancesWithSpinner={this.props.loadBalancesWithSpinner} goLanding={goLanding} populateBillerData={populateBillerData} 
      billerLKD={billerLKD} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceAccountPage);
