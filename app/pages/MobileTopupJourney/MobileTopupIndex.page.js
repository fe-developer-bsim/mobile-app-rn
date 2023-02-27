import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import MobileTopupIndex from '../../components/MobileTopupJourney/MobileTopupIndex.component';
import result from 'lodash/result';

class MobileTopupIndexPage extends Component {
  static propTypes = {
    goToNewTopup: PropTypes.func,
    populateTopup: PropTypes.func,
    lastRecharges: PropTypes.array
  }
  render () {
    const {goToNewTopup, lastRecharges = [], populateTopup, ...extraProps} = this.props;
    return <MobileTopupIndex onNewTopup={goToNewTopup} onRecentTopup={populateTopup} recentTopupList={lastRecharges} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => ({
  lastRecharges: result(state, 'lastRecharges.frequentRecharges', [])
});

const mapDispatchToProps = (dispatch) => ({
  goToNewTopup: () => {
    dispatch(NavigationActions.navigate({routeName: 'MobileTopupForm'}));
  },
  populateTopup (topupInfo) {
    dispatch(NavigationActions.navigate({routeName: 'MobileTopupPayment', params: {topupInfo}}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileTopupIndexPage);
