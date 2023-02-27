import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyUpgradeBenefitComp from '../../components/EmoneyJourney/EmoneyUpgradeBenefit.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  goNextPage: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsListUpgradeEmoney'}));
  },
  goNextPageSplitBill: () => {
    dispatch(NavigationActions.navigate({routeName: 'ProductsListUpgradeEmoney'}));
  },
});

const mapStateToProps = (state) => ({
  cif: result(state, 'user.profile.customer.cifCode', '')
});

class EmoneyUpgradeBenefit extends Component {
  static propTypes = {
    goNextPage: PropTypes.func,
    navigation: PropTypes.object,
    goNextPageSplitBill: PropTypes.func,
    cif: PropTypes.string
  }

  render () {
    const {goNextPage, navigation, goNextPageSplitBill, cif} = this.props;
    const isSplitBillNKYC = result(navigation, 'state.params.isSplitBillNKYC');
    return (
      <EmoneyUpgradeBenefitComp
        goNextPage={goNextPage}
        isSplitBillNKYC={isSplitBillNKYC}
        goNextPageSplitBill={goNextPageSplitBill}
        cif={cif}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeBenefit);