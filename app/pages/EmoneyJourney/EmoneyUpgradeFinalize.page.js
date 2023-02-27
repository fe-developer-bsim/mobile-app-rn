import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyFinalizeUpgrade from '../../components/EmoneyJourney/EmoneyUpgradeFinalize.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import capitalize from 'lodash/capitalize';
import {resetToDashboardFrom} from '../../state/thunks/common.thunks';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {hidePaymentModal, deleteCouponSuccessStatus} from '../../state/actions/index.actions.js';

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
    dispatch(deleteCouponSuccessStatus());
  },
  onBackPress: () => {
    dispatch(resetToDashboardFrom('EmoneyUpgradeFinalize'));
  },
});
const mapStateToProps = (state) => ({
  name: capitalize(result(state, 'user.profile.name', '')),
});

class EmoneyFinalize extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    onButtonPress: PropTypes.func,
    name: PropTypes.string,
    onBackPress: PropTypes.func,
    mockImageLocation: PropTypes.bool
  }

  render () {
    const {onButtonPress, name, onBackPress, mockImageLocation = false} = this.props;
    return (
      <EmoneyFinalizeUpgrade name={name}  onButtonPress={onButtonPress}  onBackPress={onBackPress} mockImageLocation={mockImageLocation} />
    );
  }
}
const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(EmoneyFinalize);
export default ConnectedIntroductionPage;
