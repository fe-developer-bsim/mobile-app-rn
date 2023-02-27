import React from 'react';
import PropTypes from 'prop-types';
import AutoDebitDetail from '../../components/Account/AutoDebitDetail.component';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {getAutoDebitHistory} from '../../state/thunks/dashboard.thunks';
import {NavigationActions} from 'react-navigation';
import * as actionCreators from '../../state/actions/index.actions';

const mapStateToProps = (state) => ({
  autoDebitList: result(state, 'autoDebitList', []),
  autoDebitHistory: result(state, 'autoDebitHistory', []),
  accountList: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  getHistory: (data) => dispatch(getAutoDebitHistory(data)),
  goToAutoDebitTransactions: (transactionList) => dispatch(NavigationActions.navigate({routeName: 'AutoDebitTransactions', params: {transactionList}})),
  clearHistory: () => dispatch(actionCreators.clearAutoDebitHistory()),
});

class AutoDebitDetailPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    getlistAutoDebit: PropTypes.func,
    getAutodebitList: PropTypes.func,
    reloadHistory: PropTypes.func,
    autoDebitList: PropTypes.object,
    goToBiller: PropTypes.func,
    accountList: PropTypes.array,
    getHistory: PropTypes.func,
    autoDebitHistory: PropTypes.array,
    goToAutoDebitTransactions: PropTypes.func,
    clearHistory: PropTypes.func,
  }

  state = {
    disabled: false
  }

  componentDidMount () {
    const {navigation, getHistory} = this.props;
    const data = result(navigation, 'state.params.item', {});
    getHistory(data);
  }

  componentWillUnmount () {
    const {clearHistory} = this.props;
    clearHistory();
  }

  render () {
    const {navigation, getlistAutoDebit, autoDebitList, reloadHistory, goToBiller, accountList, autoDebitHistory, goToAutoDebitTransactions} = this.props;
    const isEdit = result(navigation, 'state.params.isEdit', false);
    const data = result(navigation, 'state.params.item', {});
    return <AutoDebitDetail
      navigation={navigation}
      reloadFavorite={getlistAutoDebit}
      reloadHistory={reloadHistory}
      isEdit={isEdit}
      autoDebitList={autoDebitList}
      goToBiller={goToBiller}
      data={data}
      accountList={accountList}
      autoDebitHistory={autoDebitHistory}
      goToAutoDebitTransactions={goToAutoDebitTransactions}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoDebitDetailPage);
