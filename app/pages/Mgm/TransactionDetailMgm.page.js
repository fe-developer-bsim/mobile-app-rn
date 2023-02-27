import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransactionsDetailMgm from '../../components/Mgm/DetailTransactionMgm.component';
import result from 'lodash/result';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
  const profile = result(state, 'user.profile', {});
  return {
    profile
  };
};
class DetailTransactionsMgmPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    profile: PropTypes.object
  }
  render () {
    const {navigation, profile} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <TransactionsDetailMgm  navParams={navParams} profile={profile}/>;
  }
}

export default connect(mapStateToProps, null)(DetailTransactionsMgmPage);
