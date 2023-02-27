import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PaydayLoanAgreeComponent from '../../components/PaydayLoan/AboutPayDayLoan.component';
import {connect} from 'react-redux';
import {getPayLoanDataForm} from '../../state/thunks/PaydayLoan.thunks';
import {agreementContent, agreementStatementContent, agreementPowerContent, agreementStatement} from '../../config/PaydayLoanStatement.config';

const mapDispatchToProps = (dispatch) => ({
  getDataPaydayLoan: () => {
    dispatch(getPayLoanDataForm());
  }
});

class AboutPaydayLoan extends Component {
  static propTypes = {
    getDataPaydayLoan: PropTypes.func,
    mockImageLocation: PropTypes.bool,
  }
  onPress = () => {
    this.props.getDataPaydayLoan();
  }
  render () {
    const {mockImageLocation = false} = this.props;
    return (
      <PaydayLoanAgreeComponent onPress={this.onPress} agreementContent={agreementContent} agreementStatementContent={agreementStatementContent} agreementPowerContent={agreementPowerContent}
        agreementStatement={agreementStatement} mockImageLocation={mockImageLocation}/>);
  }
}

export default connect(null, mapDispatchToProps)(AboutPaydayLoan);
