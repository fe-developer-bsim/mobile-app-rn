import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SilForexHoursComponent from '../../components/InvestmentJourney/SILForexHours.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  isSilIdrUsd: result(state, 'silIdrUsd', '')
});

const mapDispatchToProps = (dispatch) => ({
  backClose: () => {
    dispatch(NavigationActions.back());
  }
});

class SilForexHoursPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    goToNextPage: PropTypes.func,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    isSilIdrUsd: PropTypes.string
  }
  onBackPage = () => {
    this.props.backClose();
  }

  render () {
    const {navigation = {}, goToNextPage, currentLanguage, isSilIdrUsd} = this.props;
    const items = result(navigation, 'state.params.data.code');
    const startTimeForex  = result(navigation, 'state.params.startTimeForex', '');
    const cutOffTimeForex = result(navigation, 'state.params.cutOffTimeForex', '');

    return <SilForexHoursComponent
      items={items}
      goToNextPage={goToNextPage}
      cutOffTimeForex={cutOffTimeForex}
      startTimeForex={startTimeForex}
      onBackPage={this.onBackPage}
      currentLanguage={currentLanguage}
      isSilIdrUsd={isSilIdrUsd}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SilForexHoursPage);