import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendTrackingFourPointSeven} from '../../state/thunks/loan.thunks';
import LoanSummaryComponent from '../../components/Loan/LoanSummary.component';
import result from 'lodash/result';
import {rejectGetLoanPGO} from '../../state/thunks/dashboard.thunks';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: () => dispatch(sendTrackingFourPointSeven()),
  backToHome: (statusLoan) => dispatch(rejectGetLoanPGO(statusLoan))
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class LoanSummaryPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func,
    dataDisplay: PropTypes.object,
    backToHome: PropTypes.func
  }
  state = {
    isDisabled: true
  }

  goBackToHome = () => {
    const dataAccount = result(this.props.navigation, 'state.params.data', {});
    const statusLoan = result(dataAccount, 'loanStatus', '');
    this.props.backToHome(statusLoan);
  }

  render () {
    const {goCheckSign, navigation = [], dataDisplay} = this.props;
    const dataAccount = result(navigation, 'state.params.data', {});
    return (
      <LoanSummaryComponent goCheckSign = {goCheckSign} backToHome={this.goBackToHome} dataAccount={dataAccount} {...navigation} isDisabled={this.state.isDisabled} dataDisplay={dataDisplay}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoanSummaryPage);
