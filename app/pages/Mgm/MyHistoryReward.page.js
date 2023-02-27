import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyHistoryRewardComponent from '../../components/Mgm/MyHistoryReward.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {generateRadioOptionFilterRecord} from '../../utils/transformer.util';
import {goHistoryReward, goClaimRewardNow, goInformation, getDetailHistoryReward, goSimasPoinHistoryMgm} from '../../state/thunks/common.thunks';

const MyHistoryRewardConfig = {
  form: 'MyHistoryReward',
  destroyOnUnmount: false,
};

const mapStateToProps = (state) => {
  const ccCode = result(state, 'ccCode', '');
  const config = result(state, 'config', {});
  const currentLanguage = result(state, 'currentLanguage.id', 'id');
  const filterStarDate = result(state, 'filteredCalendar.filterStarDate', '');
  const filterEndDate = result(state, 'filteredCalendar.filterEndDate', '');
  const formFilterValue = result(state, 'form.MyHistoryReward.values', {});
  const claimRewardBalance = result(state, 'rewardBalanceMgm', '');
  const transactions = result(state, 'historyClaimRewardMgm', []);

  return {
    ccCode,
    config,
    currentLanguage,
    // filterDate,
    filterStarDate,
    filterEndDate,
    formFilterValue,
    claimRewardBalance,
    transactions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  backClose: () => {
    dispatch(NavigationActions.back());
  },

  getMyHistoryReward: (selectedFilterDate) => { 
    dispatch(goHistoryReward(selectedFilterDate)); 
  },

  getClaimRewardNow: (defaultDateFirst, prefilledFilterDate) => dispatch(goClaimRewardNow(defaultDateFirst, prefilledFilterDate)),

  getInformation: () => dispatch(goInformation()),

  prefilledFilterDate: (filterDate) => {
    dispatch(change('MyHistoryReward', 'selectedRanged', filterDate));
  },

  goToDetailHistoryReward: (idStatement, name, date, event, transactionType, poinType, poin) => dispatch(getDetailHistoryReward(idStatement, name, date, event, transactionType, poinType, poin)),

  goInfoBonusReward: () => {
    dispatch(NavigationActions.navigate({routeName: 'MgmInfoBonusReward'}));
  },

  SimasPoinHistory: () => dispatch(goSimasPoinHistoryMgm()),
});

const MyHistoryReward = reduxForm(MyHistoryRewardConfig)(MyHistoryRewardComponent);

class MyHistoryRewardPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToNextPage: PropTypes.func,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    ccCode: PropTypes.string,
    filterDate: PropTypes.string,
    filterStarDate: PropTypes.string,
    filterEndDate: PropTypes.string,
    prefilledFilterDate: PropTypes.func,
    getMyHistoryReward: PropTypes.func,
    formFilterValue: PropTypes.object,
    claimRewardBalance: PropTypes.object,
    getClaimRewardNow: PropTypes.func,
    getInformation: PropTypes.func,
    transactions: PropTypes.array,
    goToDetailHistoryReward: PropTypes.func,
    goInfoBonusReward: PropTypes.func,
    SimasPoinHistory: PropTypes.func,
  }

  state ={
    dateFilter: []
  }

  onBackPage = () => {
    this.props.backClose();
  }
  
  getDefaultDateHistory = () => {
    const {getClaimRewardNow, prefilledFilterDate} = this.props;
    const defaultDateFirst = this.state.dateFilter;
    getClaimRewardNow(defaultDateFirst, prefilledFilterDate);
  };

  getFilterDate = () => {
    const {getMyHistoryReward, formFilterValue} = this.props;
    const selectedFilterDate = result(formFilterValue, 'selectedRange.label', '');
    getMyHistoryReward(selectedFilterDate);
  };

  componentWillMount () {
    const {prefilledFilterDate, getMyHistoryReward} = this.props;
    // const radioOptions = generateRadioOptionFilterRecord(filterStarDate, filterEndDate);
    const setFilterDate = 'Today';
    // const setFilterDate = result(radioOptions, '[0]', []); // sementara ganti ke last7days dulu
    // const defaultDate = result(setFilterDate, 'label', '');
    prefilledFilterDate(setFilterDate);
    this.setState({dateFilter: setFilterDate});
    getMyHistoryReward(setFilterDate);
  }

  render () {
    const {goToNextPage, currentLanguage, filterDate, filterStarDate, filterEndDate, formFilterValue, getMyHistoryReward, claimRewardBalance, getClaimRewardNow, getInformation,
      transactions, goToDetailHistoryReward, goInfoBonusReward, SimasPoinHistory} = this.props;
    const radioOptions = generateRadioOptionFilterRecord(filterStarDate, filterEndDate);
  
    return <MyHistoryReward
      goToNextPage={goToNextPage}
      onBackPage={this.onBackPage}
      currentLanguage={currentLanguage}
      radioOptions={radioOptions}
      filterDate={filterDate}
      filterStarDate={filterStarDate}
      filterEndDate={filterEndDate}
      formFilterValue={formFilterValue}
      getMyHistoryReward={getMyHistoryReward}
      claimRewardBalance={claimRewardBalance}
      getClaimRewardNow={getClaimRewardNow}
      getInformation={getInformation}
      transactions={transactions}
      getDefaultDateHistory={this.getDefaultDateHistory}
      goToDetailHistoryReward={goToDetailHistoryReward}
      goInfoBonusReward={goInfoBonusReward}
      SimasPoinHistory={SimasPoinHistory}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHistoryRewardPage);