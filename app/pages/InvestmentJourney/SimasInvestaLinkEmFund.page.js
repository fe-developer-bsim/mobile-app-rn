import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimasInvestaLinkEmFund from '../../components/InvestmentJourney/SimasInvestaLinkEmFund.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {getAmountSimasInvestLink, showAlertAmount} from '../../state/thunks/dashboard.thunks';

const formConfig = {
  form: 'investasiLink',
  destroyOnUnmount: false,
  onSubmit: () => {
  }
};

const SimasInvestaLink = reduxForm(formConfig)(SimasInvestaLinkEmFund);

class SimasInvestaLinkPage extends Component {  
  static propTypes = {
    showAlert: PropTypes.func,
    navigation: PropTypes.object,
    showAlertAmount: PropTypes.func,
  }

  state = {
    value: 1000000
  }

  sliderChange = (value) => {
    this.setState({value});
  }

  render () {
    const {showAlert, navigation, showAlertAmount} = this.props;
    const summaryDetail = result(navigation, 'state.params.summaryDetail', {});
    const infoPolis = result(navigation, 'state.params.infoPolis', {});
    return <SimasInvestaLink showAlert={showAlert} summaryDetail={summaryDetail}
      infoPolis={infoPolis} sliderChange={this.sliderChange} amountSlider={this.state.value} showAlertAmount={showAlertAmount}/>;
  }
}

const mapDispatchToProps = (dispatch, navigation) => ({
  showAlert: (amountSlider) => () => {
    dispatch(getAmountSimasInvestLink(navigation, amountSlider));
  },
  showAlertAmount: () => () => {
    dispatch(showAlertAmount());
  }
});

export default connect(null, mapDispatchToProps)(SimasInvestaLinkPage);
