import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RecurringComponent from '../../components/RecurringJourney/RecurringList.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {confirmDeleteRecurringTransfer, triggerAuthNavigate} from '../../state/thunks/common.thunks';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

const mapDispatchToProps = (dispatch) => ({
  goToEditTransfer: (value) => dispatch(NavigationActions.navigate({routeName: 'RecurringEditing', params: value})),
  goToDeleteTransfer: (value) => {
    dispatch(confirmDeleteRecurringTransfer(value));
  },
  triggerAuth: (billAmount, params) => dispatch(triggerAuthNavigate('deleteRecurring', billAmount, false, 'Auth', params)),
});

const mapStateToProps = (state) => ({
  dataRecurringArray: result(state, 'recurringTransfer', []),
  accountName: result(state, 'user.profile.name', ''),
});

class RecurringDetailPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    goToEditTransfer: PropTypes.func,
    hideSpinner: PropTypes.func,
    dataRecurringArray: PropTypes.array,
    goToHome: PropTypes.func,
    goToDeleteTransfer: PropTypes.func,
    triggerAuth: PropTypes.func,
    accountName: PropTypes.string
  }

  render () {
    const {goToEditTransfer, dataRecurringArray, goToDeleteTransfer, triggerAuth, accountName} = this.props;
    const sortingData = reverse(sortBy(dataRecurringArray, ['transactionReferenceNumber']));
    return <RecurringComponent accountName={accountName} goToEditTransfer={goToEditTransfer} triggerAuth={triggerAuth} dataRecurring={sortingData} goToDeleteTransferPage={goToDeleteTransfer}/>;
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(RecurringDetailPage);

export default ConnectedFormPage;
