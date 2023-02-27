
import React from 'react';
import PropTypes from 'prop-types';
import FilterCalendarPickerComponent, {fields} from '../../components/Mgm/FilterCalendarPicker.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {popUpActivate} from '../../state/thunks/dashboard.thunks';
import {reduxForm} from 'redux-form';
import {goReferralList, goHistoryReward} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'FilterCalendar',
  initialValues: {
    [fields.CALENDAR]: '',
  }
};

const mapStateToProps = (state) => {
  const simasPoinHistory = result(state, 'simasPoinHistory', []);
  const formFilterValueInvitingRecord = result(state, 'form.MyInvitingRecord.values', {});
  const formFilterValueClaimReward = result(state, 'form.MyHistoryReward.values', {});

  return {
    simasPoinHistory,
    formFilterValueInvitingRecord,
    formFilterValueClaimReward
  };
};

const mapDispatchToProps = (dispatch) => ({
  goToPopUpActivate: () => dispatch(popUpActivate()),
  myReferralList: (filterValue) => {
    dispatch(goReferralList(filterValue));
  },
  getMyHistoryReward: (selectedFilterDate) => { 
    dispatch(goHistoryReward(selectedFilterDate)); 
  },
});

const CalendarDetailPage = reduxForm(formConfig)(FilterCalendarPickerComponent);

class FilterCalendarPicker extends React.Component {
  static propTypes = {
    simasPoinHistory: PropTypes.object,
    navigation: PropTypes.object,
    formFilterValueInvitingRecord: PropTypes.object,
    formFilterValueClaimReward: PropTypes.object,
    myReferralList: PropTypes.func,
    getMyHistoryReward: PropTypes.func
  }

  getFilterDateReferralList = () => {
    const {myReferralList, formFilterValueInvitingRecord} = this.props;
    const selectedFilterDate = result(formFilterValueInvitingRecord, 'selectedRange.label', '');
    myReferralList(selectedFilterDate);
  };

  getFilterDateClaimReward = () => {
    const {getMyHistoryReward, formFilterValueClaimReward} = this.props;
    const selectedFilterDate = result(formFilterValueClaimReward, 'selectedRange.label', '');
    getMyHistoryReward(selectedFilterDate);
  };

  render () {
    const {navigation} = this.props;
    return <CalendarDetailPage navigation={navigation}
      getFilterDateReferralList={this.getFilterDateReferralList}
      getFilterDateClaimReward={this.getFilterDateClaimReward}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterCalendarPicker);