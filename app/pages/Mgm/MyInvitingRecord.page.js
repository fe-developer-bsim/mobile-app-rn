import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyInvitingRecordComponent from '../../components/Mgm/MyInvitingRecord.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {reduxForm, change} from 'redux-form';
import {generateRadioOptionFilterRecord} from '../../utils/transformer.util';
import {goReferralList} from '../../state/thunks/common.thunks';
import {getDetailTransactionHistory} from '../../state/thunks/transactionHistory.thunks';

const MyInvitingRecordConfig = {
  form: 'MyInvitingRecord',
  destroyOnUnmount: false,
};

const mapStateToProps = (state) => {
  const ccCode = result(state, 'ccCode', '');
  const config = result(state, 'config', {});
  const currentLanguage = result(state, 'currentLanguage.id', 'id');
  const profilePicture = result(state, 'savePicture', '');
  const profile = result(state, 'user.profile', {});
  const filterDate = result(state, 'form.MyInvitingRecord.values.selectedRange', '');
  const filterStarDate = result(state, 'filteredCalendar.filterStarDate', '');
  const filterEndDate = result(state, 'filteredCalendar.filterEndDate', '');
  const formFilterValue = result(state, 'form.MyInvitingRecord.values', {});
  const transactions = state.historyReferralListMgm[filterDate.value];
  
  return {
    ccCode,
    config,
    currentLanguage,
    profilePicture,
    profile,
    filterDate,
    filterStarDate,
    filterEndDate,
    formFilterValue,
    transactions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  backClose: () => () => {
    dispatch(NavigationActions.back());
  },
  goToDetailTransaction: (statementId, transactionCode, accountTransactions) => dispatch(getDetailTransactionHistory(statementId, transactionCode, accountTransactions)),

  myReferralList: (filterValue) => {
    dispatch(goReferralList(filterValue));
  },

  prefilledFilterDate: (filterDate) => {
    dispatch(change('MyInvitingRecord', 'selectedRange', filterDate));
  }
});

const MyInvitingRecord = reduxForm(MyInvitingRecordConfig)(MyInvitingRecordComponent);

class MyInvitingRecordPage extends Component {
  static propTypes = {
    formFilterValue: PropTypes.object,
    config: PropTypes.object,
    myReferralList: PropTypes.func,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    ccCode: PropTypes.string,
    profilePicture: PropTypes.object,
    profile: PropTypes.object,
    filterDate: PropTypes.string,
    filterStarDate: PropTypes.string,
    filterEndDate: PropTypes.string,
    prefilledFilterDate: PropTypes.func,
    transactions: PropTypes.array,
    loadFilteredTransactions: PropTypes.func,
    goToDetailTransaction: PropTypes.func,
  }

  state ={
    dateFilter: []
  }

  getFilterDate = () => {
    const {myReferralList, formFilterValue} = this.props;
    const selectedFilterDate = result(formFilterValue, 'selectedRange.label', '');
    myReferralList(selectedFilterDate);
  };
  componentWillMount () {
    const {prefilledFilterDate, myReferralList} = this.props;
    const radioOptions = generateRadioOptionFilterRecord();
    const setFilterDate = result(radioOptions, '[1]', []);
    const defaultDate = result(setFilterDate, 'label', '');
    prefilledFilterDate(setFilterDate);
    this.setState({dateFilter: setFilterDate});
    myReferralList(defaultDate);
  }

  render () {
    const {formFilterValue, myReferralList, currentLanguage, profilePicture, profile, filterDate,
      filterStarDate, filterEndDate, goToDetailTransaction, transactions} = this.props;
    const radioOptions = generateRadioOptionFilterRecord(filterStarDate, filterEndDate);
  
    return <MyInvitingRecord
      myReferralList={myReferralList}
      currentLanguage={currentLanguage}
      profilePicture={profilePicture}
      profile={profile}
      radioOptions={radioOptions}
      filterDate={filterDate}
      filterStarDate={filterStarDate}
      filterEndDate={filterEndDate}
      formFilterValue={formFilterValue}
      transactions={transactions}
      goToDetailTransaction={goToDetailTransaction}
      getFilterDate={this.getFilterDate}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitingRecordPage);