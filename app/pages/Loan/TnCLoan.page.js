import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendTrackingFourPointOne} from '../../state/thunks/loan.thunks';
import LoanSummaryComponent from '../../components/Loan/TnCLoan.component';
import result from 'lodash/result';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: () => dispatch(sendTrackingFourPointOne()),
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class LoanSummaryPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func,
    dataDisplay: PropTypes.object,
  }
  state = {
    isDisabled: true
  }

  render () {
    const {goCheckSign, navigation = [], dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <LoanSummaryComponent goCheckSign = {goCheckSign} {...navigation} navParams={navParams} isDisabled={this.state.isDisabled} dataDisplay={dataDisplay}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoanSummaryPage);
